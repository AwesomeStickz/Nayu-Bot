import { client } from '../../nayu.js';

// In Memory Cached Objects
export type CachedChannel = typeof client.cache.$inferredTypes.channel;
export type CachedGuild = typeof client.cache.$inferredTypes.guild;
export type CachedMember = typeof client.cache.$inferredTypes.member;
export type CachedRole = typeof client.cache.$inferredTypes.role;
export type CachedUser = typeof client.cache.$inferredTypes.user;
