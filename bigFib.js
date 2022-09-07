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
  // need to strip leading zeros

  return quotient;
}

function findIsEven(num) {
  var last = Number(num.charAt(num.length - 1));
  return last % 2 === 0;
}

console.log(findHalf(findSum(first, second)));
console.log(first);
console.log(
  findIsEven(
    "7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777"
  )
);
