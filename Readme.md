lruly
-----

  Implements an [LRU](http://en.wikipedia.org/wiki/Cache_algorithms#Least_Recently_Used) cache.

```js
var lruly = require('lruly');

var cache = lruly();
cache.add('foo', 'hello world');
```

## Installation

```sh
$ npm install -g lruly
```

## Quick Start

  Create the LRU cache and set `maxEntries`,
  if `maxEntries` is zero, the cache has no limit:

```js
var cache = lruly(8964);
```

  Add a entiry:

```js
cache.add('module', { version: '0.0.1', name: 'lruly' });
```

  Get the entry's value:

```js
cache.get('module'); // { version: '0.0.1', name: 'lruly' }
```

  Remove the entry by key:

```js
cache.on('evicted', function (key, value) { /* do something */ });

cache.remove('module');
```

  Get the number of entries in the cache:

```js
cache.len();
```

  Clean the cache:

```js
cache.clean();
```

## Running Tests

To run the test suite first invoke the following command within the repo, installing the development dependencies:

    $ npm install

then run the tests:

    $ make test

### MIT License
