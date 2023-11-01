# DOM Wizard &middot; ![Dynamic JSON Badge](https://img.shields.io/badge/license-MIT-blue.svg) ![npm (scoped)](https://img.shields.io/npm/v/dom-wizard) ![npm](https://img.shields.io/npm/dt/dom-wizard) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

<div align="center">
<p>A JavaScript library that allows easy manipulation of the DOM.</p>

![DOM Wizard Logo](./assets/images/logo.png)

<div>
    <a href="https://npm.runkit.com/dom-wizard">Try on RunKit</a>
    &middot;
    <a href="https://github.com/lindelwa122/dom-wizard/issues">Report Bugs</a>
    &middot;
    <a href="https://github.com/lindelwa122/dom-wizard/issues">Request Feature</a>
</div>

</div>

## About the project

DomWizard is a JavaScript library that simplifies DOM manipulation and CSS styling. It provides functions for creating, updating, reading, and deleting DOM elements, as well as managing CSS styles in a straightforward manner. The library also offers a lightweight routing system and an experimental global variable store for data management.

## Installation

To create your project using Dom Wizard, run the following command:

```
npx create-project-with-dom-wizard <name-of-your-project>
```

To install the Dom Wizard and start using its features run:

```
npm install dom-wizard
```

Read the docs [here]().

## Examples

Here's how you can create an element and append it to the DOM:

```javascript
import { domManager } from 'dom-wizard';

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

This allows you to easily create elements and their children using simple objects.

To read more about the features, jump to the [features section](#features).

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. [Fork](https://github.com/lindelwa122/dom-wizard/fork) this repository.

2. Clone the repository to your own machine by running one of the following commands:

   - HTTPS

   ```
   git clone https://github.com/<your-username>/dom-wizard.git
   ```

   OR

   - SSH

   ```
   git clone git@github.com:<your-username>/dom-wizard.git
   ```

   OR

   - Github CLI:

   ```
   gh repo clone <your-username>/dom-wizard
   ```

3. Create a new branch. The name of the branch must reflect the change you are about to make.

   ```
   git checkout -b <branch-name>
   ```

4. Make your changes or add your new feature. Remember to commit early and commit often. Read our commit rules [here](/COMMIT_RULES.md).

   - Short commit messages:
     ```
     git add <changed-files>
     git commit -m "<commit-message>"
     ```
   - Long commit messages:
     ```
     git add <changed-files>
     git commit
     ```

5. Push your changes to Github by running this command:

   ```
   git push origin <branch-name>
   ```

6. Go over to GitHub and create a pull request. Make sure to include a comment explaining the additions. Please include the issue number being addressed in your comment. For instance, if you were resolving issue 6, add `Issue: #6` at the end of your comment. For more information, please refer to our contributing rules [here](/CONTRIBUTING.md).

## Features

These are the features the library have. To learn more about each feature, click on the subtitle. Additionally, you can indicate on the Issues tab that you are working on a specific feature, although this is not mandatory. Click [here](/CONTRIBUTING.md) to read more about our contributing rules.

### domManager

The main idea behind the library was to create a tool that enables developers to easily create, update, modify, and delete DOM elements. The primary function of **domManager** is precisely to accomplish this task.

I wrote the code below a few months ago and it is to demonstrate how hard and error-prone it can be to manually append and modify elements to the DOM.

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

The same thing can be done with ease using the 4 functions that **domManager** will have:

- [x] **create**
- [x] **update**
- [x] **read**
- [x] **delete**

The functions will perform precisely as their names suggest, offering functionality to create, update, delete, and read elements. Click [here](https://github.com/lindelwa122/dom-wizard/issues) to read more about how they should operate.

### Router

**Router** will enable developers to navigate to different routes of the site without the page reloading.

Here's an example showcasing how easy it could be to utilize this feature in your app.

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
import { domManager, router } from 'dom-wizard';
import routes from './routes/router';

const initialPage = {
  tagName: 'button',
  link: {
    name: 'navigation',
    to: 'home',
    host: '.sidebar',
  }, // look here
  options: {
    innerHTML: 'Click Me - About',
  },
};

domManager.create(initialPage);
router.register(routes);
```

Above, we create an initial page with nothing but a button that displays `Click Me - About`. If you click this button, you will be directed to the about page. The `route` in the options expects an ID of a specific route.

Let's delve into the functions that will make this magic happen:

- [x] **register**: This function will register all the routes as it did on the above example.
- [x] **configureLink**: This a helper function that **domManager** will invoke when it finds `route` in `options`.
- [x] **activate**: This is a private function that is supposed to add a className of `active` to the clicked element.
- [x] **deactivate**: A private function that removes the className of `active`.

To gain a better understand of the above functions click [here](https://github.com/lindelwa122/dom-wizard/issues).

### cssManager

Here's how you can use **cssManager** to style content of your page:

```javascript
import { cssManager } from 'dom-wizard';

cssManager.createCSSRule({
  body: {
    color: '#f8f8f8',
    backgroundColor: '#0fa',
  },

  '#main > .content': {
    overflow: 'hidden',
  },
});
```

- [x] **createCSSRule**: Takes in an object with selectors and declarations and styles the elements.
- [x] **addRule**: Adds a style to an element.

To gain a better understanding of how these functions should work click [here](https://github.com/lindelwa122/dom-wizard/issues).

### store

The store will hold variables that are intended to be accessible throughout the app. Users will be able to retrieve and modify these variables from anywhere within the app.

- [x] **createStore**: creates all the variables in their initial state.
- [x] **getState**: gets the state of a variable.
- [x] **updateState**: modifies state.

Read more about how store should work [here](https://github.com/lindelwa122/dom-wizard/issues).

**NOTE:** _An unchecked box indicates that the feature is not yet completed, while a checked box indicates its completion. You are welcome to work on and improve completed features. Additionally, feel free to propose new features via issues. For more details, please refer to our contributing rules [here](/CONTRIBUTING.md)._

## More ways to contribute

You can contribute not only by writing code but also by assisting us in enhancing this README, drafting documentation, creating tutorials, and more.

- [ ] Enhance this README.
- [x] Draft the documentation.
- [ ] Create a tutorial on our website.
- [ ] Produce video tutorials.
- [ ] Write tests.
- [x] Design a logo for us.
- [ ] Report bugs.
- [ ] Suggest any additional elements you believe should be included.

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

## Contact

Lindelwa - nqabenhlemlaba22@gmail.com

Instagram - [https://www.instagram.com/q.codes\_\_](https://www.instagram.com/q.codes__)

GitHub - https://github.com/lindelwa122
