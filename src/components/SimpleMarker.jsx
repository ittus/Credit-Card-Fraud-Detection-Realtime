import React, {PropTypes, Component} from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';


export default class SimpleMarker extends Component {
  static propTypes = {
    text: PropTypes.string
  };

  static defaultProps = {};

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    const K_WIDTH = 16;
    const K_HEIGHT = 16;
    let markerColor = "#30cb00";
    let borderColor = "#30cb00";
    let blinkClass = '';

    if (this.props.fraud && (this.props.fraud != 0)) {
        markerColor = '#DE1717';
        borderColor = "#FF8585";
        blinkClass = 'blink_me';
    }

    borderColor = markerColor;
    const placeStyle = {
        position: 'absolute',
        width: K_WIDTH,
        height: K_HEIGHT,
        left: -K_WIDTH / 2,
        top: -K_HEIGHT / 2,

        border: '5px solid ' + borderColor,
        borderRadius: K_HEIGHT,
        backgroundColor: markerColor,
        textAlign: 'center',
        color: '#3f51b5',
        fontSize: 16,
        fontWeight: 'bold',
        padding: 4,
        opacity: 0.5,
    };

    return (
       <div className={blinkClass} style={placeStyle}>

       </div>
    );
  }
}
