lruly
-----

  Implements an LRU cache.

```js
var lruly = require('lruly');

var cache = lruly();
cache.add('foo', 'hello world');
```

## Installation

  $ npm install -g lruly

## Quick Start

  Create the LRU cache and set `maxEntries`:

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

  Remove the entiry by key:

```js
cache.remove('module');
```

  Get the number of entries in the cache:

```js
cache.len();
```
