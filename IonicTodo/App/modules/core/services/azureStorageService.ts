module Core {
    'using strict';

    declare var WindowsAzure: any;

    export class AzureStorageService implements IAzureStorageService {
        public keys: AzureConfiguration;
        protected table: any;

        constructor(
            private localStorageService: ILocalStorageService
        ) {
            this.keys = new AzureConfiguration(Constants.Storage.Azure.Key, Constants.Storage.Azure.Url);
        }

        public getAll(): ng.IPromise<Array<any>> {
            return this.table.read();
        }

        public insert(item: any): ng.IPromise<Array<any>> {
            return this.table.insert(item);
        }

        public update(item: any): ng.IPromise<Array<any>> {
            return this.table.update(item);
        }

        public remove(item: any): ng.IPromise<Array<any>> {
            return this.table.del(item);
        }

        public setKeys(keys: AzureConfiguration): void {
            this.keys = keys;
            this.localStorageService.set('azureKey', this.keys.azureKey);
            this.localStorageService.set('azureUrl', this.keys.azureUrl);
        }

        public loadKeys(): void {
            this.keys.azureKey = this.localStorageService.get('azureKey');
            this.keys.azureUrl = this.localStorageService.get('azureUrl');
        }

        public init(): void {
            this.loadKeys();
            if (this.keys.azureUrl && this.keys.azureKey) {
                var mobileService = new WindowsAzure.MobileServiceClient(this.keys.azureUrl, this.keys.azureKey);
                this.table = mobileService.getTable(Constants.Storage.Azure.Table);
            }
        }
    }

    angular.module(Constants.Paths.Core)
        .service('azureStorageService', AzureStorageService);
}