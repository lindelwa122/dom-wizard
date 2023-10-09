## createStore Usage

To create the store, use the `createStore()` function. For example, to create a store and add all the variables which you want to access anywhere from the application, you would use the following code:

```javascript
const storeObject = {
  name: 'John Doe',
  age: 35,
  univerity: 'Stanford',
  isGraduated: false,
};

// creates a "store" and stores the object
createStore(storeObject);

// to retrieve the "store object" use getStore()
```

Note: `createStore()` cannot be invoked or called more than once even in different script files of the same application.

## getStore Usage

To retrieve the store, use the `getStore()` function with no parameters needed. For example, to retrieve a store and access functionalities like `updateState()` and `getState()` anywhere from the application, you would use the following code:

```javascript
const store = getStore(); // retrieve store

const title = store.getState('title'); // get the state of store

console.log(title); // prints the title

// updates the state of the store
const newStore = store.updateState('title', 'javascript');

console.log(newStore); // prints the object returned by updateState

console.log(store); // store is updated with new title
```

Note: `getStore()` retrieves the store and functionalities like `updateState()` and `getState()` can be used on the store object.

Warning: `getStore()` is the only way to access the store.

## getState Usage

To get the state of the store, use the `getState()` function. For example, to get the state of the `key`, you would use the following code:

```javascript
const value = store.getState(key);

// prints value of the key
console.log(value);
```

Note: the function throws an error if the value doesn't exist.

## updateState Usage

To update the state of the store, use the `updateState()` function. For example, to update the title property of the store to 'My New Title', you would use the following code:

```javascript
updateState('title', 'My New Title');
```

To retrieve a property from the store, simply access the property on the store object. For example, to retrieve the title property of the store, you would use the following code:

```javascript
const title = store.title;
```



## AddStyle function Usage

The `addStyle` function can be used to add CSS styles to elements on a web page.

The `addStyle` function takes two parameters:

* `element`: The element to add the CSS styles to.
* `declaration`: An object of CSS properties and values.

The `declaration` object can contain any valid CSS properties. For example, to add the `background-color: red` style to the `<body>` element, you would use the following code:

```javascript
addStyle(document.body, { backgroundColor: 'red' });
```

To add the `font-size: 16px` style to all of the `.my-elements` elements, you would use the following code:

```javascript
addStyle(document.querySelectorAll('.my-elements'), { fontSize: '16px' });
```


## DOM-delete() feature usage

To delete the specific HTML element from the DOM, use the `deleteElement()` function. For example, to delete a HTML element with id as `heading` you would use the following code:

```javascript
import { deleteContent } from './index.js';

const dom = deleteContent();

dom.deleteElement('#heading');
```

To delete all the elements matching the selector (here class `para`), pass the second parameter `all` as `true` (has default value false), use the following code:

```javascript
import { deleteContent } from './index.js';

const dom = deleteContent();

dom.deleteElement('.para', true);
```

NOTE: Always valid selector must be passed.

## read() Usage

To read the property of the HTML DOM Element, use the `read()` function. For example, to read the innerHTML of the element with a class selector ".para", ( selector parameter is the must and the other two are optional ) you may use the following code:

```javascript
import { readContent } from './index.js';

const domManager = readContent();

// single element property value (innerHTML) returned
const data = domManager.read('.para', 'innerHTML');

console.log(data);
```

To read the property of the multiple HTML DOM Elements, use the `read()` function along with a third parameter `all` set to true default being false. `all` takes a boolean value `true` or `false` where true indicates selection of `all` the elements matching the selector else the first element with the selector is retrieved. For example, to read the innerHTML of the multiple elements with the same class selector ".para", you may use the following code:

```javascript
import { readContent } from './index.js';

const domManager = readContent();

// multiple elements property values (innerHTML) returned in an array
const data = domManager.read('.para', 'innerHTML', true);

console.log(data);
```

The second parameter is optional, if not specified then based the value of `all` given, the elements are retrieved and returned instead of the property values:

```javascript
import { readContent } from './index.js';

const domManager = readContent();

// the html DOM element itself is returned
const data = domManager.read('.para', false);

console.log(data);
```

```javascript
import { readContent } from './index.js';

const domManager = readContent();

// the html DOM elements itself is returned in an array
const data = domManager.read('.para', true);

console.log(data);
```

# domManager Module

The `domManager` module offers functionalities for creating, updating, reading, and deleting DOM elements. Central to this module is the `create` function, designed to streamline the creation and manipulation of HTML elements within the DOM.

## `create(element, selector, append)`

The `create` function generates an HTML element based on the provided `element` object and appends it to a specified parent element or replaces existing content in the parent.

### Parameters

1. `element` (`Object`): An object providing information about the element to be created. It should have the following properties:

   - `tagName` (`string`, required): Specifies the type of HTML element to create.
   - `children` (`Array`): An array of child elements to be appended to the created element.
   - `options` (`Object`): Additional options for configuring the element (e.g., `classList`, `id`, `link`, `onclick`).

2. `selector` (`string`, optional): Selector of the parent to append the newly created element into. If not provided, it defaults to `'#root'`.

3. `append` (`boolean`, optional): Indicates whether to append the new element as a child or replace existing content in the parent. Default is `false`.

### Under the Hood: How it Works

1. **Element Creation (`_createElement`)**: This helper function creates an HTML element based on the `element` object provided. It first checks if the `tagName` is provided, throwing an error if not. It then uses `document.createElement` to create the element and sets any additional properties specified in the `options` object, such as `classList` or `id`.

2. **DOM Tree Construction (`_createDOMTree`)**: This helper function recursively constructs a DOM tree by iterating through the provided `element` and its children. It uses `_createElement` to create the HTML elements and build the tree structure.

3. **Appending the Element (`create`)**: The `create` function utilizes `_createDOMTree` to create the HTML element. It then selects the parent element using the provided `selector` or the default `#root`. Depending on the `append` parameter, it appends the element as a child or replaces the parent's content.

### Usage Examples

#### Example 1: Creating a Simple Element

```javascript
import domManager from '@dom-manipulation-library/dml';

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

#### Example 2: Appending to a Specific Parent

```javascript
import domManager from '@dom-manipulation-library/dml';

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

### Usefulness

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
