/**
 * Module dependencies.
 */

var inherits = require('inherits')
  , EventEmitter = require('emitter');

/**
 * Expose `createLRUCache`.
 */

exports = module.exports = createLRUCache

function createLRUCache(maxEntries) {
  if (!maxEntries || maxEntries <= 0) {
    maxEntries = Infinity;
  }
  return new Cache(maxEntries, [], {});
}

/**
 *
 * Cache is an LRU cache.
 *
 * maxEntries:
 *    MaxEntries is the maximum number of cache entries.
 *    If maxEntries is zero, the cache has no limit.
 *
 * @param {Number} maxEntries
 * @param {Array} list
 * @param {Object} cache
 * @api private
 */

function Cache(maxEntries, list, cache) {
  EventEmitter.call(this);
  this.maxEntries = maxEntries;
  this.list = list;
  this.cache = cache;
}

inherits(Cache, EventEmitter);

/**
 * Add adds a value to the cache.
 *
 * @param {String} key
 * @param {Mixed} value
 */

Cache.prototype.add = function (key, value) {
  if (!this.cache) {
    this.cache = {};
    this.list = [];
  }
  var ele;
  if (this.cache.hasOwnProperty(key)) {
    ele = this.cache[key];
    this._moveToFront(ele);
    return;
  }
  ele = new Entry(key, value);
  var len = this.list.unshift(ele);
  this.cache[key] = ele;
  if (this.maxEntries !== 0 && len > this.maxEntries) {
    this.removeOldest();
  }
};

/**
 * Get looks up a key's value from the cache.
 */

Cache.prototype.get = function (key) {
  if (!this.cache) {
    return;
  }
  if (this.cache.hasOwnProperty(key)) {
    var ele = this.cache[key];
    this._moveToFront(ele);
    return ele.value;
  }
  return;
};

/**
 * Removes the provided key from the cache.
 *
 * @param {String} key
 */

Cache.prototype.remove = function (key) {
  if (!this.cache) {
    return;
  }
  if (this.cache.hasOwnProperty(key)) {
    var ele = this.cache[key];
    this.removeElement(ele);
  }
};

/**
 * Removes the oldest item from the cache.
 */

Cache.prototype.removeOldest = function () {
  if (!this.cache) {
    return;
  }
  var ele = this.list[this.list.length - 1];
  if (ele) {
    this.removeElement(ele);
  }
};

/**
 * Removes element from the cache.
 *
 * @param {Mixed} element
 * @api private
 */

Cache.prototype.removeElement = function (ele) {
  var index = this.list.indexOf(ele);
  if (index >= 0) {
    this.list.splice(index, 1);
    delete this.cache[ele.key];
    this.emit('evicted', ele.key, ele.value);
  }
};

/**
 * Len returns the number of items in the cache.
 */

Cache.prototype.len = function () {
  if (!this.cache) {
    return 0;
  }
  return this.list.length;
};

/**
 * Clean the cache.
 */

Cache.prototype.clean = function () {
  this.list = this.cache = null;
};

/**
 *  Element Move to front of the list.
 *
 * @param {Mixed} element
 * @api private
 */

Cache.prototype._moveToFront = function (ele) {
  var index = this.list.indexOf(ele);
  if (index >= 0) {
    this.list.splice(index, 1);
    this.list.unshift(ele);
  }
};

/**
 * Element
 *
 * @param {String} key
 * @param {Mixed} value
 * @api private
 */

function Entry(key, value) {
  this.key = key;
  this.value = value;
}
