// Псц ну изадачка блин
// const input = ["x+2", "x^3-x^2+1"];
const input = [];

process.stdin.once('data', (data) => {
  input[0] = data.toString();

  process.stdin.once('data', (data) => {
    input[1] = data.toString();
    main();
  })
})

function main (argument) {

  let termsFirst = {};
  let termsSecond = {};
  let termsResult = {};

  const regex = /(-?)([0-9]*)(x?)(\^?)([0-9]*)/g;
  let first = input[0].match(regex).filter(str => !!str);
  let second = input[1].match(regex).filter(str => !!str);

  // Bias
  termsFirst[0] = first.filter(term => !term.includes("x")).map(parseFloat)[0];
  termsSecond[0] = second.filter(term => !term.includes("x")).map(parseFloat)[0];

  function parseCoeff(str) {
    if (str === "") return 1;
    if (str === "-") return -1;
    return parseFloat(str);
  }

  // x^n
  const withXFirst = first.filter(term => term.includes("x"));
  const withXSecond = second.filter(term => term.includes("x"));

  // Exponent
  let exponentsFirst = withXFirst
    .map(str => /x(\^?)([0-9]*)/.exec(str)[2])
    .map(parseCoeff);
  let exponentsSecond = withXSecond
    .map(str => /x(\^?)([0-9]*)/.exec(str)[2])
    .map(parseCoeff);
  // console.log({ exponentsFirst });
  // console.log({ exponentsSecond });

  // Coeffs
  let coeffsFirst = withXFirst.map(str => /(.*)x/.exec(str)[1]).map(parseCoeff);
  let coeffSecond = withXSecond.map(str => /(.*)x/.exec(str)[1]).map(parseCoeff);
  // console.log(coeffsFirst);
  // console.log(coeffSecond);

  exponentsFirst.forEach((exp, i) => (termsFirst[exp] = coeffsFirst[i]));
  exponentsSecond.forEach((exp, i) => (termsSecond[exp] = coeffSecond[i]));

  // console.log({ first });
  // console.log({ second });
  // console.log({ termsFirst });
  // console.log({ termsSecond });

  // Multiply
  Object.keys(termsFirst)
    .map(parseFloat)
    .forEach(expFirst => {
      const coeffFirst = parseFloat(termsFirst[expFirst]);

      Object.keys(termsSecond)
        .map(parseFloat)
        .forEach(expSecond => {
          const coeffSecond = parseFloat(termsSecond[expSecond]);

          // console.log("coeffFirst", coeffFirst);
          // console.log("coeffSecond", coeffSecond);

          // Прибавляем промежуточн результат
          const coeffResult = termsResult[expFirst + expSecond] || 0;

          // console.log(expFirst + expSecond);
          // console.log({ coeffResult });
          // console.log(coeffFirst * coeffSecond);

          termsResult[expFirst + expSecond] =
            coeffResult + coeffFirst * coeffSecond;
          // console.log("coeffResult", termsResult[expFirst + expSecond]);

          // console.log({ termsResult });
          // console.log({ termsResult });
        });
    });

  // console.log({ termsResult });

  function buildPolynomString(terms) {
    // console.log(terms);
    let result = "";
    Object.keys(terms)
      .reverse()
      .forEach(term => {
        // console.log({ term })
        const coeff = terms[term];
        if (coeff === 0) return; // Skip 0 coeffs
        // console.log({coeff})

        let termStr = String(terms[term]) + "x^" + String(term);
        result += "+" + termStr;
      });

    // Ax^0 => A
    result = result.replace(/x\^0/g, "");

    // x^1 => x
    result = result.replace(/x\^1\+/g, "x+");
    result = result.replace(/x\^1-/g, "x-");
    result = result.replace(/x\^1$/g, "x");

    // +1x^N  -1x^N => +x^N -x^N
    result = result.replace(/-1x/g, "-x");
    result = result.replace(/1x/g, "x");

    // +- => -
    result = result.replace(/\+-/g, "-");
    result = result.replace(/-\+/g, "-");

    // Remove leading +
    if (result[0] === "+") result = result.slice(1);

    return result;
  }

  const resultStr = buildPolynomString(termsResult);
  // const resultStr = buildPolynomString({ 0: -1, 1: 1, 2: 0, 3: -1, 18: -1 });
  // const resultStr = buildPolynomString({ 1: -1, 2: 0, 3: -12, 18: 22 });
  console.log(resultStr);
  process.exit(0);
}