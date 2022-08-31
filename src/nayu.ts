import 'dotenv/config';
import { Client, ClientEvents, Collection, DiscordRESTError } from 'eris';
import fs from 'fs';

export const client = new Client(process.env.BOT_TOKEN!, { intents: ['guildMembers', 'guildMessages', 'guilds'], allowedMentions: { everyone: false, roles: true, users: true }, messageLimit: 100 });

// @ts-expect-error
export const commands: Collection = new Collection();
// @ts-expect-error
export const aliases: Collection = new Collection();

// Command handler
fs.readdir('./commands/', (error, files) => {
    if (error) return console.error(error);
    files.forEach((file) => {
        const props = require(`./commands/${file}`);
        props.fileName = file;
        commands.set(props.help?.name.toUpperCase(), props);
        props.help?.aliases.forEach((alias: string) => {
            aliases.set(alias.toUpperCase(), props.help.name.toUpperCase());
        });
    });
    console.log(`[Commands]\tLoaded a total amount of ${files.length} commands`);
});

// Event handler
fs.readdir('./events/', (error, files) => {
    if (error) return console.error(error);
    files.forEach((file) => {
        const eventFunction = require(`./events/${file}`);
        eventFunction.run.bind(null, client);
        const eventName = file.split('.')[0];
        client.on(eventName as keyof ClientEvents, (...args) => eventFunction.run(client, ...args));
    });
    console.log(`[Events]\tLoaded a total amount of ${files.length} events`);
});

process.on('unhandledRejection', (error) => {
    if (error instanceof DiscordRESTError) return;

    console.error('Uncaught Promise Error: ', error);
});

client.connect();
