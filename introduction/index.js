const fs = require('fs');
const http = require('http');
const url = require('url');
const slug = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');
const { default: slugify } = require('slugify');




//NOTE - file Operation

// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');

// //Blocking the code
// const textOut = `About :  ${textIn} is created on ${Date.now()}` ;
// // console.log(textOut);
// fs.writeFileSync('./txt/output.txt', textOut);

// //Insted of callback
// //ES6 - Promises
// //ES8 - Async/ await

// //non-blocking, asyncronous sway
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {

//     if(err) return console.log(`ERROR🤯`);
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//             console.log(data3);
//             fs.writeFile('./txt/myDoc.txt', `${data1}\n${data2}\n${data3}`, 'utf-8', err => {
//                 console.log(`Your file is written 👍🏻`);
//             })
//         })
//     })
//     console.log(data1);
// })
// console.log(`Reading the file....`);


//NOTE  - server 

const tempOverview =  fs.readFileSync(`${__dirname}/templates/template-overview.html`,`utf-8`, );
const tempProduct   =  fs.readFileSync(`${__dirname}/templates/template-product.html`,`utf-8`, );
const tempCard        =  fs.readFileSync(`${__dirname}/templates/template-card.html`, `utf-8`,);

const data = fs.readFileSync(`${__dirname}/data.json`, 'utf-8')
const dataObj = JSON.parse(data);

const slugs = dataObj.map(el => slugify(el.productName, { lower: true }));
console.log(slugs);

//NOTE - create server
const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);


    //NOTE - Overview
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {
            'Content-type': 'text/html',
        })
        const cardHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join(' ');
        const output = tempOverview.replace(`{%PRODUCT_CARDS%}`, cardHtml);
        res.end(output);
    //NOTE - product page
    } else if (pathname === '/product') {
        // console.log(query);
        res.writeHead(200, {
            'conten-type': 'text/html'
        })
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
        //API
    } else if (pathname === '/api') {
        res.end(`API`)
    } else {
        //NOTE - error handling
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        })
        res.end(`<h1>Page not found!</h1>`)
    }
})

//connections
server.listen(8000, () => {
    console.log(`Server is listening to port 8000`);
})



