import domManager from './domManager';

/**
 * The router module is responsible for registering routes, linking pages, and configuring URLs.
 */
const router = () => {
  const _pages = [];
  const _routes = [];

  /**
   * Registers the provided routes, allowing them to be used later for navigation.
   *
   * @param {Array<Object>} routes - An array containing information about the routes to be registered.
   * Each route object should have the following structure:
   * - `id` (string): A unique identifier for the route.
   * - `route` (Object): An object containing a component to ebe rendered by domManager.
   *
   * @throws {Error} If the `register` function is invoked more than once in the application.
   * @throws {Error} If the `routes` parameter is not an array.
   * @throws {Error} If any item in the `routes` array is not an object with key-value pairs.
   * @throws {Error} If any item in the `routes` array does not have the required 'id' and 'route' keys.
   * @throws {Error} If any routes share the same 'id'.
   */
  const register = (routes) => {
    if (_pages.length !== 0) {
      throw new Error(
        'register should only be used (invoked) once throughout the app',
      );
    }

    if (!Array.isArray(routes)) {
      throw new Error('register expects routes to be an array.');
    }

    for (const route of routes) {
      if (
        !(route !== null && typeof route === 'object' && !Array.isArray(route))
      ) {
        throw new Error(
          'Each item (route) inside routes is expected to be an object with key and value pairs.',
        );
      }

      if (!(route.id && route.route)) {
        throw new Error(
          'Each item (route) inside routes is expected to have id and route as its keys.',
        );
      }
    }

    routes.forEach((route, index) => {
      for (let i = index + 1; i < routes.length; i++) {
        if (routes[i].id === route.id) {
          throw new Error(
            `All routes should have unique IDs. Route at index ${i} and ${index} share the ID ${route.id}`,
          );
        }
      }
    });

    for (const route of routes) {
      _pages.push(route);
    }
  };

  const _deactivate = (name) => {
    for (const route of _routes) {
      if (route.name === name) {
        route.element.classList.remove('active');
      }
    }
  };

  /**
   * Configures a link with the provided link information.
   *
   * @param {Object} linkInfo - The link information object.
   * @param {string} linkInfo.name - The name of the link.
   * @param {string} linkInfo.to - The ID of the page to link to.
   * @param {string} [linkInfo.host] - The selector of the element to host the page.
   * @param {HTMLElement} linkInfo.element - The HTML element to attach the click event listener to.
   * @param {boolean} [linkInfo.animate] - A smooth transition is added when pages are changing if animate is true
   *
   * @throws {Error} If the linkInfo object is missing 'name,' 'to,' or 'element' properties.
   * @throws {Error} If the specified page ID ('to') does not match any registered pages.
   */
  const configureLink = (linkInfo) => {
    if (!linkInfo.name || !linkInfo.to || !linkInfo.element) {
      throw new Error(
        'linkInfo should contain name, to, and element as its properties.',
      );
    }

    const page = _pages.find((page) => page.id === linkInfo.to);
    if (!page) {
      throw new Error(
        `There are no registered page with the id of ${linkInfo.to}`,
      );
    }

    // Add the linkInfo object to the routes array
    _routes.push(linkInfo);

    linkInfo.element.addEventListener('click', () => {
      // Deactivate all links
      _deactivate(linkInfo.name);

      if (linkInfo.animate) {
        document.body.style.opacity = 0;
      }

      // Create the element for the page
      const selector = linkInfo.host ? linkInfo.host : '#root';
      domManager.create(page.route, selector);

      if (linkInfo.animate) {
        document.body.style.opacity = 1;
      }

      // Activate the link
      linkInfo.element.classList.add('active');
    });
  };

  return { configureLink, register };
};

export default router();
