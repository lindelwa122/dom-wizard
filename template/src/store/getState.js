function getState(key){

    if (key === "" || typeof(key) !== "string" ) {
        console.error("Invalid key");
        throw new Error("Invalid key");
    }

    // if the value of the key is undefined , gives an error and returns undefined
    if (this[key] === undefined) {
        console.error("The value of the key is undefined ");
        throw new Error("Value is undefined");
    }
    
    return this[key];

}

export default getState;