/**
 * widget.Label.js
 * * Implements the DomWizard Label widget.
 * This file includes a mock DomWizard environment for runnable demonstration.
 */

// Ensure the widget namespace exists
var widget = widget || {};

/**
 * Creates a pre-styled DomWizard Label element.
 * * @param {object} options - The configuration for the label.
 * @param {string} options.text - The text content displayed within the label.
 * @param {string} [options.for] - The id of the form element this label is associated with.
 * @param {object} [options.styles] - Allows overriding the default label styles.
 * @param {string} [options.className] - (Optional) Additional CSS class(es) to apply.
 * @param {function} [options.onClick] - Triggered when the label is clicked.
 * @param {string} [options.title] - Tooltip text shown on hover.
 * @param {boolean} [options.hidden] - Visually hides the label while keeping it accessible.
 * @returns {object} A "DomWizard element" (in this demo, a DOM node).
 */
widget.Label = function(options) {
    const {
        text,
        'for': forId, // Destructure 'for' to 'forId' to avoid reserved word issues
        styles = {},
        className = '', // Added optional input as per user allowance
        onClick,
        title,
        hidden = false
    } = options;

    // 1. Define Default Styles
    const defaultLabelStyles = {
        display: 'inline-block',
        marginBottom: '0.5rem',
        fontSize: '1rem',
        fontFamily: 'sans-serif',
        fontWeight: '600',
        color: '#2d3748', // A clean, dark gray
        cursor: 'pointer',
        transition: 'color 0.2s ease-in-out',
    };

    // 2. Define Accessibility Styles (for hidden=true)
    // These styles hide the element visually but keep it for screen readers.
    const accessibleHiddenStyles = {
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: '0',
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: '0',
    };

    // 3. Combine Styles
    // User-provided 'styles' override 'defaultLabelStyles'.
    // If 'hidden' is true, 'accessibleHiddenStyles' override everything.
    let finalStyles = {
        ...defaultLabelStyles,
        ...styles,
    };

    if (hidden) {
        finalStyles = {
            ...finalStyles,
            ...accessibleHiddenStyles,
        };
    }

    // 4. Build the props object for DomWizard
    const props = {
        style: finalStyles,
    };

    // Add optional attributes ONLY if they are provided (not undefined or null)
    if (forId) {
        props.for = forId;
    }
    if (title) {
        props.title = title;
    }
    if (onClick && typeof onClick === 'function') {
        props.onClick = onClick;
    }
    if (className) {
        props.className = className;
    }

    // 5. Create and return the DomWizard element
    // We pass the 'text' as a child of the 'label' element.
    // We assume DomWizard.createElement(tagName, props, ...children)
    return DomWizard.createElement('label', props, text);
};


// -------------------------------------------------------------------
// --- MOCK DomWizard & EXAMPLE USAGE ---
// This part is for demonstration only, so the code is runnable.
// In a real project, the DomWizard library would provide this.
// -------------------------------------------------------------------

/**
 * Mock DomWizard Environment
 * A simple implementation of `DomWizard.createElement` that creates
 * and returns real DOM nodes for this demo.
 */
const DomWizard = {
    createElement: (tagName, props, ...children) => {
        const el = document.createElement(tagName);

        // Apply props (attributes, styles, event listeners)
        if (props) {
            for (const [key, value] of Object.entries(props)) {
                if (key === 'style' && typeof value === 'object') {
                    // Apply inline styles
                    Object.assign(el.style, value);
                } else if (key.startsWith('on') && typeof value === 'function') {
                    // Add event listener (e.g., onClick -> 'click')
                    el.addEventListener(key.substring(2).toLowerCase(), value);
                } else if (key === 'className') {
                    el.className = value;
                } else {
                    // Set other attributes like 'for', 'title'
                    el.setAttribute(key, value);
                }
            }
        }

        // Append children (in this case, just the text)
        for (const child of children) {
            if (typeof child === 'string') {
                el.appendChild(document.createTextNode(child));
            } else if (child instanceof Node) {
                el.appendChild(child); // In case a "DomWizard element" is a Node
            }
        }
        return el; // Return the "DomWizard element"
    }
};

/**
 * Example Usage (IIFE to run on script load)
 * This creates a few label examples and adds them to the document body.
 */
(function() {
    // Wait for the DOM to be ready
    document.addEventListener('DOMContentLoaded', () => {
        const container = document.createElement('div');
        container.style.padding = '20px';
        container.style.fontFamily = 'sans-serif';

        const h = (tag, text) => {
            const el = document.createElement(tag);
            el.textContent = text;
            el.style.marginTop = '15px';
            el.style.borderBottom = '1px solid #eee';
            el.style.paddingBottom = '5px';
            return el;
        }

        // --- Example 1: Basic Label ---
        container.appendChild(h('h3', '1. Basic Label'));
        const basicLabel = widget.Label({
            text: 'Your Name'
        });
        container.appendChild(basicLabel);
        container.appendChild(document.createElement('br'));
        container.appendChild(document.createElement('input', { id: 'name-input' }));


        // --- Example 2: Label with 'for', 'title', and 'onClick' ---
        container.appendChild(h('h3', "2. Label with 'for', 'title', and 'onClick'"));
        const functionalLabel = widget.Label({
            text: 'Your Email (Click Me)',
            for: 'email-input',
            title: 'Click to focus the email field',
            onClick: () => console.log('Label clicked!')
        });
        container.appendChild(functionalLabel);
        container.appendChild(document.createElement('br'));
        const emailInput = document.createElement('input');
        emailInput.id = 'email-input';
        container.appendChild(emailInput);


        // --- Example 3: Label with Style Overrides ---
        container.appendChild(h('h3', '3. Label with Style Overrides'));
        const styledLabel = widget.Label({
            text: 'Password (Big & Blue)',
            styles: {
                color: 'blue',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                textTransform: 'uppercase'
            }
        });
        container.appendChild(styledLabel);


        // --- Example 4: Visually Hidden Label (for Accessibility) ---
        container.appendChild(h('h3', '4. Visually Hidden Label'));
        const hiddenLabel = widget.Label({
            text: 'Search',
            for: 'search-input',
            hidden: true
        });
        // You won't see this label, but it's in the DOM for screen readers.
        container.appendChild(hiddenLabel); 
        const searchInput = document.createElement('input');
        searchInput.id = 'search-input';
        searchInput.setAttribute('placeholder', 'Search...');
        container.appendChild(searchInput);
        
        container.appendChild(document.createComment('Inspect the DOM to see the hidden label!'));

        // Add the container to the page
        document.body.appendChild(container);
    });
})();