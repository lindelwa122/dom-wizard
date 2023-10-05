const domManager = () => {
  const _createDOMTree = () => {
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


  const create = (element, selector='#root') => {
    
  }
}