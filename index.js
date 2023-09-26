const generateContent = () => {
    const _createElement = (tagName, options = {}) => {
      const el = document.createElement(tagName);
  
      if (options.classList) {
        el.classList = options.classList.join(" ");
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
        tree.tagName === "img"
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
          Object.assign({}, tree.options.router, { element: el })
        );
      }
  
      tree.options && tree.options.pageId && router.pages.push(tree);
  
      return el;
    };
  
    const addTreeToTheDOM = (tree) => {
      const el = _createTreeNode(tree);
      // clear content
      document.querySelector("#content").innerHTML = "";
      document.querySelector("#content").appendChild(el);
      createStyleSheet.reRenderCSSRules();
    };
  
    return { addTreeToTheDOM };
  };
  
  export default generateContent().addTreeToTheDOM;
  
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
  
    const createCSSRule = (style, save=true) => {
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
  
      info.element.addEventListener("click", () => {
        _deactive(info.name);
        console.log({ ele: info.element })
        info.element.classList.add("active");
  
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
          router.element.classList.remove("active");
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