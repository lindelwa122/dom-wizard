import getState from "./getState.js";
import updateState from "./updateState.js";

const getStore = () => {

    let _store;

    /* Store exists */
    if (localStorage.getItem("store")) {
        
        _store = JSON.parse(localStorage.getItem("store"));

        return {..._store, getState, updateState}
    }
    else {
        console.error("Store doesn't exist create one using createStore()");
        throw new Error("Store not found");
    }
    
}

export default getStore;