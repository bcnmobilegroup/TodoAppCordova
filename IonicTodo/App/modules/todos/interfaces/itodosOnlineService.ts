module Todos {
    'use strict';

    export interface ITodosOnlineService extends Core.IAzureStorageService {
        insert(item: TodoItem): ng.IPromise<Array<TodoItem>>,
        update(item: TodoItem): ng.IPromise<Array<TodoItem>>,
        remove(item: TodoItem): ng.IPromise<Array<TodoItem>>;
    }
}
