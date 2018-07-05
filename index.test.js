var stringSimilarity = require('string-similarity');
var groupWith = require('./index.js');

function isEqual (a, b) {
  return a === b;
}

function similarity (a, b) {
  return stringSimilarity.compareTwoStrings(a, b) > .5;
}

describe('Group', function () {
  test('should group equal elements', function () {
    var collection = [1, 2, 3, 4, 5, 1, 2, 3, 1, 2];
    var groupEqual = groupWith(isEqual, collection);
    expect(groupEqual).toEqual([
      [1, 1, 1],
      [2, 2, 2],
      [3, 3],
      [4],
      [5]
    ]);
  });

  test('should group by string similarity', function () {
    var collection = ['healed', 'edward', 'sealed', 'theatre'];
    var groupEqual = groupWith(similarity, collection);
    expect(groupEqual).toEqual([
      ["healed", "sealed"],
      ["edward"],
      ["theatre"]
    ]);
  });
});

describe('Errors', function () {
  test('should throw TypeError with incorrect `comparator` argument', function () {
    var incorrectCall = function () {
      groupWith('incorrectComparator', [1,2,3]);
    };
    expect(incorrectCall).toThrow(TypeError);
  });

  test('should throw TypeError with incorrect `collection` argument', function () {
    var incorrectCall = function () {
      groupWith(function() {}, 'incorrectCollection');
    };
    expect(incorrectCall).toThrow(TypeError);
  });
});
