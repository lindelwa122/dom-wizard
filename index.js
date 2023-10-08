import domManager from './modules/domManager';

export { domManager };

const generateContent = () => {
  const _createElement = (tagName, options = {}) => {
    const el = document.createElement(tagName);

    if (options.classList) {
      el.classList = options.classList.join(' ');
    }

    if (options.innerHTML) {
      el.innerHTML = options.innerHTML;
    }

    if (options.style) {
      createStyleSheet.addStyle(el, options.style);
    }

    return el;
  };

  const _createImage = (options) => {
    const img = new Image();
    img.src = options.src;
    img.alt = options.alt;

    if (options.style) {
      createStyleSheet.addStyle(img, options.style);
    }

    return img;
  };

  const _createTreeNode = (tree) => {
    const el =
      tree.tagName === 'img'
        ? _createImage(tree.options)
        : _createElement(tree.tagName, tree.options);

    if (tree.children) {
      for (const child of tree.children) {
        const childEl = _createTreeNode(child);
        el.appendChild(childEl);
      }
    }

    if (tree.options && tree.options.router) {
      router.configRouter(
        Object.assign({}, tree.options.router, { element: el }),
      );
    }

    tree.options && tree.options.pageId && router.pages.push(tree);

    return el;
  };

  const addTreeToTheDOM = (tree) => {
    const el = _createTreeNode(tree);
    // clear content
    document.querySelector('#content').innerHTML = '';
    document.querySelector('#content').appendChild(el);
    createStyleSheet.reRenderCSSRules();
  };

  return { addTreeToTheDOM };
};

export default generateContent().addTreeToTheDOM;

const readContent = () => {
  const _error = () => {
    console.error(
      'Please check the attribute either you went wrong in the parameter or please add it in the specified HTML Element',
    );
    throw new Error('The attribute name mentioned is not qualified');
  };

  const read = (selector, attributeName = '', all = false) => {
    /* to make attribute parameter optional the user gives 
        either nothing (empty string) or bool if attribute name not specified*/

    if (typeof attributeName === 'boolean') {
      all = attributeName;
      attributeName = '';
    }

    // conditional selection
    const el = !all
      ? document.querySelector(selector)
      : document.querySelectorAll(selector);

    // invalid selector
    if (!el || el.length === 0) {
      console.error(
        'Retrieving of the element was not possible. Please check your selector.',
      );
      throw new Error('Element was not selected from the DOM');
    }

    // when all is false and attribute is valid
    if (!all && el[attributeName]) {
      return el[attributeName];
    }

    // when all is true and attributeName is specified
    if (all && attributeName !== '') {
      // check if property or attribute is valid for each element selected
      el.forEach((element) => {
        if (!element[attributeName]) {
          _error();
        }
      });

      const _attributes = [];

      el.forEach((element) => {
        _attributes.push(element[attributeName]);
      });

      return _attributes;
    }

    // undefined attributes or invalid property
    if (attributeName !== '' && !el[attributeName]) {
      _error();
    }

    /* returns the element(s) when attribute not specified */
    return el;
  };

  return { read };
};

export { readContent };

const deleteContent = () => {
  const deleteElement = (selector, all = false) => {
    const el = !all
      ? document.querySelector(selector)
      : document.querySelectorAll(selector);

    if (!el || el.length === 0) {
      console.error('invalid selector');
      throw new Error('invalid selector');
    }

    if (!all) {
      el.remove();
    }

    if (all) {
      el.forEach((e) => {
        e.remove();
      });
    }
  };

  return { deleteElement };
};

export { deleteContent };

const createStyleSheet = (() => {
  const addStyle = (el, declaration) => {
    for (const val of Object.entries(declaration)) {
      const property = val[0];
      const value = val[1];

      el.style[property] = value;
    }
  };

  const _CSSRules = [];
  const reRenderCSSRules = () => {
    for (const rule of _CSSRules) {
      createCSSRule(rule, false);
    }
  };

  const createCSSRule = (style, save = true) => {
    save && _CSSRules.push(style);

    for (const val of Object.entries(style)) {
      const selector = val[0];
      const declaration = val[1];

      const elements = document.querySelectorAll(selector);

      elements.length > 0 &&
        elements.forEach((el) => {
          addStyle(el, declaration);
        });
    }
  };

  return { addStyle, createCSSRule, reRenderCSSRules };
})();

export { createStyleSheet };

const router = (() => {
  const pages = [];
  const _routers = [];

  const configRouter = (info) => {
    _routers.push(info);

    info.element.addEventListener('click', () => {
      _deactive(info.name);
      console.log({ ele: info.element });
      info.element.classList.add('active');

      let to;
      for (const page of pages) {
        if (page.id === info.to) {
          to = page.route;
        }
      }

      generateContent().addTreeToTheDOM(to);
    });
  };

  const _deactive = (name) => {
    for (const router of _routers) {
      if (router.name === name) {
        router.element.classList.remove('active');
      }
    }
  };

  const register = (routes) => {
    for (const route of routes) {
      pages.push(route);
    }
  };

  return { configRouter, register, pages };
})();

export { router };
