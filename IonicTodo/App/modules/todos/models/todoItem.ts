module Todos {
    'use strict';

    export class TodoItem {

        constructor(
            public text: string,
            public id: number = Math.floor(Math.random() * 1000000) + 1,
            public stored: boolean = false,
            public date: number = Date.now()) {
        }
    }
}