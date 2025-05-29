import { client } from '../nayu.js';
import { emojis } from '../utils/emojis.js';
import { CommandFile } from '../utils/typings/commandFileInterfaces.js';

export const run: CommandFile['run'] = async (message) => {
    const pingMessage = await client.helpers.sendMessage(message.channelId, { content: `${emojis.typing} Pinging...` });

    client.helpers.editMessage(pingMessage.channelId, pingMessage.id, { content: `Pong! \`${(pingMessage.editedTimestamp || pingMessage.timestamp) - (message.editedTimestamp || message.timestamp)}ms\`\nHeartbeat: \`${Math.round(client.gateway.shards.get(0)?.heart.rtt || 0)}ms\`` });
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
