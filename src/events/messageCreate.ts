import { aliases, client, commands } from '../nayu.js';
import { emojis } from '../utils/emojis.js';
import { hasChannelPermissions } from '../utils/permissionHelpers.js';
import { Message } from '../utils/typings/ddTypings.js';

export const run: typeof client.events.messageCreate = async (message): Promise<Message | void> => {
    if (message.author.bot || !message.guildId) return;

    const guild = client.cache.guilds.memory.get(message.guildId);
    if (!guild) return;

    const channel = guild.channels!.get(message.channelId);
    if (!channel) return;

    if (message.guildId === 530095394785329154n) {
        // Exception to Support and Message Perms roles, Tickets channel and Supporters Chat channel
        if (!message.member?.roles.includes(766720686504542248n) && !message.member?.roles.includes(854711580385083403n) && channel.parentId !== 1004754232974516324n && channel.id !== 903670998287679510n) {
            // Link Filters
            const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
            const linksMatched = message.content.matchAll(linkRegex);
            const allowedLinks = ['giveaway.boats', 'discord.com', 'discord.media', 'discordapp.com', 'discordapp.net', 'discordstatus.com', 'tenor.com', 'giphy.com'];

            for (const linkInfo of linksMatched) {
                const link = linkInfo[0].toLowerCase();

                if (!allowedLinks.filter((allowedLink) => link.match(new RegExp(`https?:\/\/(.*\.)?${allowedLink}(/.*)?$`)) && true).length) {
                    await client.helpers.deleteMessage(message.channelId, message.id);

                    client.helpers.sendMessage(message.channelId, { content: `<@${message.author.id}>, don't send links here! ${emojis.angryCat}` }).then((msg) => setTimeout(() => client.helpers.deleteMessage(message.channelId, msg.id), 3000));

                    break;
                }
            }

            // Attachment Filters
            if (message.attachments) {
                const allowedAttachments = ['audio', 'image', 'video'];

                for (const attachment of message.attachments) {
                    if (!allowedAttachments.find((allowedAttachment) => attachment.contentType?.startsWith(allowedAttachment))) {
                        await client.helpers.deleteMessage(message.channelId, message.id);

                        client.helpers.sendMessage(message.channelId, { content: `<@${message.author.id}>, we don't allow any attachments except audio, image, video in this server!` }).then((msg) => setTimeout(() => client.helpers.deleteMessage(message.channelId, msg.id), 7500));

                        break;
                    }
                }
            }
        }
    }

    const clientMember = guild.members!.get(client.id);
    if (!clientMember) return;

    if (!hasChannelPermissions(guild, message.channelId, clientMember!, ['SEND_MESSAGES'])) return;

    let prefix = 'nayu';

    if ([`<@${client.id}>`, `<@!${client.id}>`].includes(message.content)) return client.helpers.sendMessage(message.channelId, { content: '<a:nayuSway:750775148000444467>' });

    if (message.content.startsWith(`<@${client.id}>`) || message.content.startsWith(`<@!${client.id}>`)) prefix = message.content.split(' ')[0];

    if (!message.content.startsWith(prefix)) return;

    try {
        const args = message.content.slice(prefix.length).trim().split(/ +/g);

        const command = aliases.find((alias) => args.join(' ').toUpperCase().startsWith(alias));
        if (!command) return;

        args.splice(0, command.split(' ').length);

        const commandObj = commands.get(command);
        if (!commandObj) return;

        if (commandObj.config.args > args.length) return client.helpers.sendMessage(message.channelId, { content: 'Invalid command usage!' });

        commandObj.run(message, args, prefix);
    } catch (error) {
        console.error(error);
    }
};
