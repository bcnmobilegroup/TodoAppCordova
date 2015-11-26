module Todos {
    'use strict';

    import Paths = Constants.Paths;
    let Page = Paths.Todos;

    export class TodoController {

        public todo: TodoItem;
        public showActions: boolean = false;

        constructor(
            protected todosService: ITodosService,
            protected $state: ng.ui.IStateService
        ) { }

        public save(): void {
            this.todosService.add(new TodoItem(this.todo.text)).then(addeddOnline => {
                this.goToList();
            });
        }

        protected goToList(): void {
            this.$state.go(Paths.Tabs + '.' + Page.Base);
        }
    }

    angular.module(Constants.Paths.Todos.Base)
        .controller('todoController', TodoController);
}


