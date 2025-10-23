import domManager from './modules/domManager';
import cssManager from './modules/cssManager';
import router from './modules/router';
import store from './modules/store';
import reducers from './modules/reducers/index.js';

store.registerReducers(reducers);

cssManager.addRule({ body: 'transition: opacity .25s' });

export { domManager };
export { cssManager };
export { router };
export { store };
