let ranges = [];
let N = -1;
let M = -1;
const changes = [];

// Read N
process.stdin.once('data', (data) => {
  N = parseFloat(data.toString());

  // Read M
  process.stdin.once('data', (data) => {
    M = parseFloat(data.toString());

    // Read changes
    process.stdin.on('data', (data) => {
      // console.log(data.toString().trim())
      const [start, end] = data.toString().trim().split(' ').map(parseFloat);
      changes.push({ start, end });
      // console.log(changes);

      if (changes.length === M) { process.exit(0) }
    })
  })

})

function areIntersecting (first, second) {
  const result = (second.start <= first.start && first.start <= second.end) ||
    (second.start <= first.end && first.end <= second.end);
  // console.log(result);
  return result;
}

function main() {
  // console.log({changes});

  // Запихиваем элементы change в ranges:
  changes.forEach(change => {
    // Проверяем, есть ли пересечения change с элементами ranges
    // Оставляем, только если пересечения нет
    ranges = ranges.filter(range => !areIntersecting(range, change))

    // Добавляем change в ranges
    ranges.push(change)
    // console.log({changes});
  })

  // console.log({ranges});

  console.log(ranges.length);
  process.exit(0);
}

process.on('exit', function () {
  main()
})