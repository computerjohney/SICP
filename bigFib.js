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

if (first.length >= second.length) {
  console.log(findSum(first, second));
} else {
  findSum(second, first);
}

function findSum(first, second) {
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

// Now I need a findDouble, findHalve, findIsEven, findMinus1
// so can implement logitimes from ex1_17.js
// findHalve only if it's even
function dec2hex(str) {
  // .toString(16) only works up to 2^53
  var dec = str.toString().split(""),
    sum = [],
    hex = [],
    i,
    s;
  while (dec.length) {
    s = 1 * dec.shift();
    for (i = 0; s || i < sum.length; i++) {
      s += (sum[i] || 0) * 10;
      sum[i] = s % 16;
      s = (s - sum[i]) / 16;
    }
  }
  while (sum.length) {
    hex.push(sum.pop().toString(16));
  }
  return hex.join("");
}
// better just go BINARY!
function text2Binary(string) {
  return string
    .split("")
    .map(function (char) {
      return char.charCodeAt(0).toString(2); // mask 0011 off front of these
    })
    .join(" ");
}
console.log(text2Binary("1234567890"));
