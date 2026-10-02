function setTimeoutPromisified(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// callback hell
setTimeout(() => {
  console.log("Hello 2 seconds");
  setTimeout(() => {
    console.log("Hello there 4 seconds");
    setTimeout(() => {
      console.log("hi tthere after 6seconds");
    }, 6000);
  }, 4000);
}, 2000);




// promises are introduced to avaid callback hell
// promise chaining
setTimeoutPromisified(2000)
  .then(function () {
    console.log("hi after 2 seconds");
    return setTimeoutPromisified(4000);
  })
  .then(function () {
    console.log("hi after 4 seconds");
    return setTimeoutPromisified(6000);
  })
  .then(function () {
    console.log("hi after 6 seconds");
  });  











  