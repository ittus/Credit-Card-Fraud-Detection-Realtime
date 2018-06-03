"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

// longitude/latitude to spherical mercator in [0..1] range
var lngX = exports.lngX = function lngX(lng) {
  return lng / 360 + 0.5;
};

var latY = exports.latY = function latY(lat) {
  var sin = Math.sin(lat * Math.PI / 180);
  var y = 0.5 - 0.25 * Math.log((1 + sin) / (1 - sin)) / Math.PI;

  return y < 0 ? 0 : y > 1 ? 1 : y;
};

var TILE_SIZE = 256;

var screenDist2LatLngDist = exports.screenDist2LatLngDist = function screenDist2LatLngDist(dist, zoom) {
  var scale = Math.pow(2, zoom);
  var distW = dist / scale / TILE_SIZE;
  var distLatLng = distW * 360;
  return distLatLng;
};

/*
// spherical mercator to longitude/latitude
export const xLng = (x) => (x - 0.5) * 360;

export const yLat = (y) =>
  360 * Math.atan(Math.exp((180 - y * 360) * Math.PI / 180)) / Math.PI - 90;
*/