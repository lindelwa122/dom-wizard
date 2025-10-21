# Tutorial: Todo App

In this tutorial, you will build a small todo app. The todo app will have functionalities for adding, removing, and updating the state of todos. This will help you understand the fundamentals of DOM Wizard and how to create your project with it.

For a more detailed explanation of how DOM Wizard works, please refer to the [documentation](/DOCUMENTATION.md). For more examples of how to use DOM Wizard, check the [Quickstart](/QUICKSTART.md).

## Getting Started

To begin, create your app by running the following command:

```
npx create-project-with-dom-wizard todo-app
```

This command will set up a ready template for you to start creating your application.

Navigate to your project directory by running `cd todo-app`.

Your file structure should resemble the following (focus on `src`):

- ...
- src/
  - components/
    - dialog.js
    - emptyView.js
    - header.js
    - todo.js
    - todosView.js
  - css/
    - style.css
  - helpers/
    - updateDisplay.js
  - index.js
  - router.js
  - routes/
    - home.js
    - landingPage.js
  - store/
    - store.js
- ...

To start fresh, you should delete the following folders and files: `components/`, `helpers/`, and `routes/`, and remove the contents of `index.js`, and `store/store.js`. You can do this with the following command:

```
rm -r src/components/ src/helpers/ src/routes/ src/router.js
```

After executing the command, your file structure should look like this:

- ...
- src/
  - css/
    - style.css
  - index.js
  - store/
    - store.js
- ...

Now, to open your application in the browser and see it update as you make changes, use the following command:

```
npm run start
```

## Creating Elements

Let's start by creating our first route (or page). We store routes in the `routes` directory. To create the `routes` directory, run:

```
mkdir src/routes
```

Inside the `routes` directory, create our first page, which is `landingPage.js`. We include an additional route (`landingPage.js`) in our todo app just for practicing routing.

Inside `landingPage.js`, create an empty function named `mainContent`:

**_src/routes/landingPage.js:_**

```javascript
const mainContent = () => {};
```

Within the `mainContent` function, we will create two elements: a heading and a button. Start with the button, and add the following code to your `mainContent` function:

**_src/routes/landingPage.js:_**

```javascript
const heading = {
  tagName: 'h1',
  text: 'Todo App Made With DOM Wizard',
  options: {
    style: {
      fontSize: '4rem',
      paddingTop: '100px',
      marginBottom: '30px',
    },
  },
};
```

In the above code, we define a heading, which is an `h1` element with the text content "Todo App Made with DOM Wizard." When defining elements, the `tagName` is required to specify the type of element, except when creating `div` elements since `div` is the default value. You can also define any properties of the element inside the `options`, including `style`.

Next, add the button to `mainContent`:

**_src/routes/landingPage.js:_**

```javascript
const button = {
  tagName: 'button',
  text: 'Get Started',
  options: {
    style: {
      padding: '10px 20px',
      borderRadius: '17px',
      fontSize: '1.2rem',
      backgroundColor: 'purple',
      color: 'white',
      cursor: 'pointer',
      border: 'none',
    },
  },
};
```

`mainContent` serves as a container, which is a `div` element containing both the `heading` and a `button`. Therefore, `mainContent` should return a `div` with two children: `h1` and a `button`.

**_src/routes/landingPage.js:_**

```javascript
const mainContent = () => {
    ...

    return {
        children: [heading, button],
        options: {
            style: {
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
            },
        },
    };
}
```

The `tagName` is omitted because `mainContent` returns a `div`, and the default value for `tagName` is `div`. You can add children to an element as an array using the `children` property.

Let's create the landing page container elements and import it. The landing page will have one additional child, which is the `header`, and we'll add it later.

**_src/routes/landingPage.js_**

```javascript
...

const landingPage = {
  children: [mainContent()],
};

export default landingPage;
```

At this point, your `landingPage.js` should look like this:

```javascript
const mainContent = () => {
  const heading = {
    tagName: 'h1',
    text: 'Todo App Made With DOM Wizard',
    options: {
      style: {
        fontSize: '4rem',
        paddingTop: '100px',
        marginBottom: '30px',
      },
    },
  };

  const button = {
    tagName: 'button',
    text: 'Get Started',
    options: {
      style: {
        padding: '10px 20px',
        borderRadius: '17px',
        fontSize: '1.2rem',
        backgroundColor: 'purple',
        color: 'white',
        cursor: 'pointer',
        border: 'none',
      },
    },
  };

  return {
    children: [heading, button],
    options: {
      style: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
      },
    },
  };
};

const landingPage = {
  children: [mainContent()],
};

export default landingPage;
```

You can now import `landingPage` in `index.js` and use `domManager` to create your application. Here's how to do it:

**_src/index.js:_**

```javascript
import { domManager } from 'dom-wizard';
import landingPage from './routes/landingPage';
import './css/style.css';

domManager.create(landingPage);
```

Open your browser and check your created application.

## Creating Components

It's common to divide a page into multiple components for reusability. One good example of a component is a `header` or navigation bar. It's a component that can be used across multiple pages.

Let's create the `header`, but before we do that, create the `src/components` directory and create `header.js` inside it.

Your `header.js` should look like this:

**_src/components/header.js:_**

```javascript
const leftDiv = {
  text: 'ToDo',
  options: {
    style: {
      fontSize: '1.2rem',
      fontWeight: 800,
    },
  },
};

const rightDiv = {
  text: 'DOM Wizard',
};

const header = {
  options: {
    id: 'header',
    style: {
      padding: '25px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'purple',
      color: 'white',
    },
  },
  children: [leftDiv, rightDiv],
};

export default header;
```

Update your `landingPage.js` by importing the `header` and using it as a child of `landingPage`:

**_src/routes/landingPage.js:_**

```javascript
import header from '../components/header';

...

const landingPage = {
  children: [header, mainContent()],
};

...
```

Open the browser again, and you'll see the updated version of the landing page with a header.

Now, let's create the home page. Create `home.js` in the `routes` directory and add the following code to your `index.js`:

**_src/routes/home.js:_**

```javascript
import header from '../components/header';

const home = {
  options: { id: 'home' },
  children: [header],
};

export default home;
```

## Navigating to Other Routes

Now we have two routes, 'landingPage' and 'home'. But how can we move from 'landingPage' to 'home'? To achieve this, we need to register the routes. First, create 'router.js' in 'src' and add the following code to the file.

**_src/router.js:_**

```javascript
import home from './routes/home';
import landingPage from './routes/landingPage';

const routes = [
  { id: 'home', route: home },
  { id: 'landingPage', route: landingPage },
];

export default routes;
```

In the code above, we create an array with two objects, each representing a route. Each route must have a unique 'id' and a 'route,' which is an object defining a page along with its components.

Next, import 'routes' and register them using the 'router' like this:

**_src/index.js:_**

```javascript
import { domManager, router } from 'dom-wizard';
import landingPage from './routes/landingPage';
import routes from './router';
import './css/style.css';

router.register(routes);
domManager.create(landingPage);
```

Now, we want to navigate to the home page when the button in 'landingPage.js' is clicked. To achieve this, we need to include a 'link' object when defining the button. This object has the following properties: 'name,' 'to,' and an optional 'host.' 'name' refers to a group of links, 'to' must match the 'id' of the route you want to navigate to, and 'host' is where you want to add the route (the default is '#root').

Update the 'button' in 'landingPage.js' like this:

**_src/routes/landingPage.js:_**

```javascript
...

const button = {
    ...,

    link: {
      name: 'button',
      to: 'home',
    },
};

  ...
```

Clicking the button should now navigate to the home page.

## Creating a Store

Let's add some properties in our store so that we can use them throughout the app. For this tutorial, we only need to store 'todos,' but we will also need to store functions that will be used to update 'todos.'

Add 'todos' in the store:

**_src/store/store.js:_**

```javascript
import { store } from 'dom-wizard';

store.createStore({
  todos: [],
});
```

Add a function to update 'todos' by adding a new todo to the array:

**_src/store/store.js:_**

```javascript
import { store } from 'dom-wizard';
import { nanoid } from 'nanoid'; // new import

store.createStore({
  todos: [],

  updateTodos: (newTodo) => {
    const todos = store.getState('todos');
    todos.push({ id: nanoid(), completed: false, taskName: newTodo });
    store.updateState('todos', todos);
  },
});
```

For the above code to work, you have to import 'nanoid,' which must be already installed.

Next, add a function to toggle the completed status of a 'todo':

**_src/store/store.js:_**

```javascript
import { store } from 'dom-wizard';
import { nanoid } from 'nanoid'; // new import

store.createStore({
  todos: [],

  updateTodos: (newTodo) => {
    const todos = store.getState('todos');
    todos.push({ id: nanoid(), completed: false, taskName: newTodo });
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
});
```

Lastly, we can add a function that will handle the removal of 'todos':

```javascript
import { store } from 'dom-wizard';
import { nanoid } from 'nanoid';

store.createStore({
  todos: [],

  updateTodos: (newTodo) => {
    const todos = store.getState('todos');
    todos.push({ id: nanoid(), completed: false, taskName: newTodo });
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
```

Above is our completed store. We'll use it in 'home.js.' We'll check if the 'todos' array is empty, and if so, we'll show an empty view. If we have any 'todos,' we'll display them.

To make this work, let's start by creating an 'emptyView.' In 'components,' create 'emptyView.js.' Add the following code to 'emptyView.js.'

**_src/components/emptyView.js:_**

```javascript
const emptyView = () => {
  const heading = {
    tagName: 'p',
    options: {
      textContent: 'No Todos Yet',
      style: {
        fontSize: '3rem',
        paddingTop: '100px',
        marginBottom: '30px',
      },
    },
  };

  const button = {
    tagName: 'button',
    options: {
      textContent: 'Create your first todo',
      style: {
        padding: '10px 20px',
        borderRadius: '17px',
        fontSize: '1.2rem',
        backgroundColor: 'purple',
        color: 'white',
        cursor: 'pointer',
        border: 'none',
      },
    },
  };

  return {
    children: [heading, button],
    options: {
      className: 'empty-view',
      style: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
      },
    },
  };
};

export default emptyView();
```

Then import 'emptyView.js' in 'home.js' and use it like this:

**_src/routes/home.js:_**

```javascript
import header from '../components/header';
import emptyView from '../components/emptyView'; // new import

const home = {
  options: { id: 'home' },
  children: [header, emptyView], // update
};

export default home;
```

Now, if you open the app in your browser and navigate to the home page, you'll see that it looks different now. Let's add 'todos.' We'll use a form and a dialog for that. So, let's get started. In 'components,' create 'dialog.js.'

Start your 'dialog.js' with this code:

**_src/components/dialog.js:_**

```javascript
const header = () => {};

const form = () => {};

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
```

In 'header,' we'll have an 'x' icon that will close the modal if clicked. Update 'header' like this:

**_src/components/dialog.js:_**

```javascript
import xLg from 'bootstrap-icons/icons/x-lg.svg';

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
```

In the above code, we add an 'onclick' handler on 'x,' and with 'domManager,' we can add any event handler in 'options.'

Update 'form' in 'dialog.js' this way:

**_src/components/dialog.js:_**

```javascript
...

const form = () => {
  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "10px",
    fontSize: "1.2rem",
    outline: "none",
  };

  const input = {
    tagName: "input",
    options: {
      placeholder: "Write the title of your todo here",
      id: "task-name",
      required: true,
      style: inputStyle,
    },
  };

  const buttonStyle = {
    padding: "10px 20px",
    borderRadius: "17px",
    fontSize: "1.2rem",
    backgroundColor: "purple",
    color: "white",
    marginTop: "20px",
    border: "none",
    cursor: "pointer",
  };

  const button = {
    tagName: "button",
    options: {
      textContent: "Save Todo",
      style: buttonStyle,
    },
  };

  return {
    tagName: "form",
    children: [input, button],
    options: {
      style: { textAlign: "center" },
    },
  };
};

...
```

Now, import `dialog.js` into `home.js` and include it as one of the children of `home`. Here's how you can do it:

**_src/routes/home.js:_**

```javascript
import header from '../components/header';
import emptyView from '../components/emptyView';
import dialog from '../components/dialog'; // new import

const home = {
  options: { id: 'home' },
  children: [header, dialog, emptyView], // updated
};

export default home;
```

In order to display the modal when needed, we need to add a click event listener on `emptyView.js`. Here's how you can do that (update the `button`):

**_src/components/emptyView.js:_**

```javascript
...

const button = {
    tagName: "button",
    options: {
      textContent: "Create your first todo",
      style: {
        ...
      },
      onclick: () => {
        const dialog = document.querySelector("dialog");
        dialog.showModal();
      },
    },
};

...
```

Clicking on this button will now show the modal.

Now, it is time to update the `todos` we have in our store every time we `submit` the form in `dialog.js`. To do this, we'll have to add a submit handler. Update the `form` in `dialog.js` like this:

**_src/components/dialog.js:_**

```javascript
import { store, domManager } from 'dom-wizard' // new import

...

const form = () => {
  const submitHandler = (e) => {
    e.preventDefault();

    // Update todo
    const todo = e.target[0].value;
    const updateTodos = store.getState("updateTodos");
    updateTodos(todo);

    // Clear the input field
    domManager.update({
      selector: "input#task-name",
      action: "update",
      value: "",
    });

    // Close the modal
    const dialog = document.querySelector("dialog");
    dialog.close();
  };

  ...

  return {
    tagName: "form",
    children: [input, button],
    options: {
      style: { textAlign: "center" },
      onsubmit: submitHandler, // update
    },
  };
};
```

When you add a `todo` in the form and submit it, the `todos` array is updated, but you might not see the effects immediately. To see these updates, we need to create a `todo` component.

Create a new file `todo.js` in the `src/components` directory and add the following code to it:

**_src/components/todo.js:_**

```javascript
import xLg from 'bootstrap-icons/icons/x-lg.svg';
import { cssManager, store } from 'dom-wizard';

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
```

In the code above, we have three important elements: `radio`, `taskName`, and `x`. The `radio` displays the completed status of a todo, and clicking on it toggles the status. `taskName` displays the name of the task, and `x` is used to remove the `todo`.

We also added some CSS styles using another method, `cssManager`'s `createCSSRule`, which takes an array of styles as an argument.

Now, let's create `todosView.js` in the `src/components` directory. This component will hold all the todos.

In `todosView.js`, add the following code, and take a moment to understand it:

**_src/components/todosView.js:_**

```javascript
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
```

Now, we are ready to start displaying `todos`. Update `home.js` in the following way:

**_src/routes/home.js:_**

```javascript
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
```

In the code above, we've added some styles, but most importantly, we fetch `todos` from the `store` and check if the length of `todos` is more than 0. If it is, we show `todosView`; otherwise, we show an empty view.

Even after making these changes, you might not see any difference because we are missing one more function. We need a function that will update the display whenever `todos` change. Let's create a directory `src/utils`, and inside it, create `updateDisplay.js`.

**_src/utils/updateDisplay.js:_**

```javascript
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
```

In the code above, we get the `#home` element and remove its last child, which is either `todosView` or `emptyView`. Then, we check if the `todos` array is empty or not. If it's empty, we display `emptyView`; otherwise, we display `todosView`.

Lastly, let's import `updateDisplay` and use it whenever we make a change to the `store`.

Import and invoke `updateDisplay` in `dialog.js`. This is the updated `submitHandler`:

**_src/components/dialog.js:_**

```javascript
import updateDisplay from '../utils/updateDisplay'; // new import

...

const form = () => {
    const submitHandler = (e) => {
    e.preventDefault();
    const todo = e.target[0].value;
    const updateTodos = store.getState("updateTodos");
    updateTodos(todo);

    domManager.update({
      selector: "input#task-name",
      action: "update",
      value: "",
    });

    // Update display
    updateDisplay(); // update

    // Close the modal
    const dialog = document.querySelector("dialog");
    dialog.close();
  };

  ...
}

...
```

Also, invoke `updateDisplay` in `todo.js` when toggling the completed status and when removing a `todo`. The updated `radio` and `x` elements in `todo.js` should look like this:

**_src/components/todo.js:_**

```javascript
import updateDisplay from '../utils/updateDisplay';

...

const radio = (checked, id) => ({
  options: {
    classList: ["radio", checked ? "checked" : ""],
    onclick: () => {
      const toggleCompleted = store.getState("toggleCompleted");
      toggleCompleted(id);
      updateDisplay();
    },
  },
  children: [
    {
      options: {
        className: "ball",
      },
    },
  ],
});

const task = (taskName) => ({ text: taskName });

const x = (id) => ({
  children: [{ tagName: "img", options: { src: xLg } }],
  options: {
    onclick: () => {
      const removeTodo = store.getState("removeTodo");
      removeTodo(id);
      updateDisplay();
    },
  },
});

...
```

That's it! Now our app is complete, and you can add, remove, and toggle todos. For a more detailed guide on how to use the library, refer to the [Quickstart](/QUICKSTART.md).
