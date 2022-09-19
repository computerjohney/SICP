// Write an algorithm that can handle n up to 2000000.

// Your algorithm must output the exact integer answer, to full precision. Also, it must correctly handle negative numbers as input.

// HINT I: Can you rearrange the equation fib(n + 2) = fib(n + 1) + fib(n) to find fib(n) if you already know fib(n + 1) and fib(n + 2)? Use this to reason what value fib has to have for negative values.

// HINT II: See https://web.archive.org/web/20220614001843/https://mitpress.mit.edu/sites/default/files/sicp/full-text/book/book-Z-H-11.html#%_sec_1.2.4

// for the negatives (fib 1) 2-1=1  (fib 0) 1-1=0 (fib -1) 1-0=1 (fib -2) 0-1=-1 (fib -3) 1--1 = 2 (-4) -1-2 =-3 (-5)2--3=5 (-6)-3-5=-8 (-7)5--8=13 (-8)-8-13=-21
// Input
// F_(-96)
// Result
// -51680708854858323072
//
//

function bigFib(n) {
  var normalised;
  var answer = 0n;

  n < 0 ? (normalised = n * -1) : (normalised = n);
  var fibAnswer = bigFib_iter(1n, 0n, 0n, 1n, BigInt(normalised));
  n < 0 && n % 2 === 0
    ? (answer = fibAnswer * BigInt(-1))
    : (answer = fibAnswer);
  return String(answer);
}

function bigFib_iter(a, b, p, q, count) {
  // return count === "0"
  //   ? b
  //   : findIsEven(count)
  //   ? fib_iter(a, b, p * p + q * q, 2 * p * q + q * q, count / 2)
  //   : fib_iter(b * q + a * q + a * p, b * p + a * q, p, q, count - 1); // last term is as given, a ← bq + aq + ap and b ← bp + aq
  //
  // spread out ...
  var t = 0n;
  var pSquared = 0n,
    qSquared = 0n,
    pSquaredAddqSquared = 0n,
    pq = 0n,
    pq2 = 0n,
    pq2AddqSquared = 0n,
    halfCount;
  var bq = 0n,
    aq = 0n,
    ap = 0n,
    sumOfbqaq = 0n,
    sumOfbqaqap = 0n,
    bp = 0n,
    sumOfbpaq = 0n,
    countless1;
  if (count === 0n) {
    //console.log(`The answer is ${b}`);
    return b;
  } else {
    //if (findIsEven(count)) {
    if (Number(count) % 2 === 0) {
      pSquared = p * p; //logtimes(p, p);
      qSquared = q * q; //logtimes(q, q);
      pSquaredAddqSquared = pSquared + qSquared; //findSum(pSquared, qSquared);
      pq = p * q; //logtimes(p, q);
      pq2 = 2n * pq; //logtimes("2", pq);
      pq2AddqSquared = pq2 + qSquared; //findSum(pq2, qSquared);
      //halfCount = findHalf(count);
      //console.log(
      //   `In bigFib, terms: ${a}, ${b}, ${pSquaredAddqSquared}, ${pq2AddqSquared}, ${
      //     count / 2
      //   }`
      // );
      t = bigFib_iter(
        a,
        b,
        pSquaredAddqSquared,
        pq2AddqSquared,
        BigInt(Number(count) / 2)
      ); //halfCount);
      return t;
    } else {
      bq = b * q; //logtimes(b, q);
      aq = a * q; //logtimes(a, q);
      ap = a * p; //logtimes(a, p);
      sumOfbqaq = bq + aq; //findSum(bq, aq);
      sumOfbqaqap = sumOfbqaq + ap; //findSum(sumOfbqaq, ap);
      bp = b * p; //logtimes(b, p);
      sumOfbpaq = bp + aq; //findSum(bp, aq);
      //countless1 = findMinus1(count);
      //console.log(
      //   `In bigFib, terms: ${sumOfbqaqap}, ${sumOfbpaq}, ${p}, ${q}, ${
      //     count - 1
      //   }`
      // );
      t = bigFib_iter(sumOfbqaqap, sumOfbpaq, p, q, BigInt(Number(count) - 1)); //countless1);
      return t;
    }
  }
}

// console.log(bigFib(6));
// console.log(bigFib(12));
// console.log(bigFib(100));
// console.log(
//   `The 1000th Fibonacci number is 43466557686937456435688527675040625802564660517371780402481729089536555417949051890403879840079255169295922593080322634775209689623239873322471161642996440906533187938298969649928516003704476137795166849228875 It took 4 milliseconds to compute it.`
// );

console.log(bigFib(1000));
console.log(bigFib(-96)); // -51680708854858323072
console.log(bigFib(0));
