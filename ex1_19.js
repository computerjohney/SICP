//Exercise 1.19
//There is a clever algorithm for computing the Fibonacci numbers in a logarithmic number of steps.
//Recall the transformation of the state variables a and b in the fib_iter process
//a←a+b and b←a. Call this transformation T, and observe that applying T over and
// over again n times, starting with 1 and 0, produces the pair Fib(n+1) and Fib(n).
//In other words, the Fibonacci numbers are produced by applying T^n,
//the nth power of the transformation T, starting with the pair (1,0).

//Now consider T to be the special case of p=0 and q=1 in a family of transformations T_{pq} (that's a subscript)
//where T_{pq}
//transforms the pair (a,b) according to a ← bq + aq + ap and b ← bp + aq
//
// Show that if we apply such a transformation T_{pq}
//  twice, the effect is the same as using a single transformation T_{p'q'}
//  of the same form, and compute p' and q'
//  in terms of p and q. This gives us an explicit way to square these transformations, and thus we can compute T^n
//  using successive squaring, as in the fast_expt function.
// Put this all together to complete the following function, which runs in a logarithmic number of steps:

function is_even(n) {
  return n % 2 === 0;
}

function fib(n) {
  return fib_iter(1, 0, 0, 1, n);
}

function fib_iter(a, b, p, q, count) {
  return count === 0
    ? b
    : is_even(count)
    ? fib_iter(a, b, p * p + q * q, 2 * p * q + q * q, count / 2)
    : fib_iter(b * q + a * q + a * p, b * p + a * q, p, q, count - 1); // last term is as given, a ← bq + aq + ap and b ← bp + aq
}

// count ver is  a ← bq + aq + ap and b ← bp + aq
// squared ver is p ← p*p + q*q  and  q ← 2*p*q + q*q

// anyway...
console.log(fib(30));

// a1 = bq + aq + ap
// b1 = bp + aq

// The next step is to define a2 and b2 and apply the tranformation a second time, this time using a1 and b1 in place of a and b.

// a2 = b1q + a1q + a1p
// b2 = b1p + a1q

// Now that we have a system of equations defined, we can use substitution on our way to simplifying.

// a2 = (bp + aq)q + (bq + aq + ap)q + (bq + aq + ap)p
// b2 = (bp + aq)p + (bq + aq + ap)q

// The second equation is shorter, so it should be easier to manipulate.
// Remember, we're trying to find p' and q', so we need to rewrite the equation to fit the form

// b2 = bp' + aq'

// where p' and q' can be computed in terms of q and p.

// b2 = (bp + aq)p + (bq + aq + ap)q
// = (bpp + apq) + (bqq + aqq + apq)
// = bpp + apq + bqq + aqq + apq
// = (bpp + bqq) + (2apq + aqq)
// = b(pp + qq) + a(2qp + qq)

// From this we can see that p' and q' can be computed using the following equations:

// p' = p2 + q2
// q' = 2pq + q2
// SEE https://billthelizard.blogspot.com/2010/01/sicp-exercise-119-computing-fibonacci.html
