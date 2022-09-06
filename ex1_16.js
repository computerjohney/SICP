// notes...
function abs(x) {
  return x > 0 ? x : x === 0 ? 0 : -x;
}

console.log(abs(-5));
// SICP JS 1.1.6

function plus(a, b) {
  return a + b;
}

function minus(a, b) {
  return a - b;
}

function a_plus_abs_b(a, b) {
  return (b >= 0 ? plus : minus)(a, b);
}

console.log(a_plus_abs_b(5, -4));

// SICP JS 1.2.1

function factorial(n) {
  return fact_iter(1, 1, n);
}
// linear ITERATIVE process!!!
function fact_iter(product, counter, max_count) {
  return counter > max_count
    ? product
    : fact_iter(counter * product, counter + 1, max_count);
}
//
// versus recursive version, n * factorial(n-1)

//complete description of the state of the process at any point. If we stopped the computation between steps,
// all we would need to do to resume the computation is to supply the interpreter with the values of the three state variables.
// Not so with the recursive process. In this case there is some additional "hidden" information,
// maintained by the interpreter and not contained in the state variables, which indicates "where the process is"

// Newton's method square root
// SICP JS 1.1.7

// function abs(x) {
//     return x >= 0 ? x : - x;
// }

function square(x) {
  return x * x;
}

function is_good_enough(guess, x) {
  return abs(square(guess) - x) < 0.001;
}

function average(x, y) {
  return (x + y) / 2;
}

function improve(guess, x) {
  return average(guess, x / guess);
}

function sqrt_iter(guess, x) {
  return is_good_enough(guess, x) ? guess : sqrt_iter(improve(guess, x), x);
}

console.log(sqrt_iter(3, 25));

// iterative or recursive?
// SICP JS 1.2.1
// oh yeah, need to UN async these, well tried and failed...
console.logSync = (...args) => {
  try {
    args = args.map((arg) => JSON.parse(JSON.stringify(arg)));
    console.log(...args);
  } catch (error) {
    console.log("Error trying to console.logSync()", ...args);
  }
};

function inc(x) {
  console.log(x + 1);
  return x + 1;
}
function dec(x) {
  console.log(x - 1);
  return x - 1;
}

function plus_0(a, b) {
  return a === 0 ? b : inc(plus(dec(a), b));
}

function plus_1(a, b) {
  return a === 0 ? b : plus(dec(a), inc(b));
}

console.logSync(`iterative or recursive? ${plus_0(4, 5)}`);
console.logSync(`iterative or recursive? ${plus_1(4, 5)}`);
//
// SICP JS 1.2.2
// tree recursion...
function fib(n) {
  return n === 0 ? 0 : n === 1 ? 1 : fib(n - 1) + fib(n - 2);
}

fib(6);

function is_even(n) {
  return n % 2 === 0;
}

function fast_expt(b, n) {
  return n === 0
    ? 1
    : is_even(n)
    ? square(fast_expt(b, n / 2))
    : b * fast_expt(b, n - 1);
}

console.log(fast_expt(3, 4));
// multiplying b by itself
// squares the power to the 4/2 and that's it
//
// square the fast_expt(3,2)    3*3 * 3*3
// square the fast_expt(3,1)    3*3
// 3 * fast_expt(3,0)           3
//      (1)
//
// 14 multiplications for n = 1000    log(n) multiplications
//

//Trying to log recursive calls here for example...

console.log("countDownRecursive: ");
function countDownRecursive(n) {
  if (n == 0) {
    console.log("Hooray!");
    return;
  } else {
    console.log(n);
    countDownRecursive(n - 1);
    console.log(n);
  }
}
countDownRecursive(10);

// tree recursion...
// function fib(n) {
//   return n === 0 ? 0 : n === 1 ? 1 : fib(n - 1) + fib(n - 2);
// }
function fib_log(n) {
  if (n === 0) {
    console.log("got to 0!");
    return 0;
  }
  if (n === 1) {
    console.log("got to 1!");
    return 1;
  }
  //return fib_log(n - 1) + fib(n - 2);
  let prev = fib_log(n - 1);
  console.log(prev);
  let prevprev = fib(n - 2);
  console.log(prevprev);
  console.log(`and this one is ${prev + prevprev}`);
  return prev + prevprev;
}
console.log(`logging fibonacci of 10: ${fib_log(10)}`);

console.log("fast exponent logged: ");
function fast_expt_logged(b, n) {
  if (n === 0) {
    console.log("got to 0!");
    return 1;
  } else {
    if (is_even(n)) {
      console.log(n);
      console.log("even, square it");
      return square(fast_expt_logged(b, n / 2));
    } else {
      console.log(n);
      console.log("odd, multiply by base");
      return b * fast_expt_logged(b, n - 1);
    }
  }
}
console.log(fast_expt_logged(4, 3)); //64 = 1* 4*4 *4
console.log(fast_expt_logged(6, 5)); // 1* 6*6 *6*6  *6
console.log();
console.log();
//ex 1.16
//Design a function that evolves an iterative exponentiation process
//that uses successive squaring and uses a logarithmic number of steps, as does fast_expt.
// (Hint: Using the observation that (b^{n/2})^2 = (b^2)^{n/2}
//keep, along with the exponent n and the base b, an additional state variable a,
//and define the state transformation in such a way that the product a * b^n
//is unchanged from state to state. At the beginning of the process a is taken to be 1,
// and the answer is given by the value of a at the end of the process.
//In general, the technique of defining an invariant quantity that remains unchanged from state to state
// is a powerful way to think about the design of iterative algorithms.)
console.log("fast ITERATIVE exponent logged: ");
function fast_iterexpt_logged(a, b, n) {
  if (n === 0) {
    console.log("got to 0!");
    return 1;
  } else {
    if (is_even(n)) {
      console.log(n);
      console.log(`even, square it, a is ${a}`);
      a = a * square(b);
      fast_iterexpt_logged(a, b, n / 2);
    } else {
      console.log(n);
      console.log(`odd, multiply by base, a is ${a}`);
      a = a * b;
      fast_iterexpt_logged(a, b, n - 1);
    }
  }
  return a; // THAT doesn't work!;
}
console.log(fast_iterexpt_logged(1, 6, 5));
console.log();
console.log("fast ITERATIVE exponent logged WITH going back up emphasized: ");
function fast_upiterexpt_logged(a, b, n) {
  if (n === 0) {
    console.log("got to 0!");
    return 1;
  } else {
    if (is_even(n)) {
      a = a * square(b);
      fast_upiterexpt_logged(a, b, n / 2);

      console.log(n);
      console.log(`even, square it, a is ${a}`);
    } else {
      a = a * b;
      fast_upiterexpt_logged(a, b, n - 1);

      console.log(n);
      console.log(`odd, multiply by base, a is ${a}`);
    }
  }
}
fast_upiterexpt_logged(1, 6, 5);

//
// AND the solution is ...
//

function fast_expt_iter(a, b, n) {
  return n === 0
    ? a
    : is_even(n)
    ? fast_expt_iter(a, b * b, n / 2)
    : fast_expt_iter(a * b, b, n - 1);
}
// function fast_expt(b, n) {
//   return fast_expt_iter(1, b, n);
// }

//
// with the help of a reduce function example

Array.prototype.myReduce = function (callback) {
  var a = 0; // Step 1
  for (
    let i = 0;
    i < this.length;
    i++ // Step 2
  ) {
    callback((a = a + this[i])); // Step 3
  }

  return a; // Step 4
};
