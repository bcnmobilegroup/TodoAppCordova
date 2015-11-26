module Todos {
    'use strict';

    export interface ITodosService {
        get(): ng.IPromise<Array<TodoItem>>,
        add(todoItem: TodoItem): ng.IPromise<boolean>,
        update(todoItem: TodoItem): ng.IPromise<boolean>,
        insertOnline(todoItem: TodoItem): ng.IPromise<boolean>,
        remove(todoItem: TodoItem): ng.IPromise<boolean>;
    }
}
