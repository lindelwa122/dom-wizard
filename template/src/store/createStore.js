const create = () => {

    const _error = () => {
        console.error("Store already exists.")
        throw new Error("Cannot invoke createStore more than once.");
    }
   
    const createStore = (storeObject ) => {
    
        /* Global store creation for entire access */
        const _store = storeObject;

        /* handling refresh */
        window.onbeforeunload = () => {
            localStorage.setItem("isLoading","true");
        }
        
        /* in case of store does not exist */
        if (!localStorage.getItem("store")) {
            localStorage.setItem("store", JSON.stringify(_store));
        }
        
        /* if store exists and it is not reloading */
        if (localStorage.getItem("store") &&
            !JSON.parse(localStorage.getItem("isLoading"))) {
            _error();
        }

        /* indicates reloading is complete */
        localStorage.setItem("isLoading","false");
    }

    return { createStore };

}

export default create().createStore;

