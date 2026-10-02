let fs = require("fs")

/// promisified version of readFile function 
let readFilePromisified = (path, encoding) => {
    return new Promise(function(resolve, reject) {
        fs.readFile(path, encoding, function(err, data) {
            if(err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}

readFilePromisified("b.txt", "utf-8")
    .then(function(data) {
        console.log(data)
    })
    .catch(function(error) {
        console.log("error while reading file")
    })