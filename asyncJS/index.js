const fs = require('fs');
const superagent = require('superagent');

//STEPS
//Read data 
const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data )=> {
            if (err) reject(`I could not found that file: ${err.message}`);
            resolve(data);
        })
    })
}
//write data
const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, error => {
            if (error) reject(`I could not write file`);
            resolve('sucessfully wrote');
        });
    });
};

//NOTE - with ASYNC/AWAIT support

const getDogPic = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);
    
        //NOTE - for single dog image only using await
        // const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        // console.log(res.body.message);

        //NOTE - when we using the multple promises
        const res1Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res2Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res3Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        
        //TODO - instead of using the multple promises we can use the Promise.all() function
        const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
        const images = all.map(el => el.body.message)
        console.log(images);

        await writeFilePro(`dog-file.txt`, images.join(`\n`));
        console.log(`random dog image saved successfully`);
    }
    catch (error) {
        console.error(error);
        throw new Error(`Could not find dog!`)
    }
    return `1.1 READY 🐶🦴`
}

(async () => {
    try {
        console.log(`1. Will get Dog pictures`);
        const x = await getDogPic()
                console.log(x);
                console.log(`2. Will storing the dog pictures`);
                console.log(`3. Done with dog API`);
    }catch(error) {
                console.log(`${error} 🤯`);
    }
})();


//NOTE - without ASYNC/AWAIT support
/**
//calling read file with text content
readFilePro(`${__dirname}/dog.txt`)
    
    .then(data => {
        console.log(`Breed: ${data}`);
        //calling get function 
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
    })
    .then(res => {
        //writing data
        console.log(res.body.message);
        return writeFilePro(`dog-file.txt`, res.body.message)
    }).then(() => {
        console.log(`random dog image saved successfully`);
    })
    //finding the error in catch function
    .catch(err => {
        console.log(err.message);
    })
*/







