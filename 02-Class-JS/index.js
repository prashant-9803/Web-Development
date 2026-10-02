const fs = require("fs");

function readFileCallback(err, content) {
  console.log(content);
}

// readfile operation is done by OS, till then js thread can do othe rwork
fs.readFile("./a.txt", "utf-8", readFileCallback);

let s = 0;
for (let i = 0; i < 1000; i++) {
  s += i;
}

console.log("sum: ", s);









/*
file operation async and sync 
prompt is async in nature
*/