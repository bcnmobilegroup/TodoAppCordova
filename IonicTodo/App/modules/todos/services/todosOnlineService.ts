module Todos {
    'using strict';

    declare var WindowsAzure: any;

    export class TodosOnlineService extends Core.AzureStorageService implements ITodosOnlineService {

        constructor(
            localStorageService: Core.ILocalStorageService
        ) {
            super(localStorageService);
        }

        public insert(todoItem: TodoItem): ng.IPromise<Array<TodoItem>> {
            return super.insert(todoItem);
        }

        public update(todoItem: TodoItem): ng.IPromise<Array<TodoItem>> {
            return super.update(todoItem);
        }

        public remove(todoItem: TodoItem): ng.IPromise<Array<TodoItem>> {
            return super.remove(todoItem);
        }
    }

    angular.module(Constants.Paths.Todos.Base)
        .service('todosOnlineService', TodosOnlineService);
}