//  split a number into an array (need to make it iterable):
const number = 1234;

const arr = String(number)
  .split("")
  .map((str) => Number(str));

console.log(arr);
console.log(`type of those: ${typeof arr[0]}`);

var first =
  "999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999"; //"893427328497983427893248932498034289324";
var second =
  "999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999"; //"234859234879342897893427893274";

function findDouble(num) {
  return findSum(num, num);
}

function findSum(first, second) {
  if (first.length >= second.length) {
    return fSum(first, second);
  } else {
    return fSum(second, first);
  }
}

function fSum(first, second) {
  var sum = "";
  var carry = 0;
  var diff = second.length - first.length;
  for (i = first.length - 1; i >= 0; i--) {
    var temp =
      (Number(first.charAt(i)) % 10) +
      (Number(second.charAt(i + diff)) % 10) +
      carry;
    if (temp >= 10) {
      sum = (temp % 10) + sum;
      carry = Math.floor(temp / 10);
      //console.log(`how big is that carry: ${carry}`);
    } else {
      sum = temp + sum;
      carry = 0;
    }
  }
  if (carry) {
    sum = carry + sum;
  }
  return sum;
}

// Now I need a findDouble, findHalf, findIsEven, findMinus1
// so can implement logitimes from ex1_17.js
// findHalf only if it's even is already a given
function findHalf(num) {
  var carry = 0;
  var quotient = ""; // answer, 2 is the divisor, num is the dividend
  for (i = 0; i < num.length; i++) {
    var temp = Number(num.charAt(i)) + carry;
    if (temp % 2 === 0) {
      carry = 0;
    } else {
      carry = 10;
    }
    quotient = quotient + Math.floor(temp / 2); // a string
  }
  // need to strip leading zeros!!!
  if (quotient.length > 1 && quotient.charAt(0) == "0")
    return quotient.slice(1);
  return quotient;
}

function findIsEven(num) {
  var last = Number(num.charAt(num.length - 1));
  return last % 2 === 0;
}

function findMinus1(num) {
  //var newnum =num;
  var last = Number(num.charAt(num.length - 1));
  if (last !== 0) {
    return num.slice(0, -1) + (last - 1); //slice(0, -1) is equivalent to slice(0, str. length - 1)
  } else {
    var newnum = num;
    var nines = 0;
    var position = num.length - 1;
    // moving left
    while (newnum.charAt(position) == "0") {
      // last digit becomes 9, go 1 digit left
      position--;
      nines++;
      var next = Number(newnum.charAt(position)) - 1; // -1 off the Number
      // problem if it goes to 0...
      if (next == 0) next = "0";
    }
    // got to do a substring replacement of chars
    newnum = newnum.slice(0, position) + next; //+ "9";
    while (nines > 0) {
      newnum = newnum + "9";
      nines--;
    }
    // strip a leading "0"
    if (newnum.length > 1 && newnum.charAt(0) == "0") return newnum.slice(1);
    return newnum;
  }
}

console.log(findHalf(findSum(first, second)));
console.log(first);
console.log(
  findIsEven(
    "7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777"
  )
);
console.log(findMinus1("1"));

function logtimes(a, b) {
  var t = "0";
  if (b === "0") {
    //console.log("got to 0");
    return "0";
  } else {
    //console.log(`got a: ${a} b: ${b} and t is: ${t}`);
    // if b even half b, double a
    if (findIsEven(b)) {
      //halve(b);
      //double(a);
      t = logtimes(findDouble(a), findHalf(b));
      //console.log(`got a: ${a} b: ${b} and t is: ${t}`);
      return t;
    } else {
      b = findMinus1(b);

      t = findSum(a, logtimes(a, b));

      //console.log(`got a: ${a} b: ${b} and t is: ${t}`);

      return t;
    }
  }
}

console.log(logtimes("6", "9"));
console.log(
  logtimes(
    "100300000000000000000000000000000000000000002",
    "9000000000000000000"
  )
);
//console.log(findHalf("130000000000000000000000000000000000000000000"));

function factorial(n) {
  //
  //if (n == 0) return 1;
  //return logtimes(String(n), factorial(String(n - 1)));
  var res = "1",
    i;
  for (i = 2; i <= n; i++) {
    res = logtimes(res, String(i));
  }
  return res;
}

console.log(factorial(25));
var ways = factorial(52);
console.log(
  `... there are ${ways} ways to shuffle a deck of cards, so thats prob the 1st time`
);
console.log(
  "that's 52! or 80658175170943878571660636856403766975289505440883277824000000000000"
);

function bigFib(n) {
  var fibAnswer = bigFib_iter("1", "0", "0", "1", n);
  return fibAnswer;
}

function bigFib_iter(a, b, p, q, count) {
  // return count === "0"
  //   ? b
  //   : findIsEven(count)
  //   ? fib_iter(a, b, p * p + q * q, 2 * p * q + q * q, count / 2)
  //   : fib_iter(b * q + a * q + a * p, b * p + a * q, p, q, count - 1); // last term is as given, a ??? bq + aq + ap and b ??? bp + aq
  //
  // spread out ...
  var t;
  var pSquared,
    qSquared,
    pSquaredAddqSquared,
    pq,
    pq2,
    pq2AddqSquared,
    halfCount;
  var bq, aq, ap, sumOfbqaq, sumOfbqaqap, bp, sumOfbpaq, countless1;
  if (count === 0) {
    console.log(`The answer is ${b}`);
    return b;
  } else {
    //if (findIsEven(count)) {
    if (count % 2 === 0) {
      pSquared = logtimes(p, p);
      qSquared = logtimes(q, q);
      pSquaredAddqSquared = findSum(pSquared, qSquared);
      pq = logtimes(p, q);
      pq2 = logtimes("2", pq);
      pq2AddqSquared = findSum(pq2, qSquared);
      //halfCount = findHalf(count);
      //console.log(
      //   `In bigFib, terms: ${a}, ${b}, ${pSquaredAddqSquared}, ${pq2AddqSquared}, ${
      //     count / 2
      //   }`
      // );
      t = bigFib_iter(a, b, pSquaredAddqSquared, pq2AddqSquared, count / 2); //halfCount);
      return t;
    } else {
      bq = logtimes(b, q);
      aq = logtimes(a, q);
      ap = logtimes(a, p);
      sumOfbqaq = findSum(bq, aq);
      sumOfbqaqap = findSum(sumOfbqaq, ap);
      bp = logtimes(b, p);
      sumOfbpaq = findSum(bp, aq);
      //countless1 = findMinus1(count);
      //console.log(
      //   `In bigFib, terms: ${sumOfbqaqap}, ${sumOfbpaq}, ${p}, ${q}, ${
      //     count - 1
      //   }`
      // );
      t = bigFib_iter(sumOfbqaqap, sumOfbpaq, p, q, count - 1); //countless1);
      return t;
    }
  }
}

console.log(bigFib(6));
console.log(bigFib(12));
console.log(bigFib(100));
console.log(
  `The 1000th Fibonacci number is 43466557686937456435688527675040625802564660517371780402481729089536555417949051890403879840079255169295922593080322634775209689623239873322471161642996440906533187938298969649928516003704476137795166849228875 It took 4 milliseconds to compute it.`
);

console.log(bigFib(1000));
//console.log(bigFib(10000));
