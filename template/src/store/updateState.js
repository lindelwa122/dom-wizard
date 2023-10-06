/**
 * Updates the state of the store.
 *
 * @param {string} key The key of the property to update.
 * @param {*} newValue The new value for the property.
 * @returns {this} The store object, so that calls can be chained.
 *
 * @throws {Error} If the key is not a string.
 * @throws {Error} If the key does not exist in the store.
 * @throws {Error} If the new value is undefined or null.
 */

function updateState(key, newValue) {
    if (!key || typeof key !== 'string') {
      throw new Error(`Key  ${key} must be a string.`);
    }
  
    if (!this.hasOwnProperty(key)) {
      throw new Error(`Key ${key} does not exist.`);
    }
  
    if (newValue === undefined || newValue === null) {
      throw new Error('New value must be defined.');
    }

    this[key] = newValue;

    /* Update the state of localStorage */
    const data = JSON.parse(localStorage.getItem("store"));

    data[key] = newValue;

    localStorage.setItem("store",JSON.stringify(data));
  
    return this;
  }

export default updateState;