import React, {PropTypes, Component} from 'react';
const ReactHighcharts = require('react-highcharts');
import { connect } from 'react-redux';
import moment from 'moment';

class SplineChart extends Component {
  shouldComponentUpdate(nextProps, nextState) {
      return false;
  }
  componentWillUnmount() {
      if (this.intervalFunc) {
          clearInterval(this.intervalFunc);
      }
  }
  render() {
    let self = this;
    let config = {
        chart: {
           type: 'spline',
           animation: ReactHighcharts.Highcharts.svg, // don't animate in old IE
           marginRight: 10,
           events: {
               load: function () {

                   // set up the updating of the chart each second
                   var series = this.series[0];

                   self.intervalFunc = setInterval(function () {                       var x = (new Date()).getTime(), // current time
                           y = self.props.numFraud;
                       series.addPoint([x, y], true, true);
                   }, 2000);
               }
           }
       },
       title: {
           text: 'Live number fraud'
       },
       xAxis: {
           type: 'datetime',
           tickPixelInterval: 150,
           labels: {
               formatter: function() {
                   return moment.unix(this.value/1000).format("h:mm:ss");
               }
           }
       },
       yAxis: {
           title: {
               text: 'Value'
           },
           plotLines: [{
               value: 0,
               width: 1,
               color: '#808080'
           }]
       },
       tooltip: {
           formatter: function () {
               return '<b>' + this.series.name + '</b><br/>' +
                    this.y;
           }
       },
       legend: {
           enabled: false
       },
       exporting: {
           enabled: false
       },
       series: [{
           name: 'Live number fraud',
           data: (function () {
               // generate an array of random data
               var data = [],
                   time = (new Date()).getTime(),
                   i;
               let max = 3;
               let min = 0;
               for (i = -190; i <= 0; i += 1) {
                   data.push({
                       x: time + i * 1000,
                       y: i >= -19? Math.round(Math.random() * (max - min) + min): 0
                   });
               }

               return data;
           }())
       }]
   };
    return (
       <div>
           <ReactHighcharts config = {config}></ReactHighcharts>
       </div>
    );
  }
};

function mapStateToProps(state) {
    // console.log(state.transactionList.isLoading);
    return {
        numFraud: state.transactionList.numFraud
    }
}

export default connect(mapStateToProps, null)(SplineChart);
