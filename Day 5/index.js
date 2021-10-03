const fs = require("fs");
fs.mkdirSync("day-5");
fs.writeFileSync("day-5/hello.txt", "Hello");
fs.appendFileSync("day-5/hello.txt", " World");
fs.renameSync("day-5/hello.txt", "Hello2.txt");