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
