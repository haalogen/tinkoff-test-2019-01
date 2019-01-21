// var readline = require('readline');
// var rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   // terminal: false
// });

let total = 0;

process.stdin.once('data', (data) => {
  console.log('haey', data.toString().trim());

  process.stdin.on('data', function (data) {
    // Stirng#trim() gets rid of leading/trailing '\r', '\n'
    console.log(data.toString().trim());
    process.exit(0);
  })
})



process.on('exit', function () {
  console.log('Exiting!')
})

// rl.on('line', function (data) {
//   total += Number(data) || 0;
// });
// process.stdin.on('end', main);

function main() {
  console.log(total);
  process.exit(0);
}