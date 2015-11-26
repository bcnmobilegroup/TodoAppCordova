module Todos {
    'use strict';

    import Paths = Constants.Paths;
    let Page = Paths.Todos;

    angular.module(Page.Base, [])
        .config(statesConfiguration);

    function statesConfiguration(
        $stateProvider: ng.ui.IStateProvider
    ): void {

        $stateProvider
            .state(Paths.Tabs + '.' + Page.Base, {
                url: '/' + Page.Base,
                views: {
                    'todos-tab': {
                        controller: 'todosController as vm',
                        templateUrl: Paths.Modules + 'todos/views/todos.html'
                    }
                },
                resolve: {
                    todos: (
                        todosService: ITodosService,
                        loadingService: Core.ILoadingService
                    ) => {

                        loadingService.show();
                        return todosService.get().then((todos) => {
                            loadingService.hide();
                            return todos;
                        });
                    }
                }
            })
            .state(Paths.Tabs + '.' + Page.Add, {
                url: '/' + Page.Add,
                views: {
                    'todos-tab': {
                        controller: 'todoController as vm',
                        templateUrl: Paths.Modules + 'todos/views/todo.html'
                    }
                }
            })
            .state(Paths.Tabs + '.' + Page.Update, {
                url: '/' + Page.Update,
                params: { todoItem: null },
                views: {
                    'todos-tab': {
                        controller: 'updateTodoController as vm',
                        templateUrl: Paths.Modules + 'todos/views/todo.html'
                    }
                }
            }
        );
    }
}
