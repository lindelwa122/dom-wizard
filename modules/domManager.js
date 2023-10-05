import router from './router';

const domManager = () => {
  const _createElement = (element) => {
    if (!element.tagName) {
      throw new Error('tagName is undefined. An element cannot be created without a tagName.');
    }

    const el = document.createElement(element.tagName);

    if (!el) {
      throw new Error(`The specified tagName (${element.tagName}) is not recognised. Ensure this value is valid for your elements to be created correctly.`);
    }

    if (!element.options) return el;

    if (element.options.className) el.className = className;

    if (element.options.classList) {
      el.classList = options.classList.join(" ");
    }

    if (element.id) {
      el.id = id;
    }

    if (element.link) {
      router.configureLink(element.link);
    }

    if (element.attributes) {
      for (const [prop, value] of Object.entries(element.attributes)) {
        el[prop] = value;
      }
    }

    return el;
  }

  const _createDOMTree = (element) => {
    if (!element) {
      throw new Error('element is undefined.');
    }

    const el = _createElement(element);

    if (element.children) {
      element.forEach(child => {
        const childEl = _createDOMTree(child);
        el.appendChild(childEl);
      })
    }

    return el;
  }


  const create = (element, selector='#root', append=false) => {
    const el = _createDOMTree(element);
    const parent = document.querySelector(selector);
    if (!parent) {
      throw Error(`Element ${selector} is not found. Please ensure ${selector} exists in your HTML.`);
    }
    
    if (!append) {
      parent.innerHTML = '';
    }

    parent.appendChild(el);
    return parent;
  }

  return { create };
}

export default domManager();