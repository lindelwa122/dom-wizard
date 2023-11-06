# Quick Start

In this guide, you'll be introduced to DOM Wizard and learn how to use it to create your web applications. The easiest way to include DOM Wizard is to initiate your project using `npx create-project-with-dom-wizard <project-name>`.

For a more comprehensive guide, refer to the [documentation](/DOCUMENTATION.md).

## Table of Content

- [Prerequisites](#prerequisites)
- [How to create DOM elements](#how-to-create-dom-elements)
  - [Other properties](#other-properties)
  - [Creating an element with children](#creating-an-element-with-children)
- [How to style elements](#how-to-style-elements)
  - [Adding styles using domManager](#adding-styles-using-dommanager)
  - [Adding styles using cssManager.createCSSRule](#adding-styles-using-cssmanagercreatecssrule)
  - [Adding styles using cssManager.addRule](#adding-styles-using-cssmanageraddrule)
- [Adding event handlers](#adding-event-handlers)
- [Manipulating elements](#manipulating-elements)
- [How to update elements](#how-to-update-elements)
- [How to retrieve information about elements](#how-to-retrieve-information-about-elements)
- [How to remove an element](#how-to-remove-an-element)
- [How to navigate to another route](#how-to-navigate-to-another-route)
- [How to use the store](#how-to-use-the-store)

## Prerequisites

Before you get started, make sure you have a good understanding of HTML, JavaScript, and JavaScript Objects. If you're not using `create-project-with-dom-wizard` to set up your project, you may also need a build tool like Webpack.

## How to Create DOM Elements

To create an HTML element, you'll need to utilize `domManager.create()`. This function requires an object that describes the element and a selector for the parent where the new element will be placed (by default, the function uses `#root` as the selector). Here's an example of how to use `domManager.create` to create a div with the text "Hello, world!":

```javascript
import { domManager } from 'dom-wizard';

const div = {
  tagName: 'div',
  options: {
    textContent: 'Hello, world!',
  },
};

domManager.create(div, '#container');
```

In fact, there's a shortcut to achieve the same result. Since 'div' is commonly used, you can omit `tagName` when creating a div (`div` is the default for `tagName`). The 'text' property is also frequently used, so there's a shortcut for it as well. You can use the 'text' property outside of the 'options' object for the same effect.

The code below accomplishes the same result as the code above:

```javascript
import { domManager } from 'dom-wizard';

const div = { text: 'Hello, world!' };

domManager.create(div, '#container');
```

### Other Properties

You can add any property to an element by including it in the 'options' object. As you saw in the previous example, we manipulated the 'textContent' within 'options'. Take note of the following examples.

Creating an element with a div and a class name:

```javascript
import { domManager } from 'dom-wizard';

const div = {
  tagName: 'div',
  options: {
    textContent: 'Hello, world!',
    className: 'content', // here
  },
};

domManager.create(div, '#container');
```

Creating an input element with multiple classes, an ID, a placeholder, and other properties:

```javascript
import { domManager } from 'dom-wizard';

const input = {
  tagName: 'input',
  options: {
    classList: ['form-field', 'input'], // must be an array
    type: 'text',
    id: 'username',
    placeholder: 'Fill in your username',
    name: 'username',
    required: true,
  },
};

domManager.create(input, '#container');
```

### Creating an Element with Children

To create an element with its own children, you can use the 'children' property, as shown here:

```javascript
import { domManager } from 'dom-wizard';

const leftDiv = { text: 'DOM Wizard' };

const rightDiv = {
  tagName: 'img',
  options: {
    src: 'https://image-lib/dhj4kk.jpg',
    alt: 'profile image',
  },
};

const nav = {
  tagName: 'nav',
  children: [leftDiv, rightDiv], // Look here
};

domManager.create(nav, '#container');
```

In the above code, 'nav' has two children, a 'div' and an 'img' element.

## How to Style Elements

The best way to style your elements is to use CSS. However, there are situations where you may need to add styles using JavaScript, and DOM Wizard provides functionality for such scenarios.

### Adding Styles Using domManager

When you create your elements, you can simply include the 'style' property within 'options'. Here's how you can create a 100x100 red circle:

```javascript
import { domManager } from 'dom-wizard';

const circle = {
  options: {
    style: {
      height: '100px',
      width: '100px',
      backgroundColor: '#f00',
      borderRadius: '50%',
    },
  },
};

domManager.create(circle, '#container');
```

### Adding Styles Using cssManager.createCSSRule

You can achieve the same result by providing a class name for the div and applying the styles using `cssManager.createCSSRule`.

```javascript
import { domManager, cssManager } from 'dom-wizard';

const circle = {
    options: { className: 'red-circle' },
};

cssManager.createCSSRules([
    '.red-circle': `
        height: 100px;
        width: 100px;
        background-color: #f00;
        border-radius: 50%;
    `
]);

domManager.create(circle, '#container');
```

### Adding Styles Using cssManager.addRule

This allows you to add one rule at a time, but it returns an index that can be used to remove the rule by invoking `cssManager.removeRule()` and passing the index as an argument.

You can add a rule to an element and remove it when a specific event occurs or when certain conditions change, as shown in this example:

```javascript
import { domManager, cssManager } from 'dom-wizard';

const circle = {
  options: {
    className: 'circle', // class
    style: {
      height: '100px',
      width: '100px',
      backgroundColor: '#f00',
      borderRadius: '50%',
    },
  },
};

domManager.create(circle, '#container');

const ruleIndex = cssManager.addRule({ '.circle': 'background-color: blue' });

// A click event occurs
document.querySelector('.circle').addEventListener('click', () => {
  cssManager.removeRule(ruleIndex);
});
```

## Adding Event Handlers

You can add event handlers just like you add other properties within 'options'. Here's how you can add an alert when a button is clicked:

```javascript
import { domManager } from 'dom-wizard';

const button = {
  tagName: 'button',
  options: {
    onclick: () => alert('I was clicked'),
  },
};

domManager.create(button);
```

All other event listeners are supported; you can add them as you added 'onclick' in the above example. Properties like 'onblur', 'onfocus', and more can be used.

## Manipulating Elements

You can manipulate elements or perform actions before or after the element has been added to the page. This is possible by using the 'before' and 'after' properties. The 'before' function is invoked before the element is added to the page, and 'after' is invoked after the element has been added.

This can be useful in various scenarios. For example, if you can't add a 'dataset' using 'options', you can use 'before' like this:

```javascript
import { domManager } from 'dom-wizard';

const div = {
  text: 'I am a div',
  before: (el) => (el.dataset.id = 1),
};

domManager.create(div);
```

Before the div is

added to the page, 'before' will be invoked, adding the 'data-id: 1' attribute to the element.

Please note that the 'element' itself is passed as an argument in both 'before' and 'after' functions.

## How to Update Elements

`domManager.update()` provides a wide range of functionalities for updating the DOM. Below are different examples of how to use `domManager.update()`. For a comprehensive explanation of this feature, refer to the [documentation](/DOCUMENTATION.md).

- **Update Element's Properties:** With this feature, you can update any properties of the selected element, including 'className', 'textContent', 'innerHTML', and more. Here, we update the 'innerHTML' of the div with the class 'container':

  ```javascript
  import { domManager } from 'dom-wizard';

  domManager.update({
    selector: 'container',
    action: 'update',
    innerHTML: '<p>I am a new paragraph</p>',
  });
  ```

- **Replace 'Old' with 'New':** You can replace something old with something new, but this only works with properties that support the 'replace' function. In the example below, we replace 'Hello' with 'Heyya' in the text of the paragraph:

  ```javascript
  import { domManager } from 'dom-wizard';

  domManager.update({
    selector: 'container',
    action: 'replace',
    attribute: 'textContent', // what I want to update
    old: 'Hello',
    new: 'Heyya',
  });
  ```

  The above code will only replace the first occurrence of 'Hello'. To replace all 'Hello' instances, you can use 'replaceAll' as an 'action'.

- **Toggle 'className':** You can even toggle a 'className' using 'update'. Here's how you can toggle the class 'active' in a 'container':

  ```javascript
  import { domManager } from 'dom-wizard';

  domManager.update({
    selector: 'container',
    action: 'toggle',
    className: 'active',
  });
  ```

- **Remove Children of an Element Based on a Condition:** In the example below, a child of the selected element will be removed if it has a 'dataset.id' that matches 'uXp7':

  ```javascript
  import { domManager } from 'dom-wizard';

  domManager.update({
    selector: 'container',
    action: 'removeChild',
    predicate: (child) => child.dataset.id === 'uXp7',
  });
  ```

## How to Retrieve Information About Elements

You can extract specific information from an element. For instance, you can retrieve the `textContent` of an element matching the selector `.content`. Here's how you can do it:

```javascript
import { domManager } from 'dom-wizard';

const data = domManager.read('.content', 'textContent');
```

As you can see, the `read` method requires the first argument to be the `selector` you want to retrieve information from, and the second argument specifies the type of `information` you want to retrieve.

If you want to obtain a list of all `textContent` values from matching selectors, you can use the `all` parameter (by default, `all` is set to false). Here's how:

```javascript
import { domManager } from 'dom-wizard';

const data = domManager.read('.content', 'textContent', true);
```

To obtain the element itself, you can provide only the selector like this:

```javascript
import { domManager } from 'dom-wizard';

const element = domManager.read('.content');
```

To obtain all matching elements, you can use the following code:

```javascript
import { domManager } from 'dom-wizard';

const elements = domManager.read('.content', undefined, true);
```

## How to Remove an Element

To eliminate an element from the DOM, you can use the `remove` method from `domManager`. Here's how:

```javascript
import { domManager } from 'dom-wizard';

domManager.remove('.content');
```

The code above will remove the element with a class of `.content`.

## How to Navigate to Another Route

To navigate to other routes, you first need to register them in the 'router'. Here's an example of how to register 'routes':

```javascript
import { router } from 'dom-wizard';
import home from './routes/home';
import contact from './routes/contact';
import about from './routes/about';

const routes = [
  { id: 'home', route: home },
  { id: 'contact', route: contact },
  { id: 'about', route: about },
];

router.register(routes);
```

`router.register` expects an array with objects containing 'id' and 'route' properties. 'id' should be a unique string to uniquely identify each route, and 'route' is an object used to create elements (similar to what you've seen in the above examples).

When creating elements, you can include the 'link' property so that when that element is clicked, you can navigate to another page. Here's how to do it:

```javascript
import { domManager } from 'dom-wizard';

const button = {
  tagName: 'button',
  link: {
    name: 'button',
    to: 'home',
  },
};

domManager.create(button);
```

Clicking on the button will navigate to the 'home' route. This is why 'id' is important when registering 'routes'. 'to' must match the 'id' of the route you would like to navigate to. 'name' refers to a group of links; for example, you can give the links in the navigation bar the same name. The 'name' property is required so that only one element from the same group can have the 'class' of 'active'.

'link' also has an optional 'host' property, which specifies where the router or page should be hosted or appended. By default, 'router' uses `#root`.

## How to Use the store

**\*Warning**: Be cautious when using the `store` as it is still experimental\*.

The `store` is useful for sharing variables across your application. You can use these variables from anywhere and update them as needed.

To create a store, you should invoke `store.createStore()` once. It throws an error if invoked more than once. The `createStore` function should be specifically invoked in src/store/store.js, and this file's functions should be executed before any other file. Fortunately, if you use `create-project-with-dom-wizard`, this will be taken care of for you.

It's recommended to keep `store.js` clean and include only the `createStore` method with its arguments, along with functions responsible for updating variables.

Here's an example of how you can create store:

```javascript
import { store } from 'dom-wizard';

store.createStore({
  user: {
    firstName: 'John',
    lastName: 'Doe',
    status: 'offline',
  },

  updateUserStatus: () => {
    const user = store.getState('user');
    user.status = user.status === 'online' ? 'offline' : 'online';
    store.updateState('user', user);
  },
});
```

In the above code we store a `user` object with some properties. We then have a function that will be used to update the user's status.

Here's how we can use these variables.

**Example 1: Getting user's first name in the app:**

```javascript
import { store } from 'dom-wizard';

const firstName = store.getState('user').firstName;
```

**Example 2: Updating user's status:**

```javascript
import { store } from 'dom-wizard';

store.getState('updateUserStatus')();
```
