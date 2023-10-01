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
  
    return this;
  }