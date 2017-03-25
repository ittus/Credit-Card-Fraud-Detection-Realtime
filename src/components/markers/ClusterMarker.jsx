import React from 'react';
import compose from 'recompose/compose';
import defaultProps from 'recompose/defaultProps';
import withPropsOnChange from 'recompose/withPropsOnChange';
import pure from 'recompose/pure';
import { Motion, spring } from 'react-motion';


export const clusterMarker = ({
  styles, text,
  defaultMotionStyle, motionStyle, totalPoint, fraud
}) => (
  <Motion
    defaultStyle={defaultMotionStyle}
    style={motionStyle}
  >
  {
    ({ scale }) => {
        let markerColor = "#30cb00";
        let borderColor = "#30cb00";
        let blinkClass = '';

        if (fraud && (fraud != 0) && text > 5) {
            markerColor = '#DE1717';
            borderColor = "#DE1717";
            blinkClass = 'blink_me';
        }
      let K_WIDTH = 16;
      let K_HEIGHT = 16;
      let factor = 0.2;
      if (totalPoint && (totalPoint != 0)) {
          if (totalPoint < 200) {
              factor = 0.4;
          }
          K_WIDTH = (1 + text * factor) * K_WIDTH;
          K_HEIGHT = (1 + text * factor) * K_HEIGHT;
      }
      console.log(K_WIDTH);
      return (<div
            className={styles.marker + ' ' + blinkClass}
            style={{
              transform: `translate3D(0,0,0) scale(${scale}, ${scale})`,
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
            }}>
            <div className={text}>
              {text}
            </div>
        </div>);
    }
  }
  </Motion>
);

export const clusterMarkerHOC = compose(
  defaultProps({
    text: '0',
    styles: {},
    initialScale: 0.6,
    defaultScale: 1,
    hoveredScale: 1.15,
    hovered: false,
    stiffness: 320,
    damping: 7,
    precision: 0.001,
  }),
  // pure optimization can cause some effects you don't want,
  // don't use it in development for markers
  // pure,
  withPropsOnChange(
    ['initialScale'],
    ({ initialScale, defaultScale, $prerender }) => ({
      initialScale,
      defaultMotionStyle: { scale: $prerender ? defaultScale : initialScale },
    })
  ),
  withPropsOnChange(
    ['hovered'],
    ({
      hovered, hoveredScale, defaultScale,
      stiffness, damping, precision,
    }) => ({
      hovered,
      motionStyle: {
        scale: spring(
          hovered ? hoveredScale : defaultScale,
          { stiffness, damping, precision }
        ),
      },
    })
  )
);

export default clusterMarkerHOC(clusterMarker);
