function argumentsToArray(arguments) {
  return Array.prototype.slice.call(arguments);
}

function isEmpty(xs) {
  return xs.length === 0;
}

function head(xs) {
  return xs[0]
}

function tail(xs) {
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

Object.prototype.tap = function(f){
  return f(this);
}

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

Array.prototype.partition = function(eq) {
  return [ this.filter(eq), this.filter(not.compose(eq))  ]
}

Array.prototype.group = function(f) {
  if (isEmpty(this)) return [];

  var x = head(this),
      xs = tail(this);

  return xs.partition(f.partial(x)).untuplize(function (eq, neq) {
    return cons(cons(x, eq), neq.group(f))
  })
}

Array.prototype.groupBy = function(f) {
  return this.group(equalBy(f))
}

Array.prototype.toObject = function () {
  var result = {}
  this.forEach(function (it) {
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

reviews.
    groupBy(function (it) {
      return it.sentiment
    }).
    map(function (it) {
      return [it[0].sentiment, it.length]
    }).
    toObject().
    tap(function (it) {
      return {
        positiveCount: it[POSITIVE_SENTIMENT] || 0,
        negativeCount: it[NEGATIVE_SENTIMENT] || 0,
        neutralCount: it[NEUTRAL_SENTIMENT]   || 0}
    });
