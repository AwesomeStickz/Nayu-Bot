import { Intents, createBot, createDesiredPropertiesObject } from '@discordeno/bot';
import { createProxyCache } from 'dd-cache-proxy';

const desiredProperties = createDesiredPropertiesObject({
    attachment: {
        contentType: true,
    },
    channel: {
        guildId: true,
        id: true,
        name: true,
        parentId: true,
        permissionOverwrites: true,
        type: true,
    },
    guild: {
        channels: true,
        id: true,
        members: true,
        ownerId: true,
        roles: true,
    },
    member: {
        guildId: true,
        id: true,
        roles: true,
        toggles: true,
    },
    message: {
        attachments: true,
        author: true,
        channelId: true,
        content: true,
        editedTimestamp: true,
        guildId: true,
        id: true,
        member: true,
    },
    role: {
        id: true,
        permissions: true,
        position: true,
    },
    user: {
        id: true,
        toggles: true,
    },
});

export interface BotDesiredProperties extends Required<typeof desiredProperties> {}

export const getClient = (token: string) => {
    const client = createProxyCache(
        createBot<BotDesiredProperties>({
            token,
            intents: Intents.Guilds | Intents.GuildMembers | Intents.GuildMessages | Intents.MessageContent,
            desiredProperties,
        }),
        {
            cacheInMemory: {
                default: false,
                channel: true,
                guild: true,
            },
            desiredProps: {
                channel: ['guildId', 'id', 'internalOverwrites', 'name', 'parentId', 'permissionOverwrites', 'type'],
                guild: ['channels', 'id', 'members', 'ownerId', 'roles'],
                member: ['id', 'guildId', 'roles'],
            },
        }
    );

    return client;
};
