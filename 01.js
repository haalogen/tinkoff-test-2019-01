let n = -1;
process.stdin.once('data', (data) => {
  n = parseFloat(data.toString());

  main();
})


function main() {
  function isPalindrome (str) {
    return str === str.split('').reverse().join('');
  }

  // Считаем палиндромы
  let count = 0;
  for (let i = 1; i <= n; i++) {
    if (isPalindrome(String(i))) {
      count++;
    }
  }

  console.log(count);
  process.exit(0);
}