import todo from './todo';

const todosView = (todos) => {
  const todosContainer = {
    options: { className: 'todos-container' },
    children: [{ tagName: 'h1', text: 'Todos' }],
  };

  for (const todoInfo of todos) {
    todosContainer.children.push(todo(todoInfo));
  }

  const addTodo = {
    text: 'Add New Todo',
    options: {
      className: 'add-new-todo',
      onclick: () => {
        const dialog = document.querySelector('dialog');
        dialog.showModal();
      },
    },
  };

  todosContainer.children.push(addTodo);

  return {
    options: { className: 'main' },
    children: [todosContainer],
  };
};

export default todosView;
