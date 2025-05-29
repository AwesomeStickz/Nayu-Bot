import { client } from '../nayu.js';

export const run: typeof client.events.guildMemberUpdate = async (member, user): Promise<void> => {
    if (!member.pending && !member.roles.includes(530109367970824212n) && !user.bot) client.helpers.addRole(member.guildId, member.id, 530109367970824212n);
};
