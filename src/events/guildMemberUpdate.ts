import { Client, Guild, Member } from 'eris';

export const run = async (_client: Client, _guild: Guild, newMember: Member, _oldMember: { roles: string[] } | null) => {
    if (!newMember.pending && !newMember.roles.includes('530109367970824212') && !newMember.bot) newMember.addRole('530109367970824212');
};
