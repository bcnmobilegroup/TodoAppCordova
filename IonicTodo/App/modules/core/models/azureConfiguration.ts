module Core {
    'use strict';

    export class AzureConfiguration {
        //public azureKey: string;
        //public azureUrl: string;

        constructor(
            public azureKey: string,
            public azureUrl: string) {
            // Equivalent to
            // this.azureKey = azurekey;
        }
    }
}