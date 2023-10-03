## updateState Usage

To update the state of the store, use the `updateState()` function. For example, to update the title property of the store to 'My New Title', you would use the following code:

```javascript
updateState("title", "My New Title");
```

To retrieve a property from the store, simply access the property on the store object. For example, to retrieve the title property of the store, you would use the following code:

```javascript
const title = store.title;
```

## DOM-delete() feature usage

To delete the specific HTML element from the DOM, use the `deleteElement()` function. For example, to delete a HTML element with id as `heading` you would use the following code:

```javascript
import { deleteContent } from "./index.js";

const dom = deleteContent();

dom.deleteElement("#heading");
```

To delete all the elements matching the selector (here class `para`), pass the second parameter `all` as `true` (has default value false), use the following code:

```javascript
import { deleteContent } from "./index.js";

const dom = deleteContent();

dom.deleteElement(".para", true);
```

NOTE: Always valid selector must be passed.
