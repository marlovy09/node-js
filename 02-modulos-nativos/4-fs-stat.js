// se utiliza cuando es un archivo js, no mjs
const fs = require("node:fs");
//
const stat = fs.statSync("./archivo.txt")
console.log("es un directorio");
console.log(stat.isDirectory());