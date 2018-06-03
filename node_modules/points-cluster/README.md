[![Build Status](https://travis-ci.org/istarkov/supercluster.svg?branch=master)](https://travis-ci.org/istarkov/supercluster)

A fork of https://github.com/mapbox/supercluster library,

Added points array to cluster.

Removed lat lng transformations on Add.

```js
const cl = supercluster([
  { lat: 10, lng: 10 },
  { lat: 10.1, lng: 10.1 },
  { lat: 12, lng: 12 },
  { lat: 84, lng: 179 },
]);

const r = cl({ bounds: { nw: { lat: 85, lng: -180 }, se: { lat: -85, lng: 180 } }, zoom: 2 });
```
