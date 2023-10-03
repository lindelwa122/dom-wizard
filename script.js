import { readContent } from "./index.js"; 

const domManager = readContent();

const data = domManager.read(".para",false);

console.log(data);