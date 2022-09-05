import { Client, Message, PrivateChannel } from 'eris';
import { aliases, commands } from '../nayu';
import { emojis } from '../utils/emojis';

export const run = async (client: Client, message: Message): Promise<Message | void> => {
    if (message.author?.bot) return;
    if (message.channel instanceof PrivateChannel || !message.channel || !message.channel.guild) return;

    if (message.channel.guild.id === '530095394785329154') {
        const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
        const linksMatched = message.content.matchAll(linkRegex);
        const allowedLinks = ['giveawayboat.com', 'giveaway.boats', 'discord.com', 'discord.media', 'discordapp.com', 'discordapp.net', 'discordstatus.com', 'tenor.com', 'giphy.com'];

        for (const linkInfo of linksMatched) {
            const link = linkInfo[0].toLowerCase();

            if (!allowedLinks.filter((allowedLink) => link.match(new RegExp(`https?:\/\/(.*\.)?${allowedLink}(/.*)?$`)) && true).length && !message.member?.roles.includes('766720686504542248') && !message.member?.roles.includes('854711580385083403') && message.channel.parentID !== '1004750438102474762') {
                await message.delete();

                message.channel.createMessage(`${message.author.mention}, don't send links here! ${emojis.angryCat}`).then((msg) => setTimeout(() => msg.delete(), 3000));

                return;
            }
        }
    }

    if (!message.channel.permissionsOf(client.user.id)?.has('sendMessages')) return;

    let prefix = 'nayu';

    if (message.content.startsWith(`<@!${client.user!.id}>`)) prefix = `<@!${client.user!.id}>`;
    else if (message.content.startsWith(`<@${client.user!.id}>`)) prefix = `<@${client.user!.id}>`;

    if (message.content === prefix) return message.channel.createMessage(`<a:nayuSway:750775148000444467>`);
    if (!message.content.startsWith(prefix)) return;

    try {
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        let command = args.shift()?.toUpperCase() || '';

        if (aliases.has(`${command} ${args[0]?.toUpperCase()} ${args[1]?.toUpperCase()} ${args[2]?.toUpperCase()}`)) command = aliases.get(`${command} ${args.shift()?.toUpperCase()} ${args.shift()?.toUpperCase()} ${args.shift()?.toUpperCase()}`) as string;
        else if (aliases.has(`${command} ${args[0]?.toUpperCase()} ${args[1]?.toUpperCase()}`)) command = aliases.get(`${command} ${args.shift()?.toUpperCase()} ${args.shift()?.toUpperCase()}`) as string;
        else if (aliases.has(`${command} ${args[0]?.toUpperCase()}`)) command = aliases.get(`${command} ${args.shift()?.toUpperCase()}`) as string;
        else if (aliases.has(command)) command = aliases.get(command) as string;
        else return;

        const commandObj = commands.get(command) as any;

        if (commandObj.config.owner === true && message.author.id !== '228182903140515841') return;
        if (commandObj.config.args > args.length) return message.channel.createMessage('Invalid command usage!');

        commandObj.run(message, client, args, prefix);
    } catch (error) {
        console.error(error);
    }
};
