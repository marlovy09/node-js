const http = require("node:http");

const server = http.createServer((req, res) => {
  res.end("holii mundo");
});
server.listen(3000);
{
  console.log("servidor escuchando el puerto 3000");
}
