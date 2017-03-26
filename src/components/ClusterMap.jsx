import React from 'react';
import compose from 'recompose/compose';
import defaultProps from 'recompose/defaultProps';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import withPropsOnChange from 'recompose/withPropsOnChange';
import GoogleMapReact from 'google-map-react';
import ClusterMarker from './markers/ClusterMarker';
import SimpleMarker from './SimpleMarker';
import supercluster from 'points-cluster';

var defaultCenterPointer = {
    lat: 39.8, lng: -99
}

let styleCss = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#46bcec"
            },
            {
                "visibility": "on"
            }
        ]
    }
];

export const gMap = ({
  style, hoverDistance, options,
  mapProps: { center, zoom },
  onChange, onChildMouseEnter, onChildMouseLeave,
  clusters, totalPoint, fraudClusters
}) => (
  <GoogleMapReact
    style={style}
    options={{
        styles: styleCss,
        minZoom: 5,
        maxZoom: 15,
    }}
    bootstrapURLKeys={{
        key: 'AIzaSyA4bAq5M2WWcQkv0RDpoIIF0Aywocv0qxY'
    }}
    hoverDistance={hoverDistance}
    center={center}
    zoom={zoom}
    onChange={onChange}
    onChildMouseEnter={onChildMouseEnter}
    onChildMouseLeave={onChildMouseLeave}
  >
    {

      clusters
        .map(({ ...markerProps, id, numPoints }) => (
          numPoints === 1
            ? <SimpleMarker key={id} {...markerProps} fraud={0}/>
        : <ClusterMarker key={id} {...markerProps} totalPoint={totalPoint} fraud={0}/>
        ))
    }
    {

      fraudClusters
        .map(({ ...markerProps, id, numPoints }) => (
          numPoints === 1
            ? <SimpleMarker key={id} {...markerProps} fraud={-1} />
        : <ClusterMarker key={id} {...markerProps} totalPoint={totalPoint} fraud={-1}/>
        ))
    }
  </GoogleMapReact>
);

export const gMapHOC = compose(
  defaultProps({
    clusterRadius: 30,
    hoverDistance: 30,
    options: {
      minZoom: 5,
      maxZoom: 15,
    },
    style: {
      position: 'relative',
      margin: 0,
      padding: 0,
      flex: 1,
    },
    totalPoint: 0
  }),
  // withState so you could change markers if you want
  // withState(
  //   'markers',
  //   'setMarkers',
  //   markersData
  // ),
  withState(
    'hoveredMarkerId',
    'setHoveredMarkerId',
    -1
  ),
  withState(
    'mapProps',
    'setMapProps',
    {
      center: defaultCenterPointer,
      zoom: 5,
    }
  ),
  // describe events
  withHandlers({
    onChange: ({ setMapProps }) => ({ center, zoom, bounds }) => {
      setMapProps({ center, zoom, bounds });
    },

    onChildMouseEnter: ({ setHoveredMarkerId }) => (hoverKey, { id }) => {
      setHoveredMarkerId(id);
    },

    onChildMouseLeave: ({ setHoveredMarkerId }) => (/* hoverKey, childProps */) => {
      setHoveredMarkerId(-1);
    },
  }),
  // precalculate clusters if markers data has changed
  withPropsOnChange(
    ['markers'],
    ({ markers = [], clusterRadius, options: { minZoom, maxZoom } }) => ({
      getCluster: supercluster(
        markers,
        {
          minZoom, // min zoom to generate clusters on
          maxZoom, // max zoom level to cluster the points on
          radius: clusterRadius, // cluster radius in pixels
        }
      ),
    })
  ),
  // get clusters specific for current bounds and zoom
  withPropsOnChange(
    ['mapProps', 'getCluster'],
    ({ mapProps, getCluster }) => ({
      clusters: mapProps.bounds
        ? getCluster(mapProps)
          .map(({ wx, wy, numPoints, points }) => ({
            lat: wy,
            lng: wx,
            text: numPoints,
            numPoints,
            id: `${numPoints}_${points[0].id}`,
          }))
        : [],
    })
  ),
  // set hovered
  withPropsOnChange(
    ['clusters', 'hoveredMarkerId'],
    ({ clusters, hoveredMarkerId }) => ({
      clusters: clusters
        .map(({ ...cluster, id }) => ({
          ...cluster,
          hovered: id === hoveredMarkerId,
        })),
    })
  ),
  // precalculate clusters if markers data has changed
  withPropsOnChange(
    ['markersFraud'],
    ({ markersFraud = [], clusterRadius, options: { minZoom, maxZoom } }) => ({
      getFraudCluster: supercluster(
        markersFraud,
        {
          minZoom, // min zoom to generate clusters on
          maxZoom, // max zoom level to cluster the points on
          radius: clusterRadius, // cluster radius in pixels
        }
      ),
    })
  ),
  // get clusters specific for current bounds and zoom
  withPropsOnChange(
    ['mapProps', 'getFraudCluster'],
    ({ mapProps, getFraudCluster }) => ({
      fraudClusters: mapProps.bounds
        ? getFraudCluster(mapProps)
          .map(({ wx, wy, numPoints, points }) => ({
            lat: wy,
            lng: wx,
            text: numPoints,
            numPoints,
            id: `${numPoints}_${points[0].id}`,
          }))
        : [],
    })
  ),
  // set hovered
  withPropsOnChange(
    ['fraudClusters', 'hoveredMarkerId'],
    ({ fraudClusters, hoveredMarkerId }) => ({
      fraudClusters: fraudClusters
        .map(({ ...cluster, id }) => ({
          ...cluster,
          hovered: id === hoveredMarkerId,
        })),
    })
  ),
);

export default gMapHOC(gMap);
