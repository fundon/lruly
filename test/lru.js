var createLRUCache = require('../')
  , assert = require('assert')
  , should = require('should');

describe('lru', function () {
  it('should inherit from event emitter', function () {
    var lru = createLRUCache();
    lru.on('foo', function () {});
    lru.emit('foor');
  })
})

describe('lru.maxEntries', function () {
  it('should be initialized', function () {
    var lru = createLRUCache();
    lru.maxEntries.should.eql(Infinity);
  })

  it('should be Infinity', function () {
    var lru = createLRUCache(0);
    lru.maxEntries.should.eql(Infinity);
  })
})

describe('lru#add()', function () {
  it('should add entry', function () {
    var lru = createLRUCache();
    lru.add('foo', ['boo']);
    var entry = lru.list[0];
    entry.key.should.eql('foo');
    entry.value.should.eql(['boo']);
    entry.should.eql({ key: 'foo', value: ['boo'] });
  })

  it('should remove oldest entry', function () {
    var lru = createLRUCache(3);
    lru.add('a', 0);
    lru.add('b', 1);
    lru.add('c', 2);
    lru.add('d', 3);
    should.strictEqual(undefined, lru.get('a'));
  })
})

describe('lru#get()', function () {
  it('should return entry\'s value', function () {
    var lru = createLRUCache(3);
    lru.add('a', 0);
    lru.add('b', 1);
    lru.add('c', 2);
    lru.get('c').should.eql(2);
    lru.add('d', 3);
    lru.list[0].value.should.eql(3);
    lru.list[1].value.should.eql(2);
    lru.list[2].value.should.eql(1);
  })
})

describe('lru#remove()', function () {
  it('should return undefined', function () {
    var lru = createLRUCache();
    lru.add('a', 0);
    lru.add('b', 1);
    lru.add('c', 2);
    lru.remove('b');
    lru.list.length.should.eql(2);
    should.strictEqual(undefined, lru.get('b'));
  })
})

describe('lru#removeOldest()', function () {
  it('should remove oladest entry', function () {
    var lru = createLRUCache();
    lru.add('express', 'web framework');
    lru.add('mocha', 'test tool');
    lru.add('npm', 'node packages manager');
    lru.removeOldest();
    lru.list.should.eql([
        { key: 'npm', value: 'node packages manager' }
      , { key: 'mocha', value: 'test tool' }
    ]);
  })
})

describe('lru#len()', function () {
  it('should return number of cache entries', function () {
    var lru = createLRUCache(100)
      , len = 1000;
    for (; len--; ) {
      lru.add(len, Math.random() * len);
    }
    lru.len().should.eql(100);
  })
})
