function setTimeoutPromisified(delay) {
    return new Promise(function(resolve) {
        setTimeout(() => {
            resolve()
        }, delay);
    })
} 

setTimeoutPromisified(5000)
    .then(function() {
        console.log("5 second has passed")
    })