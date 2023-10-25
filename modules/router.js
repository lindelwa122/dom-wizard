const router = () => {
  const _pages = [];

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

  return { register };
};

export default router();
