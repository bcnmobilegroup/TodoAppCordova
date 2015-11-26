module Todos {
    'use strict';


    class UpdateTodoController extends TodoController{

        constructor(
            todosService: ITodosService,
            $state: ng.ui.IStateService,
            private $stateParams: ng.ui.IStateParamsService
        ) {
            super(todosService, $state);
            this.todo = $stateParams['todoItem'];
            this.showActions = true;
        }

        public save(): void {
            this.todosService.update(this.todo).then(addeddOnline => {
                this.goToList();
            });
        }

        public upload(): void {
            this.todosService.insertOnline(this.todo).then(addeddOnline => {
                this.todo.stored = addeddOnline;
                this.goToList();
            });
        }

        public remove(): void {
            this.todosService.remove(this.todo).then(removedOnline => {
                this.goToList();
            });
        }
    }

    angular.module(Constants.Paths.Todos.Base)
        .controller('updateTodoController', UpdateTodoController);
}


