var POSITIVE_SENTIMENT = 'positive'
var NEGATIVE_SENTIMENT = 'negative'
var NEUTRAL_SENTIMENT = 'neutral'

var reviews = [
  {sentiment: POSITIVE_SENTIMENT, text: 'Lorem Ipsum'},
  {sentiment: POSITIVE_SENTIMENT, text: 'Foo'},
  {sentiment: NEGATIVE_SENTIMENT}
]

var stats = {positiveCount: 0, negativeCount: 0, neutralCount: 0}

reviews.forEach(function (it) {
  if (it.sentiment === POSITIVE_SENTIMENT) {
    stats.positiveCount += 1
  } else if (it.sentiment === NEUTRAL_SENTIMENT) {
    stats.neutralCount += 1
  } else {
    stats.negativeCount += 1
  }
});
