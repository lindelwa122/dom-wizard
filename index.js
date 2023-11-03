import domManager from './modules/domManager';
import cssManager from './modules/cssManager';
import router from './modules/router';
import store from './modules/store';

cssManager.addRule({ body: 'transition: opacity .25s' });

export { domManager };
export { cssManager };
export { router };
export { store };
