const http = require("http");
const app = require("./expressApp");

const server = http.createServer(app);

module.exports = server;
