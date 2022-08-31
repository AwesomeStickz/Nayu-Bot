import { Client, Message } from 'eris';
import { run as messageEventRun } from './messageCreate';

export const run = async (client: Client, oldMessage: Message, newMessage: Message) => {
    if (oldMessage?.content === newMessage.content) return;

    messageEventRun(client, newMessage);
};
