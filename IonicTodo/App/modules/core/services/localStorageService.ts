module Core {
    'using strict';

    export class LocalStorageService implements ILocalStorageService {

        public get(key: string): any {
            let element = window.localStorage[key];
            if (!element) {
                return null;
            }
            return JSON.parse(element);
        }

        public set(key: string, value: any): void {
            let element = JSON.stringify(value);
            window.localStorage[key] = element;
        }
    }

    angular.module(Constants.Paths.Core)
        .service('localStorageService', LocalStorageService);
}