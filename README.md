# DOM Manipulation Library

A JavaScript library that allows easy manipulation of the DOM. 

Click [here]() to read more about the features.

## Examples

Here's how you can create an element and append it to the DOM:

```javascript
import domManager from '@dom-manipulation-library/dml'

const sidebar = () => {
    const upper = {
        tagName: "div",
        options: {
            classList: ["upper", "nv-class"],
        },
    };

    const lower =  {
        tagName: "span",
        options: {
            className: "lower",
            style: { color: "#0f0" },
        },
    };

    return {
        tagName: "div",
        options: {
            id: "sidebar"
        },
        children: [upper, lower],
    };
}

domManager.create(sidebar());
```

This allows you to easily create elements and their children using simple objects. 

To read more about the features, jump to the [features section]().


## Getting Started

To make a contribution follow the steps below:

1. [Fork](https://github.com/lindelwa122/dom-manipulation-library/fork) this repository.

2. Clone the repository to your own machine by running one of the following commands:

    * HTTPS
    ```
    git clone https://github.com/<your-username>/dom-manipulation-library.git
    ```

    OR 

    * SSH
    ```
    git clone git@github.com:<your-username>/dom-manipulation-library.git
    ```

    OR

    * Github CLI:
    ```
    gh repo clone <your-username>/dom-manipulation-library
    ```

3. Create a new branch. The name of the branch must reflect the change you are about to make.

    ```
    git checkout -b <branch-name>
    ```

4. Make your changes or add your new feature. Remember to commit early and commit often. Read our commit rules [here](). 

    * Short commit messages:
        ```
        git add <changed-files>
        git commit -m "<commit-message>"
        ```
    * Long commit messages:
         ```
        git add <changed-files>
        git commit
        ```

5. Push your changes to Github by running this command:
    ```
    git push origin <branch-name>
    ```

6. Go over to GitHub and create a pull request. Ensure to add a comment explaining what you added. For more info read our contributing rules [here]().