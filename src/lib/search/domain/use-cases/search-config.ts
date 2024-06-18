import type { SearchConfigRepository, SearchOptions } from '../interfaces/data-interfaces';
import type { UserSearchOptions } from '../interfaces/presentation-interfaces';

export class SearchConfig {
    constructor(searchConfigRepository: SearchConfigRepository) {
        this.repo = searchConfigRepository;
    }

    repo: SearchConfigRepository;

    configureOptions(options: UserSearchOptions): SearchOptions {
        const docSet = this.repo.collectionToDocSet(options.collection);
        const ignore = options.matchAccents ? undefined : this.repo.searchIgnore();
        const substitute = options.matchAccents ? undefined : this.repo.searchSubtitute();
        const locale = this.repo.userLocale();
        return {
            docSet,
            collection: options.collection,
            wholeWords: options.wholeWords,
            ignore,
            substitute,
            locale
        };
    }
}