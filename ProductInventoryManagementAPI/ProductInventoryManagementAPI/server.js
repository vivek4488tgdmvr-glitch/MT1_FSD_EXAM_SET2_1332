const server = require("./httpServer");

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Product Inventory API running on port ${PORT}`);
});
