const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {

    //SOLUTION - 1
    // fs.readFile('text-file.txt', (err, data) => {
    //     if (err) console.log(err);
    //     res.end(data);
    // });

    //SOLUTION - 2: Streams
    // const readable = fs.createReadStream('text-fie.txt');
    // readable.on('data', chunk => {
    //     res.write(chunk);
    // })
    // readable.on('end', () => {
    //     res.end();
    // })
    // readable.on('error', err => {
    //     console.log(err);
    //     res.statusCode = 500;
    //     res.end(`File not found!`)
    // });

    //SOLUTION -  3: using pipe() method
    const readable = fs.createReadStream('text-file.txt');
    readable.pipe(res);
});

server.listen(8000, () => {
    console.log(`Listening..............`);
})