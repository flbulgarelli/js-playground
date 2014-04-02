function argumentsToArray(arguments) {
  return Array.prototype.slice.call(arguments);
}

function isEmpty(xs) {
  return xs.length === 0;
}

function head(xs) {
  return xs[0]
}

function last(xs) {
  return xs[xs.length - 1]
}

function tail(xs) {
  return xs.slice(1)
}

function init(xs) {
  return xs.slice(1)
}

Array.prototype.untuplize = function (f) {
  return f.apply(null, this);
}

Function.prototype.andThen = function (f) {
  var self = this;
  return function (x) {
    return f(self(x))
  }
}

function prefix(f) {
  return function () {
    var args = argumentsToArray(arguments);
    return f.call(last(args), init(args));
  }
}

var map = prefix(Array.prototype.map)
var filter = prefix(Array.prototype.filter)

Function.prototype.compose = function (g) {
  return g.andThen(this)
}

Function.prototype.partial = function (x) {
  var self = this;
  return function () {
    var args = argumentsToArray(arguments);
    return self.apply(null, cons(x, args))
  }
}

function equalBy(f) {
  return function (x, y) {
    return f(x) === f(y)
  }
}

function not(x) {
  return !x
}

function cons(x, xs) {
  return [x].concat(xs)
}

function partition (eq, xs) {
  return [ filter(eq, xs), filter(not.compose(eq), xs)  ]
}

function  group (f, xs) {
  if (isEmpty(this)) return [];

  var x = head(this),
      xs = tail(this);

  return xs.partition(f.partial(x)).untuplize(function (eq, neq) {
    return cons(cons(x, eq), neq.group(f))
  })
}

function groupBy(f, xs) {
  return xs.group(equalBy(f))
}

function toObject(xs) {
  var result = {}
  xs.forEach(function (it) {
    result[it[0]] = it[1]
  });
  return result;
}

//====

var POSITIVE_SENTIMENT = 'positive'
var NEGATIVE_SENTIMENT = 'negative'
var NEUTRAL_SENTIMENT = 'neutral'

var reviews = [
  {sentiment: POSITIVE_SENTIMENT, text: 'Lorem Ipsum'},
  {sentiment: POSITIVE_SENTIMENT, text: 'Foo'},
  {sentiment: NEGATIVE_SENTIMENT}
]

groupBy.partial(function (it) {
  return it.sentiment
}).
andThen(map.partial(function (it) {
  return [it[0].sentiment, it.length]
})).
andThen(toObject).
andThen(function (it) {
  return {
    positiveCount: it[POSITIVE_SENTIMENT] || 0,
    negativeCount: it[NEGATIVE_SENTIMENT] || 0,
    neutralCount: it[NEUTRAL_SENTIMENT] || 0}
})(reviews)