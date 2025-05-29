import { client } from '../nayu.js';

export const run: typeof client.events.ready = async () => {
    console.log('[Ready]\tNayu is ready!');
};
