import React, { Component } from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import moment from 'moment';
import {FormGroup, ControlLabel, FormControl, Alert, Row, Col} from 'react-bootstrap';

import usStateList from '../../data/us-state';

import { filterTransaction, requestFilter, clearMessage } from '../actions';

class TransactionList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            region: 'California'
        }
    }
    static defaultProps = {
      totalPage: 0,
      loading: true
    };


    componentWillMount() {
        this.fetchData(1, 10, this.state.region);
    }

    componentWillReceiveProps(nextProps) {

    }

    regionChange(event, data) {
        console.log(event.target.value);
        this.setState({
            region: event.target.value
        });
        this.fetchData(1, 10, event.target.value);
    }

    fetchData(page=1, perPage=10, region='') {
        this.props.requestFilter();
        this.props.filterTransaction({
            page,
            per_page: perPage,
            region
        });
    }

  handleAlertDismiss() {
      this.props.clearMessage();
  }
  render() {
    //
    //   data={this.state.data} // Set the rows to be displayed
    //   pages={this.state.pages} // Display the total number of pages
    //   loading={this.state.loading} // Display the loading overlay when we need it
    //   onChange={this.fetchData} // Request new data when things change
    console.log(this.props.data);
    let addressFields = ["county", "city", "name"];

    const columns = [
        {
          header: 'Transaction ID',
          ancessor: 'id',
          render: row => {
              return <div>{row.row.id + ''}</div>
          }
        },
        {
          header: 'Account',
          ancessor: 'account',
          render: row => {
              return <div>{row.row.account + ''}</div>
          }
        },
        {
          header: 'Address',
          render: row => {
              let address = '';
              for (let idx in addressFields) {
                  if (addressFields[idx] in row.row) {
                      address += row.row[addressFields[idx]];
                  }
              }
              return <div>{address}</div>
          }
        },
        {
          header: 'Time',
          accessor: 'time',
          render: row => {
              return <div>{moment.unix(row.row.time).fromNow()}</div>
          }
        },

        {
          header: 'Value',
          accessor: 'value',
          render: row => {
              return <div>{'$' + row.row.value}</div>
          }
        },{
          header: 'Fraud',
          accessor: 'fraud',
          render: row => {
              return (
                  <div>
                      <span style={{
                          color: row.row.fraud ? '#ff2e00': 'green',
                          transition: 'all .3s ease'
                        }}>
                          &#x25cf;
                        </span>
                        &nbsp;
                      {row.row.fraud ?'True': 'False'}
                  </div>);
          }
      }
    ];
    let self = this;
    let message = '';
    if (this.props.message && this.props.message.message) {
        message = <Alert bsStyle={this.props.message.messClass} onDismiss={this.handleAlertDismiss.bind(this)}>
            {this.props.message.message}
      </Alert>;
    }
    return (
        <div className="container">
            <h4 className="text-center">Transaction List</h4>
            <form>
                <FormGroup controlId="formControlsSelect">
                 <div className="col-xs-12 col-sm-6 margin-bottom-md padding-left-none">
                     <ControlLabel>Select State</ControlLabel>
                     <FormControl componentClass="select" placeholder="Select Region"
                         onChange={this.regionChange.bind(this)}>
                         {usStateList.map(function(data, idx) {
                             let selected = data.name==self.state.region? 'selected': '';
                             return (<option selected={selected} value={data.name}>{data.name}</option>);
                         })}

                       <option value="other">...</option>
                     </FormControl>
                 </div>
               </FormGroup>
            </form>
            <div className="clearfix"></div>
            <Row className="margin-bottom-md">
                <Col xs={12} sm={6} >Total Non-Fraud: {this.props.nonFraud}</Col>
                <Col xs={12} sm={6}><span className="pull-right">Total Fraud: {this.props.numFraud}</span></Col>
            </Row>
            <div className="clearfix"></div>
            <ReactTable
                className="-striped -highlight text-center"
                columns={columns}
                data={this.props.data}
                defaultPageSize={10}
                manual
                pages={this.props.totalPage}
                loading={this.props.loading}
              />
          <div className="margin-top-md">
            {message}
          </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        data: state.transactionsFilter.transactionsFilter,
        totalPage: state.transactionsFilter.totalPage,
        loading: state.transactionsFilter.loading,
        message: state.message,
        numFraud: state.transactionsFilter.numFraud,
        nonFraud: state.transactionsFilter.nonFraud
    }
}

export default connect(mapStateToProps, {filterTransaction, requestFilter, clearMessage})(TransactionList);
