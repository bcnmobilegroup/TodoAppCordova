module Todos {
    'use strict';

    import Paths = Constants.Paths;
    let Page = Paths.Todos;

    class TodosController {

        constructor(
            private todosService: ITodosService,
            private $state: ng.ui.IStateService,
            private $ionicListDelegate: ionic.list.IonicListDelegate,
            private todos: Array<TodoItem>
        ) {}

        public addTodo(): void {
            this.$state.go(Paths.Tabs + '.' + Page.Add);
        }

        public editTodo(todo: TodoItem): void {
            this.$state.go(Paths.Tabs + '.' + Page.Update, { todoItem: todo });
            this.$ionicListDelegate.closeOptionButtons();
        }

        public removeTodo(todo: TodoItem): void {
            this.todosService.remove(todo);
            this.$ionicListDelegate.closeOptionButtons();
        }
    }

    angular.module(Constants.Paths.Todos.Base)
        .controller('todosController', TodosController);
} 

