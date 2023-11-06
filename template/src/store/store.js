import { store } from 'dom-wizard';
import { nanoid } from 'nanoid';

store.createStore({
  todos: [],

  updateTodos: (newTodo) => {
    const todos = store.getState('todos');
    todos.push({ id: 'd' + nanoid(), completed: false, taskName: newTodo });
    store.updateState('todos', todos);
  },

  toggleCompleted: (id) => {
    const todos = store.getState('todos');
    const newTodos = [];

    for (const todo of todos) {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }

      newTodos.push(todo);
    }

    store.updateState('todos', newTodos);
  },

  removeTodo: (id) => {
    const todos = store.getState('todos');

    const index = todos.findIndex((todo) => todo.id === id);
    todos.splice(index, 1);

    store.updateState('todos', todos);
  },
});
