import { Collection } from '@discordeno/bot';
import 'better-logger';
import 'dotenv/config';
import { readdir } from 'fs/promises';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { getClient } from './utils/getClient.js';
import { CommandFile } from './utils/typings/commandFileInterfaces.js';

export const client = getClient(process.env.BOT_TOKEN!);

export const commands: Collection<string, CommandFile> = new Collection();
export const aliases: Collection<string, string> = new Collection();

const __dirname = resolve(fileURLToPath(import.meta.url), '..');

// Command handler
const loadCommands = async () => {
    const files = await readdir(`${__dirname}/commands`);

    for (const file of files) {
        const props = await import(`./commands/${file}`);

        commands.set(props.help.name.toUpperCase(), { ...props, fileName: file });

        props.help.aliases.forEach((alias: string) => {
            aliases.set(alias.toUpperCase(), props.help.name.toUpperCase());
        });
    }

    console.log(`[Commands]\tLoaded a total amount of ${files.length} commands`);
};

// Event handler
const loadEvents = async () => {
    const files = await readdir(`${__dirname}/events`);

    for (const file of files) {
        const eventFile = await import(`./events/${file}`);
        const eventName = file.split('.')[0];

        client.events[eventName as keyof typeof client.events] = eventFile.run;
    }

    console.log(`[Events]\tLoaded a total amount of ${files.length} events`);
};

console.log('Nayu is waking up!');

loadCommands();
loadEvents();

client.start();

process.on('unhandledRejection', (error) => {
    console.error('Uncaught Promise Error: ', error);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception: ', error);
});
