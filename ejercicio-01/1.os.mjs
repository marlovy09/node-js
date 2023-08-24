/*
Módulo os (Información del sistema operativo):

1 Información del sistema operativo:
Muestra por consola el nombre de la plataforma, la arquitectura del sistema y la versión del sistema operativo.

2 Directorio de usuario:
Imprime por consola el directorio del usuario actual.

3 Muestra el resultado utilizando la sintaxis de ES Modules.

4 Utiliza la libreria chalk para personalizar los mensajes impresos en consola.

5 Finalmente crea un script en el package.json que ejecute el código utilizando node (npm run os)

Ejemplo de ejecución:
$ npm run os
1. Información del sistema operativo:
Plataforma: linux
Arquitectura: x64
Versión: 5.15.90.1-microsoft-standard-WSL2
---------------------------------------
2. Directorio de usuario:
/home/fabian
*/
// Solucion
import chalk from "chalk";
import os from "node:os";
console.log(chalk.bgBlack("Información del sistema operativo:"));
console.log(chalk.bgGreen("plataforma", os.platform()));
console.log(chalk.bgRed("Versión del sistema o:", os.release()));
console.log(chalk.bgYellow("Arquitectura del sistema operativo:", os.arch()));
console.log(chalk.bgBlack("----------------------------------"));
console.log(chalk.bgGrey("Directorio de usuario"));
console.log(chalk.blue("2. Directorio de usuario:"));
console.log(chalk.green(os.homedir()));


