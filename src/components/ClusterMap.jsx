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
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e9e9e9"
            }, {
                "lightness": 17
            }
        ]
    }, {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            }, {
                "lightness": 20
            }
        ]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }, {
                "lightness": 17
            }
        ]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            }, {
                "lightness": 29
            }, {
                "weight": 0.2
            }
        ]
    }, {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            }, {
                "lightness": 18
            }
        ]
    }, {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            }, {
                "lightness": 16
            }
        ]
    }, {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            }, {
                "lightness": 21
            }
        ]
    }, {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dedede"
            }, {
                "lightness": 21
            }
        ]
    }, {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            }, {
                "color": "#ffffff"
            }, {
                "lightness": 16
            }
        ]
    }, {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            }, {
                "color": "#333333"
            }, {
                "lightness": 40
            }
        ]
    }, {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }, {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f2f2f2"
            }, {
                "lightness": 19
            }
        ]
    }, {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#fefefe"
            }, {
                "lightness": 20
            }
        ]
    }, {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#fefefe"
            }, {
                "lightness": 17
            }, {
                "weight": 1.2
            }
        ]
    }
];

export const gMap = ({
  style, hoverDistance, options,
  mapProps: { center, zoom },
  onChange, onChildMouseEnter, onChildMouseLeave,
  clusters,
}) => (
  <GoogleMapReact
    style={style}
    options={{
        styles: styleCss,
        minZoom: 5,
        maxZoom: 15,
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
            ? <SimpleMarker key={id} {...markerProps} />
            : <ClusterMarker key={id} {...markerProps} />
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
);

export default gMapHOC(gMap);
