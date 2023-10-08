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
