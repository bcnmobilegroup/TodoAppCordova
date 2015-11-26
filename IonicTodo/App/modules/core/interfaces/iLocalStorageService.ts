module Core {
    'use strict';

    export interface ILocalStorageService {
        get(key: string): any,
        set(key: string, value: any): void;
    }
}
