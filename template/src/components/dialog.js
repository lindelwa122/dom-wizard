import xLg from 'bootstrap-icons/icons/x-lg.svg';
import { domManager, store } from 'dom-wizard';
import updateDisplay from '../helpers/updateDisplay';

const header = () => {
  const x = {
    children: [{ tagName: 'img', options: { src: xLg } }],
    options: {
      onclick: () => {
        const dialog = document.querySelector('dialog');
        dialog.close();
      },
    },
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '20px',
  };

  return {
    children: [x],
    options: {
      style: headerStyle,
    },
  };
};

const form = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    const todo = e.target[0].value;
    const updateTodos = store.getState('updateTodos');
    updateTodos(todo);

    domManager.update({
      selector: 'input#task-name',
      action: 'update',
      value: '',
    });

    // Update display
    updateDisplay();

    // Close modal
    const dialog = document.querySelector('dialog');
    dialog.close();
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '10px',
    fontSize: '1.2rem',
    outline: 'none',
  };

  const input = {
    tagName: 'input',
    options: {
      placeholder: 'Write the title of your todo here',
      id: 'task-name',
      required: true,
      style: inputStyle,
    },
  };

  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '17px',
    fontSize: '1.2rem',
    backgroundColor: 'purple',
    color: 'white',
    marginTop: '20px',
    border: 'none',
    cursor: 'pointer',
  };

  const button = {
    tagName: 'button',
    options: {
      textContent: 'Save Todo',
      style: buttonStyle,
    },
  };

  return {
    tagName: 'form',
    children: [input, button],
    options: {
      style: { textAlign: 'center' },
      onsubmit: submitHandler,
    },
  };
};

const dialog = {
  tagName: 'dialog',
  children: [header(), form()],
  options: {
    style: {
      borderRadius: '10px',
      border: 'none',
    },
  },
};

export default dialog;
