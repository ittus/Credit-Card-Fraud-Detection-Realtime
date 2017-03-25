import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import { Row } from 'react-bootstrap';
import SimpleMarker from './SimpleMarker';
import ClusterMap from './ClusterMap';

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

export default class SimpleMap extends Component {
  static defaultProps = {
    center: {lat: 39.8, lng: -99},
    zoom: 5
  };

  getMarkerList() {
      return this.props.transactions.map(function(marker, index) {
          return (
              <SimpleMarker lat={marker.lat} lng={marker.lng} text={'A'} fraud={marker.fraud} key={marker.id}/>
          )
      });
  }

  // render() {
  //   //   console.log(this.getMarkerList());
  //
  //   return (
  //     <GoogleMapReact
  //       bootstrapURLKeys={{
  //           key: 'AIzaSyA4bAq5M2WWcQkv0RDpoIIF0Aywocv0qxY',
  //           style: styleCss
  //       }}
  //       options={{styles: styleCss}}
  //       defaultCenter={this.props.center}
  //       defaultZoom={this.props.zoom}>
  //         {this.getMarkerList()}
  //     </GoogleMapReact>
  //   );
  // }
  render() {
    //   console.log(this.getMarkerList());
     let fraudData = [];
     let nonFraudData = [];
     if (this.props.transactions && this.props.transactions.length > 0) {
         for (let idx in this.props.transactions) {
            //  console.log("ERROR", this.props.transactions[idx]);
             if (this.props.transactions[idx].fraud != 0) {
                 fraudData.push(this.props.transactions[idx]);
             } else {
                 nonFraudData.push(this.props.transactions[idx]);
             }
         }
     }
    return (
      <ClusterMap
        bootstrapURLKeys={{
            key: 'AIzaSyA4bAq5M2WWcQkv0RDpoIIF0Aywocv0qxY'
        }}
        defaultCenter={this.props.center}
        markers={nonFraudData}
        markersFraud = {fraudData}
        totalPoint={this.props.totalPoint}
        clusterRadius={(this.props.totalPoint && this.props.totalPoint > 200) ? (this.props.totalPoint * 0.05): 30}
        defaultZoom={this.props.zoom}>

      </ClusterMap>
    );
  }
}
