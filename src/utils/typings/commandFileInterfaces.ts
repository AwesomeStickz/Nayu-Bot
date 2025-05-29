import { Message } from './ddTypings.js';

export interface CommandFile {
    run(message: Message, args: string[], prefix: string): Promise<Message | void>;
    help: {
        aliases: string[];
        name: string;
        description: string;
        usage: string[];
        example: string[];
    };
    config: {
        args: number;
    };
    fileName: string;
}
