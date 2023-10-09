# DOM Manipulation Library Documentation

[![npm version](https://badge.fury.io/js/@dom-manipulation-library%2Fdml.svg)](https://badge.fury.io/js/@dom-manipulation-library%2Fdml)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Welcome to the documentation for the DOM Manipulation Library, a JavaScript library that simplifies the manipulation of the Document Object Model (DOM) in web applications.

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Examples](#examples)
4. [Contributing](#contributing)
5. [Features](#features)
   - [domManager](#dommanager)
   - [Router](#router)
   - [createStyleSheet](#createstylesheet)
   - [store](#store)
6. [More Ways to Contribute](#more-ways-to-contribute)
7. [License](#license)
8. [Contact](#contact)

## Introduction<a name="introduction"></a>

The DOM Manipulation Library is designed to simplify the process of creating, updating, modifying, and deleting DOM elements in your web applications. It provides a set of functions and features to streamline DOM manipulation tasks, making it easier and more efficient for developers to work with the DOM.

## Getting Started<a name="getting-started"></a>

To get started with the DOM Manipulation Library, you can install it using npm or yarn:

```bash
npm install @dom-manipulation-library/dml
```

Once installed, you can import the library into your JavaScript files and start using its features.

## Examples<a name="examples"></a>

Here's an example of how you can create an element and append it to the DOM using the library:

```javascript
import domManager from '@dom-manipulation-library/dml';

const sidebar = () => {
  const upper = {
    tagName: 'div',
    options: {
      classList: ['upper', 'nv-class'],
    },
  };

  const lower = {
    tagName: 'span',
    options: {
      className: 'lower',
      style: { color: '#0f0' },
    },
  };

  return {
    tagName: 'div',
    options: {
      id: 'sidebar',
    },
    children: [upper, lower],
  };
};

domManager.create(sidebar());
```

This example demonstrates how to create elements and their children using simple objects, making DOM manipulation easier and more structured.

## Contributing<a name="contributing"></a>

We welcome contributions from the open-source community. Whether you want to suggest improvements, fix bugs, or add new features, your contributions are greatly appreciated. Here's how you can contribute:

1. **Fork the Repository:** Start by forking the [DOM Manipulation Library repository](https://github.com/lindelwa122/dom-manipulation-library).

2. **Clone the Repository:** Clone your forked repository to your local machine using Git:

- HTTPS

     ```bash
     git clone https://github.com/<your-username>/dom-manipulation-library.git
     ```

     OR

- SSH
  
     ```bash
     git clone git@github.com:<your-username>/dom-manipulation-library.git
     ```
  
     OR

- Github CLI:
  
     ```bash
     gh repo clone <your-username>/dom-manipulation-library
     ```

3. **Create a New Branch:** Create a new branch with a name that reflects the change you're making:

   ```bash
   git checkout -b <branch-name>
   ```

4. **Make Your Changes:** Make your desired changes or add new features. Remember to follow the [commit guidelines](/COMMIT_RULES.md) for clear and concise commit messages.

  - Short commit messages:
     ```bash
     git add <changed-files>
     git commit -m "<commit-message>"
     ```
  - Long commit messages:
     ```bash
     git add <changed-files>
     git commit
     ```

5. **Push Your Changes:** Push your changes to your forked repository on GitHub:

   ```bash
   git push origin <branch-name>
   ```

6. **Create a Pull Request:** Go to the original repository on GitHub and create a pull request. Be sure to include a detailed description of your changes and reference any related issues. For example, if you're addressing issue #6, add `Issue: #6` to your pull request comment. Review our [contributing guidelines](/CONTRIBUTING.md) for more information.

## Features<a name="features"></a>

The DOM Manipulation Library offers various features to simplify DOM manipulation in your web applications. Here's an overview of the features and their current status:

### domManager<a name="dommanager"></a>

The `domManager` is the core of the library, providing functions for creating, updating, reading, and deleting DOM elements. These functions make it easy to work with the DOM and manage elements efficiently.

```javascript
for (account of accounts) {
  if (account['result'] == 'empty') {
    card = document.createElement('div');
    card.classList = 'card';
    text = document.createTextNode('Not Found');
    card.appendChild(text);
    display.appendChild(card);
    return;
  }

  card = document.createElement('div');
  card.classList = 'card';
  card.setAttribute('onclick', 'cardClicked(event)');
  content = document.createElement('div');
  content.classList = 'content';
  img = document.createElement('img');
  img.src = 'static/uploads/' + account['image'];
  span = document.createElement('span');
  username = document.createTextNode(account['username']);
  span.appendChild(username);
  content.appendChild(img);
  content.appendChild(span);
  extraContent = document.createElement('div');
  extraContent.classList = 'extra-content';
  date = document.createTextNode(
    calcDate(account['started_on']) + '/' + calcChallenge(account['level']),
  );
  extraContent.appendChild(date);
  card.appendChild(content);
  card.appendChild(extraContent);
  display.appendChild(card);
}
```

- [x] **create**: Create DOM elements and append them to the document.
- [ ] **update**: Update existing DOM elements.
- [x] **read**: Read information from DOM elements.
- [x] **delete**: Delete DOM elements from the document.

For more details on how to use these functions, refer to the [domManager documentation](https://github.com/lindelwa122/dom-manipulation-library/issues).

### Router<a name="router"></a>

The `Router` feature enables navigation between different routes in your web application without the need for page reloading. You can define routes and easily switch between them.

**_router.js_**

```javascript
import home from './routes/home';
import about from './routes/about';
import contacts from './routes/contact';

const routes = [
  { id: 'homePage', route: home },
  { id: 'aboutPage', route: about },
  { id: 'contactsPage', route: contacts },
];

export default routes;
```

Here's how you can register routes and navigate to another page.

**_index.js_**

```javascript
import domManager, { router } from '@dom-manipulation-library/dml';
import routes from './routes/router';

const initialPage = {
  tagName: 'button',
  options: {
    link: {
      name: 'navigation',
      to: 'home',
      host: '.sidebar',
    }, // look here
    innerHTML: 'Click Me - About',
  },
};

domManager.create(initialPage);
router.register(routes);
```

- [ ] **register**: Register routes for your application.
- [ ] **configureLink**: Helper function for setting up route links.
- [ ] **activate**: Private function to add the 'active' class to clicked elements.
- [ ] **deactivate**: Private function to remove the 'active' class from elements.

Learn more about how to implement routing in your application by visiting the [Router documentation](https://github.com/lindelwa122/dom-manipulation-library/issues).

### createStyleSheet<a name="createstylesheet"></a>

With `createStyleSheet`, you can style the content of your web page dynamically by creating and managing CSS rules.

```javascript
import { createStyleSheet } from '@dom-manipulation-library/dml';

createStyleSheet.createCSSRule({
  body: {
    color: '#f8f8f8',
    backgroundColor: '#0fa',
  },

  '#main > .content': {
    overflow: 'hidden',
  },
});
```

- [ ] **createCSSRule**: Create CSS rules for specific selectors and declarations.
- [ ] **createMediaQueryRule**: Define CSS rules for media queries.
- [ ] **configStateRule**: Add styles to elements based on their state.
- [ ] **createStyle**: Apply styles to elements.

Explore how to use these styling features in the [createStyleSheet documentation](https://github.com/lindelwa122/dom-manipulation-library/issues).

### store<a name="store"></a>

The `store` feature allows you to store and manage variables that are accessible throughout your application. You can retrieve and update these variables from any part of your app.

- [ ] **createStore**: Create variables with initial states.
- [ ] **getState**: Get the current state of a variable.
- [ ] **updateState**: Modify the state of variables.

Learn more about the `store` feature in the [store documentation](https://github.com/lindelwa122/dom-manipulation-library/issues).

**NOTE:** Unchecked boxes indicate that the feature is not yet completed, while checked boxes indicate completed features. You are welcome to contribute to and improve existing features or propose new ones through issues. For more details, refer to our [contributing guidelines](/CONTRIBUTING.md).

## More Ways to Contribute<a name="more-ways-to-contribute"></a>

You can contribute to the DOM Manipulation Library in various ways beyond code contributions:

- [ ] Enhance this README.
- [ ] Draft documentation.
- [ ] Create tutorials for users.
- [ ] Produce video tutorials.
- [ ] Write tests to ensure code quality.
- [ ] Design a logo for the project.
- [ ] Report and help fix bugs.
- [ ] Suggest additional features or improvements.

Your contributions in any form are valuable and help make this library better for everyone.

## License<a name="license"></a>

The DOM Manipulation Library is distributed under the MIT License

## Contact<a name="contact"></a>

Lindelwa - nqabenhlemlaba22@gmail.com
Instagram - [https://www.instagram.com/q.codes\_\_](https://www.instagram.com/q.codes__)
GitHub - https://github.com/lindelwa122
