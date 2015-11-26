module Todos {
    'using strict';

    export class TodosService implements ITodosService {
        private todos: Array<TodoItem> = null;
        private uploading: boolean = false;
        private todosKey: string = Constants.Storage.LocalTable;

        constructor(
            private todosOnlineService: ITodosOnlineService,
            private localStorageService: Core.ILocalStorageService,
            private networkService: Core.INetworkService,
            private $q: ng.IQService
        ) { }

        private staticPromise(result: any): ng.IPromise<any> {
            var deferred = this.$q.defer();
            deferred.resolve(result);
            return deferred.promise;
        }

        private getOnline(): ng.IPromise<Array<TodoItem>> {
            return this.todosOnlineService.getAll();
        }

        private getOffline(): ng.IPromise<Array<TodoItem>> {
            return this.staticPromise(this.localStorageService.get(this.todosKey) || []);
        }

        private updateOnline(todoItem: TodoItem): ng.IPromise<any> {
            return this.todosOnlineService.update(todoItem);
        }

        private saveOffline(): void {
            this.localStorageService.set(this.todosKey, this.todos);
            setTimeout(() => {
                this.uploading = false;
            }, 10);
        }

        private updateTodos(): ng.IPromise<Array<TodoItem>> {
            return this.$q.all({
                online: this.getOnline(),
                offline: this.getOffline()
            }).then((data) => {
                let onlineTodos: Array<TodoItem> = data['online'];
                let offlineTodos: Array<TodoItem> = data['offline'];

                for (let i: number = 0, l: number = onlineTodos.length; i < l; i++) {
                    var todoOn = onlineTodos[i];
                    if (!offlineTodos.length) {
                        offlineTodos.push(todoOn);
                    } else {
                        let found = false;
                        for (let j: number = 0, ll: number = offlineTodos.length; j < ll; j++) {
                            if (!found && offlineTodos[j].id === todoOn.id) {
                                found = true;
                                break;
                            }
                        }

                        if (!found) {
                            offlineTodos.push(todoOn);
                        }
                    }
                }

                for (let i: number = 0, l: number = offlineTodos.length; i < l; i++) {
                    let todo = offlineTodos[i];
                    if (!todo.stored) {
                        this.insertOnline(todo);
                    }
                }

                this.todos = offlineTodos;
                return this.todos;
            });
        }

        public insertOnline(todoItem: TodoItem): ng.IPromise<boolean> {
            return this.todosOnlineService.insert(new TodoItem(todoItem.text, null, true, todoItem.date))
                .then((todo: any) => {
                    todoItem.id = todo.id;
                    todoItem.stored = true;
                    this.saveOffline();
                    return true;
                }, () => {
                    todoItem.stored = false;
                    this.saveOffline();
                    return false;
                });
        }

        public get(): ng.IPromise<Array<TodoItem>> {
            // If I've todos
            if (this.todos) {
                return this.staticPromise(this.todos);
            }

            // If not and I've not internet
            this.todosOnlineService.init();
            if (!this.networkService.isOnline) {
                return this.getOffline().then((todos: Array<TodoItem>) => {
                    this.todos = todos;
                    return this.todos;
                });
            } 

            // Otherwise
            return this.updateTodos();
        }

        public add(todoItem: TodoItem): ng.IPromise<boolean> {
            if (!this.uploading) {
                this.uploading = true;
                this.todos.push(todoItem);
                if (this.networkService.isOnline) {
                    return this.insertOnline(todoItem);
                }
                this.saveOffline();
            }
            return this.staticPromise(false);
        }

        public update(todoItem: TodoItem): ng.IPromise<boolean> {
            if (!this.uploading) {
                this.uploading = true;

                for (let i: number = 0, l = this.todos.length; i < l; i++) {
                    if (this.todos[i].id === todoItem.id) {
                        this.todos[i].text = todoItem.text;
                        break;
                    }
                }

                if (todoItem.stored && this.networkService.isOnline) {
                    return this.updateOnline(todoItem).then(() => {
                        this.saveOffline();
                        return true;
                    });
                } else {
                    for (let i: number = 0, l = this.todos.length; i < l; i++) {
                        if (this.todos[i].id === todoItem.id) {
                            this.todos[i].stored = false;
                            break;
                        }
                    }
                    this.saveOffline();
                }
            }
            return this.staticPromise(false);
        }

        public remove(todoItem: TodoItem): ng.IPromise<boolean> {
            if (!this.uploading) {
                this.uploading = true;
                let i = this.todos.indexOf(todoItem);
                this.todos.splice(i, 1);
                this.saveOffline();
                if (this.networkService.isOnline) {
                    this.todosOnlineService.remove(todoItem).then(() => {
                        return true;
                    });
                }
            }
            return this.staticPromise(false);
        }
    }

    angular.module(Constants.Paths.Todos.Base)
        .service('todosService', TodosService);
}