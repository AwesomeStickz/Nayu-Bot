import { Client } from 'eris';

export const run = async (client: Client) => {
    const Ready = [`--------------------------------------------------------`, `Ready since :  ${new Date().toUTCString()}`, `Bot         :  ${client.user!.username}`, `Members     :  ${client.guilds.reduce((acc, guild) => acc + guild.memberCount, 0).toLocaleString()}`, `Servers     :  ${client.guilds.size.toLocaleString()}`, `--------------------------------------------------------`].join('\n');

    console.log(`[Ready]\n${Ready}`);
};
