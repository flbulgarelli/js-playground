var POSITIVE_SENTIMENT = {
  collectStats: function (stats) {
    stats.positiveCount += 1
  }
}
var NEGATIVE_SENTIMENT = {
  collectStats: function (stats) {
    stats.negativeCount += 1
  }
}
var NEUTRAL_SENTIMENT = {
  collectStats: function (stats) {
    stats.neutralCount += 1
  }
}

function Review(sentiment, text) {
  this.sentiment = sentiment;
  this.text = text;
}

Review.prototype = {
  collectStats: function (stats) {
    this.sentiment.collectStats(stats);
  }
}

function Stats() {
  this.positiveCount = 0;
  this.negativeCount = 0;
  this.neutralCount = 0;
}


//==============================================

var reviews = [
  new Review(POSITIVE_SENTIMENT, 'Lorem Ipsum'),
  new Review(POSITIVE_SENTIMENT, 'Foo'),
  new Review(NEGATIVE_SENTIMENT, 'baz')
]

var stats = new Stats()

reviews.forEach(function (it) {
  it.collectStats(stats);
});


