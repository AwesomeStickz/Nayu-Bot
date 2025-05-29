import { client } from '../nayu.js';
import { Message } from '../utils/typings/ddTypings.js';
import { run as messageEventRun } from './messageCreate.js';

export const run: typeof client.events.messageUpdate = async (message): Promise<Message | void> => {
    messageEventRun?.(message);
};
