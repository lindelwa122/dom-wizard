import { cssManager, store } from 'dom-wizard';
import dialog from '../components/dialog';
import emptyView from '../components/emptyView';
import header from '../components/header';
import todosView from '../components/todosView';

cssManager.createCSSRules([
  {
    '#home > .main': `
      display: flex;
      justify-content: center;
      font-size: 1.3rem;
      padding-top: 100px;
    `,
  },
  {
    '.add-new-todo': `
      cursor: pointer;
      border-radius: 10px;
      padding: 10px;
      transition: all .5s;
    `,
  },
  {
    '.add-new-todo:hover': `
      background-color: #cacaca;
    `,
  },
]);

const todos = store.getState('todos');

const home = {
  options: { id: 'home' },
  children: [header, dialog, todos.length > 0 ? todosView(todos) : emptyView],
};

export default home;
