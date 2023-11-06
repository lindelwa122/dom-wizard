import xLg from 'bootstrap-icons/icons/x-lg.svg';
import { cssManager, store } from 'dom-wizard';
import updateDisplay from '../helpers/updateDisplay';

cssManager.createCSSRules([
  {
    '.radio': `
        border: 2px solid;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        cursor: pointer;
        padding: 2px;
    `,
  },
  {
    '.radio.checked > .ball': `
      height: 100%;
      background-color: #000;
      border-radius: 50%;
    `,
  },
  {
    '.todo': `
      display: flex;
      justify-content: space-between;
      gap: 10px;
      align-items: center;
      border-bottom: 1px solid;
      padding-bottom: 10px;
      margin-bottom: 10px;
      min-width: 200px;
    `,
  },
  {
    img: `
      cursor: pointer;
    `,
  },
]);

const radio = (checked, id) => ({
  options: {
    classList: ['radio', checked ? 'checked' : ''],
    onclick: () => {
      const toggleCompleted = store.getState('toggleCompleted');
      toggleCompleted(id);
      updateDisplay();
    },
  },
  children: [
    {
      options: {
        className: 'ball',
      },
    },
  ],
});

const task = (taskName) => ({ text: taskName });

const x = (id) => ({
  children: [{ tagName: 'img', options: { src: xLg } }],
  options: {
    onclick: () => {
      const removeTodo = store.getState('removeTodo');
      removeTodo(id);
      updateDisplay();
    },
  },
});

const todo = (todoInfo) => {
  const { id, completed, taskName } = todoInfo;

  const container = {
    options: {
      style: {
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
      },
    },
    children: [radio(completed, id), task(taskName)],
  };

  return {
    children: [container, x(id)],
    options: { className: 'todo' },
    before: (el) => {
      el.dataset.id = id;
    },
  };
};

export default todo;
