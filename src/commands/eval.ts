import { Client, Message } from 'eris';

// @ts-expect-error
export const run = async (message: Message, client: Client, args: string[]): Promise<Message | void> => {
    if (message.author.id !== '228182903140515841') return;

    try {
        const code = args.join(' ');
        let evaled = await eval(code);

        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
        if (evaled.includes(process.env.BOT_TOKEN)) return;

        message.channel.createMessage(`\`\`\`js\n${evaled}\`\`\``);
    } catch (err) {
        message.channel.createMessage(`\`ERROR\` \`\`\`js\n${err}\n\`\`\``);
    }
};

export const help = {
    aliases: ['eval'],
    name: 'Eval',
    description: 'Eval',
    usage: ['eval <code>'],
    example: ['eval console.log(true)'],
};

export const config = {
    args: 1,
    owner: true,
};
