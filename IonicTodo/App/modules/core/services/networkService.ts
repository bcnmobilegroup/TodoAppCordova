module Core {
    'using strict';

    export class NetworkService {

        public isOnline: boolean = false;
        private states: any = {};

        constructor() {
            document.addEventListener('online', () => {
                this.isOnline = true;
            }, false);

            document.addEventListener('offline', () => {
                this.isOnline = false;
            }, false);

            var navigator: Navigator = window.navigator;
            this.isOnline = navigator.onLine;
        }
    }

    angular.module(Constants.Paths.Core)
        .service('networkService', NetworkService);
}