/**
 * The store module provides a central storage mechanism for managing and sharing data across your application.
 * It allows you to create, retrieve, and update variables within a private store using a reducer pattern.
 */
const store = () => {
  let _state = {}; // The central state object, made `let` to allow reassigning for immutability
  const _reducers = {}; // Stores registered reducer functions, mapping keys to reducers
  const _subscribers = []; // Stores subscription callbacks
  let _isStoreInitialized = false; // Flag to ensure createStore is called only once

  /**
   * Helper function to notify all registered subscribers about a state change.
   * @private
   */
  const _notifySubscribers = () => {
    _subscribers.forEach(callback => callback(_state)); // Pass the entire new state to subscribers
  };

  /**
   * Creates the initial store by accepting an object with key-value pairs. This function throws an error
   * if invoked more than once. It merges the provided `storeObject` with any pre-existing state slices
   * initialized by registered reducers, with `storeObject` taking precedence for overlapping keys.
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

    if (_isStoreInitialized) {
      throw new Error('You can only create store once.');
    }

    // Merge provided storeObject with any existing initial state slices from reducers.
    // Properties in storeObject take precedence, acting as "preloadedState" in Redux terms.
    _state = { ..._state, ...storeObject };
    _isStoreInitialized = true; // Mark the store as initialized
    _notifySubscribers(); // Notify after initial state is set
  };

  /**
   * Retrieves the value associated with a specified key in the store.
   * If no key is provided, the entire state object is returned.
   *
   * @param {string} [key] - The key of the variable stored in the private store.
   * @returns {*} The value of the specified key if found; otherwise, undefined. Returns the full state if no key is provided.
   */
  const getState = (key) => (key ? _state[key] : _state);

  /**
   * Updates the value associated with a specified key in the store directly.
   * If the key doesn't exist, an error is thrown.
   * This method bypasses the reducer mechanism and should be used with caution,
   * typically for non-reducer-managed state slices or initial setup that does not
   * warrant a full action dispatch. In a strict Redux-like pattern, all state
   * changes would go through the `update` (dispatch) method.
   *
   * @param {string} key - The key of the state to be updated.
   * @param {*} newValue - The new value for the specified state.
   *
   * @throws {Error} If the key does not exist in the store.
   */
  const updateState = (key, newValue) => {
    if (!_state.hasOwnProperty(key)) {
      throw new Error(`Key '${key}' doesn't exist in store.`);
    }

    // Check for referential equality to avoid unnecessary updates and notifications
    if (_state[key] === newValue) {
      return; // No change, so do nothing
    }

    // Create a new state object to maintain immutability
    _state = {
      ..._state,
      [key]: newValue,
    };
    _notifySubscribers(); // Notify subscribers of the direct state change
  };

  /**
   * Registers a reducer function for a specific slice of the global state.
   * A reducer takes the current state slice and an action, and returns the new state slice.
   * This is part of implementing issue #62, which provides the mechanism to populate `_reducers`.
   * When a reducer is registered, its state slice is initialized by calling the reducer
   * with `undefined` state and an `@@INIT` action, but only if the slice doesn't already exist.
   *
   * @param {string} key - The key corresponding to the state slice this reducer manages.
   * @param {Function} reducerFunction - The reducer function. Signature: (stateSlice, action) => newStateSlice.
   * @throws {Error} If key is not a non-empty string or reducerFunction is not a function.
   * @throws {Error} If a reducer is already registered for the given key.
   */
  const registerReducer = (key, reducerFunction) => {
    if (typeof key !== 'string' || !key) {
      throw new Error('Reducer key must be a non-empty string.');
    }
    if (typeof reducerFunction !== 'function') {
      throw new Error('Reducer must be a function.');
    }
    if (_reducers[key]) {
      throw new Error(`Reducer for key '${key}' is already registered.`);
    }

    _reducers[key] = reducerFunction;

    // Initialize the state slice using the reducer's initial state if it doesn't already exist.
    // This assumes reducerFunction(undefined, { type: '@@INIT' }) returns the initial state for the slice,
    // which is a common Redux pattern.
    // If createStore has already run and provided initial state for this key, we do not override it.
    if (!_state.hasOwnProperty(key)) {
      const initialSlice = reducerFunction(undefined, { type: '@@INIT' });
      // Only update if the reducer explicitly returns a non-undefined initial state
      if (initialSlice !== undefined) {
         _state = {
          ..._state,
          [key]: initialSlice,
        };
        // No explicit _notifySubscribers here, as this is part of setup.
        // `createStore` will notify if it's called after, or subsequent `update` calls will.
      }
    }
  };

  /**
   * Dispatches an action to update the store's state using registered reducers.
   * Each reducer will receive its respective state slice and the action.
   * The store's state will be updated based on the return values of the reducers,
   * maintaining immutability by creating a new state object if changes occur.
   *
   * @param {Object} action - An object describing the state change. Must have a 'type' property.
   * @throws {Error} If action is not an an object with a 'type' property.
   */
  const update = (action) => {
    // Basic error handling for the action object
    if (
      !(
        action !== null &&
        typeof action === 'object' &&
        !Array.isArray(action) &&
        typeof action.type === 'string'
      )
    ) {
      throw new Error(
        'Action must be an object with a "type" property (e.g., { type: "ACTION_TYPE" }).',
      );
    }

    let hasStateChanged = false;
    let nextState = { ..._state }; // Create a shallow copy of the current state to build the next state

    // Iterate over each registered reducer
    for (const key in _reducers) {
      // Ensure we only process properties directly on _reducers, not inherited ones
      if (Object.prototype.hasOwnProperty.call(_reducers, key)) {
        const reducer = _reducers[key];
        const previousSlice = _state[key]; // Get the current slice from the actual _state
        let newSlice;

        try {
          // Invoke the reducer with its current slice and the action
          newSlice = reducer(previousSlice, action);
        } catch (error) {
          console.error(`Error in reducer for key '${key}':`, error);
          // If a reducer errors, we keep its previous slice to prevent store corruption.
          newSlice = previousSlice;
        }

        // Only update the slice in nextState if the reducer returned a different value (reference check for objects/arrays)
        if (newSlice !== previousSlice) {
          nextState[key] = newSlice;
          hasStateChanged = true;
        }
      }
    }

    // If any reducer caused a state change, update the main state object and notify subscribers
    if (hasStateChanged) {
      _state = nextState; // Reassign the main _state object to the new, updated state
      _notifySubscribers(); // Trigger state change notifications
    }
  };

  /**
   * Subscribes a callback function to listen for state changes.
   * The callback will be invoked whenever the store's state is updated.
   *
   * @param {Function} callback - The function to be called when the state changes. It receives the entire new state as an argument.
   * @returns {Function} An unsubscribe function that removes the callback from the subscribers list.
   * @throws {Error} If the callback is not a function.
   */
  const subscribe = (callback) => {
    if (typeof callback !== 'function') {
      throw new Error('Subscription callback must be a function.');
    }
    _subscribers.push(callback);

    // Return a function to unsubscribe
    return () => {
      const index = _subscribers.indexOf(callback);
      if (index > -1) {
        _subscribers.splice(index, 1);
      }
    };
  };

  return { createStore, getState, updateState, registerReducer, update, subscribe };
};

export default store();