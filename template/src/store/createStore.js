import getState from "./getState.js";
import updateState from "./updateState.js";

const createStore = ( storeObject ) => {

    /* Global store creation for entire access */
    const _store = storeObject;

    /* handling refresh */
    window.onbeforeunload = () => {
        localStorage.removeItem("store");
    }

    /* handling function invoking more than once */
    if (localStorage.getItem("store")) {
        console.error("Store already exists.")
        throw new Error("Cannot invoke createStore more than once.");
    }

    /* Creation of store */
    localStorage.setItem("store", JSON.stringify(storeObject));

    return {..._store, getState, updateState};
}

export default createStore;

