import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {FormGroup, ControlLabel, FormControl, Alert, Row, Col} from 'react-bootstrap';
import { connect } from 'react-redux';

import SimpleMarker from './SimpleMarker';
import SimpleMap from './SimpleMap';
import { fetchTransaction, clearMessage, requestMapData } from '../actions';
import SplineChart from './SplineChart';

class Landing extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        var self = this;
        this.callMapDataInteval = setInterval(function() {
            if (!self.props.isLoading) {
                self.props.requestMapData();
                self.props.fetchTransaction();
            } else {
                console.log("Already calling");
            }
        }, 1000);
    }

    componentWillUnmount() {
        if (this.callMapDataInteval) {
            clearInterval(this.callMapDataInteval);
        }
    }


    handleAlertDismiss() {
        this.props.clearMessage();
    }

  render() {
      let message = '';
      if (this.props.message && this.props.message.message) {
          message = this.props.message.message;
      }
      return (
          <div className="map-container">
              <Row className="summary-element">
                  <Col xs={12} sm={3}>
                    <p className="text-center">Total transactions: {this.props.transactions? this.props.transactions.length: 0}</p>
                  </Col>
                  <Col xs={12} sm={3}>
                      <p className="text-center">Total Fraud: {this.props.numFraud? this.props.numFraud: 0}</p>
                  </Col>
                  <Col xs={12} sm={3}>
                    <p className="text-center">Total Non-fraud: {this.props.nonFraud? this.props.nonFraud: 0}</p>
                  </Col>
                  <Col xs={12} sm={3}>
                      <p>{message}</p>
                  </Col>

              </Row>
              <div></div>
              <SimpleMap className="map-component" transactions={this.props.transactions}
                  totalPoint={this.props.transactions? this.props.transactions.length: 0}/>

              <div className="margin-top-md">
                  <SplineChart />
              </div>
          </div>
      )
  }
}
function mapStateToProps(state) {
    // console.log(state.transactionList.isLoading);
    return {
        transactions: state.transactionList.transactions,
        message: state.message,
        isLoading: state.transactionList.isLoading,
        numFraud: state.transactionList.numFraud,
        nonFraud: state.transactionList.nonFraud
    }
}

export default connect(mapStateToProps, {fetchTransaction, requestMapData})(Landing);
