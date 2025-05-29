import { client } from '../../nayu.js';

export type Member = typeof client.transformers.$inferredTypes.member;
export type Message = typeof client.transformers.$inferredTypes.message;
