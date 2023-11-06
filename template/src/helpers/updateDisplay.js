import { domManager, store } from 'dom-wizard';
import emptyView from '../components/emptyView';
import todosView from '../components/todosView';

const updateDisplay = () => {
  const todos = store.getState('todos');

  const home = document.querySelector('#home');
  home.childNodes[home.childNodes.length - 1].remove();

  if (todos.length > 0) {
    domManager.create(todosView(todos), '#home', true);
  } else {
    domManager.create(emptyView, '#home', true);
  }
};

export default updateDisplay;
