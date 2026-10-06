// Create a function that takes another function as input, and runs it after 1 second.


function fn2(fn1: () => void) {
    setTimeout(() => {
        fn1()
    }, 1000);
}

function fn1() {
    console.log("prashant")
    return
}

fn2(fn1)

