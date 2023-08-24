const process = require("node:process");

console.log(process.cwd()); // Trae el directorio actual de trabajo
console.log(process.pid); // Trae el id del proceso
console.log(process.arch); // Trae la arquitectura del sistema
console.log(process.platform); // Trae el sistema operativo
console.log(process.version); // Trae la versión de node

if (process.argv[2] === "dev") {
    console.log("Estás en modo desarrollo");
}

process.on("beforeExit", () => {
    console.log("El proceso va a terminar");
});

process.on("exit", () => {
    console.log("El proceso acabó");
});

process.exit(0); // Termina el proceso bien
process.exit(1); // Termina el proceso mal