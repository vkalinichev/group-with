/**
 *
 * @param {Function} comparator
 * @param {Array} collection
 * @returns {Array}
 */

function groupWith(comparator, collection) {

  if (typeof comparator !== 'function') {
    throw new TypeError('`comparator` should be a function')
  }

  if (!Array.isArray(collection)) {
    throw new TypeError('`collection` should be an Array')
  }

  var groups = [];
  var groupIndexes = [];
  var length = collection.length;

  for (var i = 0; i < length; i++) {
    if (groupIndexes[i] === undefined) {
      var group = [collection[i]];

      for (var j = i + 2; j < length; j++) {
        if (comparator(collection[i], collection[j])) {
          groupIndexes[i] = groupIndexes[j] = groups.length;
          group.push(collection[j]);
        }
      }

      groups.push(group);
    }
  }

  return groups;
}

module.exports = groupWith;
