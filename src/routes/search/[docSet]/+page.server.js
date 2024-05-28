import { error } from '@sveltejs/kit';
import config from '$lib/data/config';
import { initProskomma, loadDocSetIfNotLoaded } from '../../../lib/data/scripture.js';

export async function load({ fetch, params }) {
    const docSets = config.bookCollections.map((bc) => ({
        id: `${bc.languageCode}_${bc.id}`,
        collection: bc.id
    }));

    const docSet = docSets.find((ds) => ds.id === params.docSet);

    if (!docSet) throw error(404);

    return { docSet: docSet.id, collection: docSet.collection };
}