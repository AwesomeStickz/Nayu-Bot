import { Client, Message } from 'eris';
import { emojis } from '../utils/emojis';

export const run = async (message: Message, client: Client) => {
    const pingMessage = await message.channel.createMessage(`${emojis.typing} Pinging...`);

    pingMessage.edit(`Pong! \`${(pingMessage.editedTimestamp || pingMessage.createdAt) - (message.editedTimestamp || message.createdAt)}ms\`\nHeartbeat: \`${Math.round(client.guilds.get(message.guildID!)!.shard.latency)}ms\``);
};

export const help = {
    aliases: ['ping'],
    name: 'Ping',
    description: "Check the bot's ping to the Discord API and gateway",
    usage: ['ping'],
    example: ['ping'],
};

export const config = {
    args: 0,
};
