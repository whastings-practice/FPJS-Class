require('lambdajs').expose(global);
require('pointfree-fantasy').expose(global);
var Maybe = require('pointfree-fantasy/instances/maybe');
var IO = require('../../lib/io');
var Future = require('data.future');
var _ = require('ramda');
IO.extendFn();

// fib browser for test
var localStorage = {};



// Exercise 1
// ==========
// Write a function that add's two possibly null numbers together using Maybe and ap()

var ex1 = function (x, y) {
  return Maybe.of(_.add).ap(Maybe(x)).ap(Maybe(y));
};


// Exercise 2
// ==========
// Rewrite 1 to use liftA2 instead of ap()

var ex2 = liftA2(_.add);



// Exercise 3
// ==========
// Make a future by running getPost() and getComments() using applicatives, then renders the page with both
var makeComments = reduce(function(acc, c){ return acc+"<li>"+c+"</li>" }, "");
var render = _.curry(function (p, cs) { return "<div>"+p.title+"</div>"+makeComments(cs); });


var ex3 = Future.of(render).ap(getPost(2)).ap(getComments(2));



// Exercise 4
// ==========
// setup...
localStorage.player1 = "toby";
localStorage.player2 = "sally";

// Write a function that gets both player1 and player2 from the cache.
var getCache = function (x) { return localStorage[x]; }.toIO();
var game = _.curry(function (p1, p2) { return p1 + ' vs ' + p2; });

var ex4 = Maybe.of(game).ap(getCache('player1')).ap(getCache('player2'));





// TEST HELPERS
// =====================

function getPost(i) {
  return new Future(function (rej, res) {
    setTimeout(function () { res({ id: i, title: 'Love them futures' }); }, 300);
  });
}

function getComments(i) {
  return new Future(function (rej, res) {
    setTimeout(function () {
      res(["This class should be illegal", "Monads are like space burritos"]);
    }, 300);
  });
}

module.exports = {ex1: ex1, ex2: ex2, ex3: ex3, ex4: ex4}
