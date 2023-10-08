import router from './router';

const domManager = () => {
  const _createElement = (element) => {
    if (!element.tagName) {
      throw new Error('tagName is undefined. An element cannot be created without a tagName.');
    }

    const el = document.createElement(element.tagName);

    if (!element.options) return el;

    if (element.link) {
      router.configureLink(element.link);
    }

    if (element.options) {
      for (const [prop, value] of Object.entries(element.options)) {
        el[prop] = prop === 'classList' ? value.join(' ') : value;
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