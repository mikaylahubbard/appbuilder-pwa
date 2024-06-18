import { language } from '$lib/data/stores/localization';
import { get } from 'svelte/store';

import type {
    SearchConfigRepository,
    SubstitutionMap
} from '../../domain/interfaces/data-interfaces';
import { extendStringProperty } from '../../utils/object-helpers';
import type { ConfigRepository } from './config-repository';

export class SearchConfigRepositoryImpl implements SearchConfigRepository {
    constructor(config: ConfigRepository) {
        this.config = config;
    }

    config: ConfigRepository;

    searchIgnore(): string {
        const data = this.config.searchAccentsToRemove();
        let ignore = '';
        for (const c of data.matchAll(/\\u(03\d\d)/g)) {
            const codePoint = parseInt(c[1], 16);
            const char = String.fromCodePoint(codePoint);
            ignore += char;
        }
        return ignore;
    }

    searchSubtitute(): SubstitutionMap {
        const data = this.config.searchAccentsToRemove();
        const sub = {};
        for (const match of data.matchAll(/(\S)>(\S)/g)) {
            extendStringProperty(sub, match[1], match[2]);
            extendStringProperty(sub, match[2], match[1]);
        }
        return sub;
    }

    collectionToDocSet(collection: string): string {
        const data = this.config.bookCollection(collection);
        return data.languageCode + '_' + data.id;
    }

    userLocale(): string {
        return get(language);
    }
}