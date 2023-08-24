const fs = require("node:fs");
console.log("leyendo archivo....");
// "utf-8" = sirve para codificar el archivo, mostrarlo
const archivo = fs.readFileSync("./archivo.txt", "utf-8");

console.log("contenido del archivo....");
console.log(archivo);


