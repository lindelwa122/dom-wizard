/**
 * The store module provides a central storage mechanism for managing and sharing data across your application.
 * It allows you to create, retrieve, and update variables within a private store.
 */
const store = () => {
  const _store = {};

  /**
   * Creates the initial store by accepting an object with key-value pairs. This function throws an error
   * if invoked more than once.
   *
   * @param {Object} storeObject - An object containing properties and values to be stored in the store.
   *
   * @throws {Error} If storeObject is not an Object with key-value pairs.
   * @throws {Error} If createStore is invoked more than once.
   */
  const createStore = (storeObject) => {
    if (
      !(
        storeObject !== null &&
        typeof storeObject === 'object' &&
        !Array.isArray(storeObject)
      )
    ) {
      throw new Error(
        'createStore expects an Object with key-value pairs as its argument.',
      );
    }

    if (Object.keys(_store).length > 0) {
      throw new Error('You can only create store once.');
    }

    Object.assign(_store, storeObject);
  };

  /**
   * Retrieves the value associated with a specified key in the store.
   *
   * @param {string} key - The key of the variable stored in the private store.
   * @returns {*} The value of the specified key if found; otherwise, undefined.
   */
  const getState = (key) => _store[key];

  /**
   * Updates the value associated with a specified key in the store. If the key doesn't exist, an error is thrown.
   *
   * @param {string} key - The key of the state to be updated.
   * @param {*} newValue - The new value for the specified state.
   *
   * @throws {Error} If the key does not exist in the store.
   */
  const updateState = (key, newValue) => {
    if (!_store[key]) {
      throw new Error(`Key '${key}' doesn't exist in store`);
    }

    _store[key] = newValue;
  };

  return { createStore, getState, updateState };
};

export default store();
