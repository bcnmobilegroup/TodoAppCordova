module Core {
    'use strict';

    export interface IAzureStorageService {
        keys: AzureConfiguration,
        getAll(): ng.IPromise<Array<any>>,
        insert(item: any): ng.IPromise<Array<any>>,
        update(item: any): ng.IPromise<Array<any>>,
        remove(item: any): ng.IPromise<Array<any>>,
        setKeys(keys: AzureConfiguration): void,
        init(): void;
    }
}
