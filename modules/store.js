/**
 * The store module provides a central storage mechanism for managing and sharing data across your application.
 * It allows you to create, retrieve, and update variables within a private store.
 *
 * NEW: Added Redux-style support with reducers, dispatch, and state.
 */

const store = () => {
  // ------------------ Private store for backward-compatible API ------------------
  const _store = {};

  /**
   * Creates the initial store by accepting an object with key-value pairs.
   * Throws an error if invoked more than once.
   *
   * @param {Object} storeObject - An object containing properties and values to be stored in the store.
   *
   * @throws {Error} If storeObject is not an Object with key-value pairs.
   * @throws {Error} If createStore is invoked more than once.
   */
  const createStore = (storeObject) => {
    if (
      !(
        storeObject &&
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
    if (!_store.hasOwnProperty(key)) {
      throw new Error(`Key '${key}' doesn't exist in store`);
    }

    _store[key] = newValue;
  };

  // ------------------ Redux-style additions ------------------
  const state = {}; // new Redux-style state container
  const reducers = {}; // object to hold registered reducers

  /**
   * Registers reducers for the Redux-style store.
   * Each reducer must be a function and will be invoked to initialize its slice of state.
   *
   * @param {Object} reducersObj - Object of reducers in the format { key: reducerFunction }
   *
   * @throws {Error} If any reducer is not a function.
   */
  const registerReducers = (reducersObj) => {
    for (const key in reducersObj) {
      if (typeof reducersObj[key] !== 'function') {
        throw new Error(`Reducer for key '${key}' must be a function`);
      }
      reducers[key] = reducersObj[key];
      state[key] = reducers[key](undefined, {}); // initialize state for each reducer
    }
  };

  /**
   * Dispatches an action to all registered reducers.
   * Updates the Redux-style state for each reducer based on the action.
   *
   * @param {Object} action - Action object in the format { type, payload }
   */
  const dispatch = (action) => {
    for (const key in reducers) {
      state[key] = reducers[key](state[key], action);
    }
  };

  // ------------------ Return all functions ------------------
  return {
    createStore, // legacy store creation
    getState, // legacy get value
    updateState, // legacy update value
    registerReducers, // new Redux-style reducer registration
    dispatch, // new Redux-style dispatch
    state, // Redux-style state container
  };
};

export default store();
