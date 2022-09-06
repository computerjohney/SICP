function times(a, b) {
  return b === 0 ? 0 : a + times(a, b - 1);
}

console.log(times(3, 4));

function itimes(a, b) {
  var t = 0;
  if (b === 0) {
    console.log("got to 0");
    return 0;
  } else {
    console.log(`got a: ${a} b: ${b}`);
    //return a + itimes(a, b - 1);
    t = a + itimes(a, b - 1);
    console.log(`got a: ${a} b: ${b} and t is: ${t}`);
    return t;
  }
}
//itimes(3, 4);
console.log(itimes(3, 4));

// now use double and halve so can get O(logn)...
function double(n) {
  return 2 * n;
}

function halve(n) {
  return n / 2;
}

function is_even(n) {
  return n % 2 === 0;
}

function logitimes(a, b) {
  var t = 0;
  if (b === 0) {
    console.log("got to 0");
    return 0;
  } else {
    console.log(`got a: ${a} b: ${b} and t is: ${t}`);
    // if b even half b, double a
    if (is_even(b)) {
      //halve(b);
      //double(a);
      t = logitimes(double(a), halve(b));
      console.log(`got a: ${a} b: ${b} and t is: ${t}`);
      return t;
    } else {
      t = a + logitimes(a, b - 1);
      console.log(`got a: ${a} b: ${b} and t is: ${t}`);
      return t;
    }
  }
}

console.log(logitimes(6, 9));

function logtimes(a, b) {
  return b === 0
    ? 0
    : is_even(b)
    ? logtimes(double(a), halve(b))
    : a + times(a, b - 1);
}
console.log(logtimes(3, 4));
console.log(logtimes(11, 11));
console.log(logtimes(11, 1));
console.log(logtimes(1, 1));
// Solution...
function fast_times(a, b) {
  return b === 1
    ? a
    : a === 0 || b === 0
    ? 0
    : is_even(b)
    ? double(fast_times(a, halve(b)))
    : a + fast_times(a, b - 1);
}

// Solution 1.18 is...
function fast_times_iter(total, a, b) {
  return b === 1
    ? total + a
    : a === 0 || b === 0
    ? 0
    : is_even(b)
    ? fast_times_iter(total, double(a), halve(b))
    : fast_times_iter(total + a, a, b - 1);
}

function times(a, b) {
  return fast_times_iter(0, a, b);
}

console.log(times(13, 14));
