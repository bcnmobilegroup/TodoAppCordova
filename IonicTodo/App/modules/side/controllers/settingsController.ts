module Side {
    'use strict';

    class SettingsController {

        private configuration: Core.AzureConfiguration;
        private serviceUrl: string;

        constructor(
            private localStorageService: Core.ILocalStorageService,
            private todosOnlineService: Todos.ITodosOnlineService
        ) {

            this.configuration = todosOnlineService.keys;
            this.saveConfiguration();
        }

        public saveConfiguration(): void {
            this.todosOnlineService.setKeys(this.configuration);
            this.todosOnlineService.init();
        }
    }

    angular.module(Constants.Paths.Side.Base)
        .controller('settingsController', SettingsController);
}