const EventEmitter = require('events');
const http = require('http');

class sales extends EventEmitter {
    constructor() {
        super()
    }
}
const myEmitter = new sales();

myEmitter.on('newSale', () => {
    console.log(`There was a new sale!`);
})

myEmitter.on(`newSale`, () => {
    console.log(`Customer name:  Pavan h`);
})
myEmitter.on('newSale', stock => {
    console.log(`There are now ${stock} items left in stock.s`);
})

myEmitter.emit(`newSale`, 123);

//NOTE  - NEXT  on HTTP
console.log(`🔔🔔 HTTP server operations`);

const server = http.createServer();
server.on('request', (req, res) => {
    console.log(`Request received! - 1`);
    console.log(req.url);
    res.end(`Request received - 2`);
});

server.on("request", (req, res) => {
    console.log("Another request 😀")
})

server.on('close', () => {
    console.log(`Server closed`);
})

server.listen(8000, "127.0.0.1", () => {
    console.log(`Server running......`);
})

