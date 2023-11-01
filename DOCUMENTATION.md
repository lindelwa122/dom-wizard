# DOM Wizard

DomWizard is a library designed to simplify the manipulation of DOM elements, offering features for creating, updating, reading, and deleting elements in an accessible and engaging manner. It also facilitates CSS styling and style manipulation, making it a user-friendly tool for web developers.

### Key Features

- **Effortless DOM Manipulation:** DomWizard empowers developers with the ability to effortlessly create, modify, read, and remove DOM elements. Its intuitive functions make working with the DOM a breeze.

- **Seamless CSS Styling:** DomWizard provides a straightforward approach to adding and manipulating CSS styles in JavaScript.

- **Lightweight Routing:** Ideal for small applications, DomWizard offers a simple routing solution. It enables users to switch between multiple pages without the need for page reloading or managing multiple HTML files.

- **Global Variable Store (Experimental):** While still in the experimental phase, DomWizard introduces a global store. This feature allows for the storage and accessibility of global variables throughout your application, enhancing data management.

- **Quick App Setup:** DomWizard's 'create-app' tool simplifies the application setup process by leveraging Webpack. Say goodbye to complex configurations and dive straight into development.

### Who Should Use DomWizard?

DomWizard caters to small JavaScript projects seeking an efficient and straightforward way to handle CSS and DOM elements. It's the perfect choice for developers looking to enhance their productivity without the overhead of a complex framework.

## domManager Module

The `domManager` module offers functionalities for creating, updating, reading, and deleting DOM elements. Central to this module is the `create` function, designed to streamline the creation and manipulation of HTML elements within the DOM.

### `create(element, selector, append)`

The `create` function generates an HTML element based on the provided `element` object and appends it to a specified parent element or replaces existing content in the parent.

#### Parameters

1. `element` (`Object`): An object providing information about the element to be created. It should have the following properties:

   - `tagName` (`string`, required): Specifies the type of HTML element to create.
   - `children` (`Array`): An array of child elements to be appended to the created element.
   - `options` (`Object`): Additional options for configuring the element (e.g., `classList`, `id`, `link`, `onclick`).
   - `before` (`function`): Function to be invoked before the element is appended to the page.
   - `after` (`function`): Function to be invoked after the element is appended to the page.

2. `selector` (`string`, optional): Selector of the parent to append the newly created element into. If not provided, it defaults to `'#root'`.

3. `append` (`boolean`, optional): Indicates whether to append the new element as a child or replace existing content in the parent. Default is `false`.

#### Under the Hood: How it Works

1. **Element Creation (`_createElement`)**: This helper function creates an HTML element based on the `element` object provided. It first checks if the `tagName` is provided, throwing an error if not. It then uses `document.createElement` to create the element and sets any additional properties specified in the `options` object, such as `classList` or `id`.

2. **DOM Tree Construction (`_createDOMTree`)**: This helper function recursively constructs a DOM tree by iterating through the provided `element` and its children. It uses `_createElement` to create the HTML elements and build the tree structure.

3. **Appending the Element (`create`)**: The `create` function utilizes `_createDOMTree` to create the HTML element. It then selects the parent element using the provided `selector` or the default `#root`. Depending on the `append` parameter, it appends the element as a child or replaces the parent's content.

#### Usage Examples

##### Example 1: Creating a Simple Element

```javascript
import { domManager } from 'dom-wizard';

const simpleElement = {
  tagName: 'div',
  options: {
    id: 'myDiv',
    classList: ['box'],
  },
};

domManager.create(simpleElement);
```

In this example, a `div` element with the specified `id` and `classList` is created and appended to the default parent, `#root`.

##### Example 2: Appending to a Specific Parent

```javascript
import { domManager } from 'dom-wizard';

const childElement = {
  tagName: 'span',
  children: [
    {
      tagName: 'p',
      option: {
        innerHTML: 'This is a child element.',
      },
    },
  ],
};

domManager.create(childElement, '#parentDiv');
```

Here, a `span` element is appended to a specific parent with the selector `#parentDiv`.

#### Usefulness

The `create` function significantly simplifies DOM manipulation. By encapsulating the creation and appending of elements, it promotes code reusability and allows for dynamic content generation within web applications. This enhances development efficiency, making it a valuable tool for front-end developers.

Certainly! Let's create detailed documentation for the `read` function within the `domManager` module.

### `read()`

The `read` function retrieves information from the DOM based on the provided selector and property name.

#### Parameters:

- **selector** (`string`): The CSS selector to query the DOM and identify the element(s).

- **propertyName** (`string`) [Optional]: The property name to retrieve from the selected element(s). Defaults to `undefined`.

- **all** (`boolean`) [Optional]: If `true`, retrieves the property from all matching elements; otherwise, retrieves from the first matching element. Defaults to `false`.

#### Throws:

- Throws an error if retrieving the element was not possible or if the selector didn't match any elements.

#### Returns:

- If `all` is `true` and `propertyName` is provided, an array of property values from all matching elements.

- If `propertyName` is provided, the property value from the first matching element.

- If `propertyName` is not specified, and `all` is set to `true`, a NodeList or an array containing all elements with the specified selector.

#### Usage and Examples:

1. **Retrieve a Property from a Single Element:**

   ```javascript
   const result = domManager.read('.example-element', 'innerText');
   // Retrieves the 'innerText' property of the first element matching the selector '.example-element'
   ```

2. **Retrieve All Elements Matching the Selector:**

   ```javascript
   const elements = domManager.read('.example-elements', undefined, true);
   // Retrieves all elements matching the selector '.example-elements'
   ```

3. **Retrieve an Attribute from All Elements Matching the Selector:**

   ```javascript
   const attributeValues = domManager.read(
     '.example-elements',
     'data-custom',
     true,
   );
   // Retrieves an array of 'data-custom' attribute values from all elements matching the selector '.example-elements'
   ```

4. **Retrieve an Array of All Elements Matching the Selector:**

   ```javascript
   const allElements = domManager.read('.example-elements', undefined, true);
   // Retrieves a NodeList or array of all elements matching the selector '.example-elements'
   ```

#### Use Cases:

- Retrieving text content from multiple elements sharing the same class.

- Fetching attributes (e.g., `data-*`) from a group of elements for further processing.

- Collecting values from a group of form elements (e.g., all input fields within a specific container).

The `read` function provides flexibility in querying the DOM and fetching relevant information based on specified criteria, making it a powerful tool for data extraction in various scenarios.

### `remove()`

The `remove` function removes elements from the DOM based on the provided selector.

#### Parameters:

- **selector** (`string`): The CSS selector to target elements for removal.

- **all** (`boolean`) [Optional]: If `true`, removes all matching elements; otherwise, removes the first matching element. Defaults to `false`.

#### Throws:

- Throws an error if the selector doesn't match any elements or if removal fails.

#### Returns:

- If `all` is `true`, an array of removed elements; otherwise, the removed element.

#### How it Works:

The `remove` function uses the provided selector to query the DOM for elements. If `all` is `true`, it uses `querySelectorAll` to retrieve all matching elements; otherwise, it uses `querySelector` to retrieve the first matching element. It then removes the selected element(s) from the DOM.

#### Use Cases:

- Removing specific UI components based on their identifiers or classes.

- Clearing out temporary or dynamically created elements.

- Implementing a feature to remove multiple items at once (e.g., in a list).

#### Usage and Examples:

1. **Remove a Single Element:**

   ```javascript
   domManager.remove('.example-element');
   // Removes the first element matching the selector '.example-element'
   ```

2. **Remove All Elements Matching the Selector:**

   ```javascript
   domManager.remove('.example-elements', true);
   // Removes all elements matching the selector '.example-elements'
   ```

#### Why is it Useful?

The `remove` function provides a straightforward way to remove elements from the DOM based on specified criteria. This is essential for keeping the DOM updated and tidy, especially in complex web applications where elements might need to be dynamically added or removed based on user interactions or other events. The ability to remove specific elements or a group of elements enhances the flexibility and user experience of web applications, making the `remove` function a valuable utility for managing the DOM effectively.

### `update(instr)`

The `update()` function is a versatile tool for modifying information and attributes of elements within the DOM. It supports actions such as toggling class names, adding classes to the classList, updating IDs, and modifying specific attributes.

#### Parameters

- `instr` (Object) - Instructions for updating elements, including what to update and how. The `instr` object should always contain `selector` and `action` as required properties. Here's an example of an `instr` object:

  ```javascript
  {
    selector: ".content > div",
    action: "update",
    innerHTML: "<p>New Text</p>"
  }
  ```

- Supported actions are: `toggle`, `replace`, `replaceAll`, `update`, `add`, `remove`, and `style`. Each action has its own required properties.

#### Error Handling

- Throws an error when `selector` and/or `action` are missing.
- Throws an error when the specified element is not found in the DOM.

#### `toggle` Action

The `toggle` action toggles a class in the `classList` of the provided element. It exclusively works with the `class` attribute and requires the `className` property.

##### Usage Example:

```javascript
domManager.update({
  selector: '.content > div',
  action: 'toggle',
  className: 'active',
});
```

#### `replace` Action

The `replace` action replaces a specific attribute in the provided element. It requires the properties `attribute`, `new`, and `old`. If the specified attribute doesn't support `replace`, an error is raised.

##### Usage Example:

```javascript
domManager.update({
  selector: '.content > div',
  action: 'replace',
  attribute: 'classList',
  old: 'start',
  new: 'stop',
});
```

#### `replaceAll` Action

The `replaceAll` action is similar to `replace`, but it replaces all occurrences of a specific value within the provided element.

##### Usage Example:

```javascript
domManager.update({
  selector: '.content > div',
  action: 'replaceAll',
  attribute: 'textContent',
  old: 'e',
  new: '#',
});
```

#### `update` Action

The `update` action allows you to modify the element's properties and attributes. It can also update the children of the specified element.

##### Usage Example:

```javascript
domManager.update({
  selector: '.content > div',
  action: 'update',
  id: 'new-id',
  textContent: 'New Text',
});
```

#### `add` and `remove` Actions

The `add` and `remove` actions add and remove data, respectively, from the specified element. Both require the `attribute` and `value` properties. An error is thrown if the specified `attribute` doesn't support `add` or `remove`.

#### `style` Action

The `style` action is used to update styles of the specified element.

##### Usage Example:

```javascript
domManager.update({
  selector: '.content > div',
  action: 'style',
  backgroundColor: 'red',
  padding: '20px',
});
```

#### Usefulness

The `update` function simplifies DOM element updates, streamlining the implementation and error handling process. It saves time and reduces the need for repetitive code, as it eliminates the hassle of manually fetching elements and performing updates.

## cssManager Module

The cssManager module facilitates the creation and application of CSS styles to elements. It's important to note that this module isn't intended to replace traditional CSS, but rather to provide an API for efficiently adding CSS rules to elements using JavaScript when it's the most suitable approach.

### addRule(rule)

The `addRule` function adds a CSS rule to the stylesheet.

**Parameter**

- `rule` (Object): An object representing the CSS rule to be added. It consists of a selector as the key and a declaration as the value. The declaration can include complex CSS properties, states, and media queries. Here are some examples:

1. Simple selector:

   ```javascript
   {
     'body': 'background-color: yellow'
   }
   ```

2. Selector with a state:

   ```javascript
   {
     'button:hover': 'background-color: #0f0'
   }
   ```

3. Multiple declarations in the value:

   ```javascript
   {
     'button': `
       border-radius: 20px;
       background: yellowgreen;
       padding: 10px 20px;
     `
   }
   ```

4. Using media queries:
   ```javascript
   {
     '@media screen and (min-width: 480px)': `
       button {
         background-color: blue;
       }
     `
   }
   ```

The `addRule` function utilizes the `CSSStyleSheet` web API to add and manage CSS rules.

### createCSSRules(rules)

The `createCSSRules` function adds an array of styles to the page by using the `addRule` function.

**Parameter**

- `rules` (Array): An array of objects, where each object represents a CSS rule to be added. The format of these objects is explained in the [`addRule` documentation](#addrulerule).

**Usage**

You can use the `createCSSRules` function as follows:

```javascript
cssManager.createCSSRules([
  {
    '@media screen and (min-width: 480px)': `
      body {
        background-color: blue;
      }
    `,
  },
  {
    body: `
      min-height: 100vh;
      background-color: red;
    `,
  },
]);
```

### removeRule(index)

The `removeRule` function removes a CSS rule by its index. This function ensures that the index is a number before attempting removal.

#### Parameters

- `index` (Number): The index of the CSS rule to be removed. This should be a number. If `index` is not a number, an error will be thrown to prevent incorrect removal. You can obtain the index from the return value of `addRule` or by keeping track of the indexes when using `createCSSRules`.

#### Example

Here's an example of how to use the `removeRule` function to remove a CSS rule by its index:

```javascript
const ruleIndex = cssManager.addRule({ body: 'background-color: red' });
// Use the index to remove the rule:
cssManager.removeRule(ruleIndex);
```

**Note**: Every time a style is added using `addRule` or `createCSSRules`, it is added as the last index of `cssRules`. The index is equivalent to `stylesheet.cssRules.length`.

## Router Module

The `router` module handles route registration and link configuration, allowing for navigation within a web application.

### `register(routes)`

Register routes for navigation within the application.

#### Parameters

- `routes` (Array): An array containing route information objects. Each route object must have the following properties:
  - `id` (String): A unique identifier for the route.
  - `route` (Object): An object to be used by `domManager.create()` to construct the DOM of the new route/page.

**Example:**

```javascript
[
  { id: 'home', route: home },
  { id: 'about', route: about },
  { id: 'contact', route: contact },
];
```

After validation, the function adds each route to the internal `_pages` array.

#### Error Handling

The `register` function performs the following error checks:

- It can only be invoked once throughout the application.
- The `routes` parameter must be an array.
- Each item in the `routes` array must be an object with key-value pairs.
- Each item in the `routes` array must have the required 'id' and 'route' keys.
- No two routes are allowed to share the same 'id'.

### `configureLink(linkInfo)`

Configure an HTML element to act as a link for navigation.

### Parameters

- `linkInfo` (Object): An object containing specific information about the link element. It should have the following properties:
  - `name` (String): The name of the link.
  - `to` (String): The ID of the page to which the link will navigate.
  - `element` (HTMLElement): The HTML element to attach a click event listener to.
  - `host` (String, optional): A selector specifying where the content should be rendered. If not provided, it defaults to `#root`.

The `to` property must correspond to a valid route ID within the `_pages` array. If the constraints are not met, the function throws an error.

The `configureLink` function adds an event listener to the specified element. When triggered, the linked content will be displayed in the page at the specified container using `domManager`.

The function is useful in conjunction with `domManager` and allows developers to manually configure links within the app. It also adds the 'active' class to the clicked element, making it easier to style active links.

## store (Experimental)

The `store` module serves as a central storage mechanism for variables accessible throughout the app. Users can retrieve and modify these variables from anywhere within the application. It's important to note that the `store` is not designed for server-side purposes; its primary function is to facilitate the use of shared variables across different app files. However, please be aware that all data stored in the `store` is temporary and gets reset when the app stops running.

### `createStore(storeObject)`

The `createStore` function initializes the store by accepting an object with key-value pairs. It can be invoked only once to maintain organization within the store and enable users to easily manage all variables stored within it.

#### Usage Example

```javascript
store.createStore({
  userID: 'fd4rew34_dfr4',
  username: 'therealjohndoe',
  profileUpdated: false,
  profileImg: undefined,
});
```

### `getState(key)`

The `getState` function retrieves the value associated with a specified key in the store.

#### Usage Example

```javascript
const username = store.getState('username');
```

### `updateState(key, newValue)`

The `updateState` function allows you to modify the value associated with a specific key in the store. If the key doesn't exist, an error is thrown.

#### Usage Example

```javascript
store.updateStore('username', 'justJohn');
```
