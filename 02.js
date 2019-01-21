const dict = {};
let str = '';
process.stdin.once('data', (data) => {
  str = data.toString();

  main();
})


function main() {
  str.split('').forEach((char) => {
    dict[char] = Number(dict[char] || 0) + 1;
  })

  const resultStr = Object
    .keys(dict)
    .filter((char) => dict[char] >= 2)
    .join('');

  // console.log(dict);
  console.log(resultStr);
  process.exit(0);
}