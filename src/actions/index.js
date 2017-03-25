import axios from 'axios';
import moment from 'moment';

export const FETCH_TRANSACTION = "FETCH_TRANSACTION";
export const FILTER_TRANSACTION = "FILTER_TRANSACTION";
export const REQUEST_FILTER = "REQUEST_FILTER";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";
export const REQUEST_MAP_DATA = "REQUEST_MAP_DATA";

const BASE_URL = '/';
// const FETCH_MAP_TRANSACTION_URL = BASE_URL + '';
// const FETCH_TRANSACTION_URL = BASE_URL + '';
const FETCH_TRANSACTION_URL = 'http://54.169.172.238:8080/region_query';
const FETCH_MAP_TRANSACTION_URL = 'http://54.169.172.238:8080/transactions_map';

export function addMessage(message, messClass) {
    return {
        type: ADD_MESSAGE,
        message,
        messClass
    }
}

export function clearMessage() {
    return {
        type: CLEAR_MESSAGE
    }
}

const fetchMapTransactionSuccess = (response, filters) => {
    console.log("fetchSuccess");
    return {
        type: FETCH_TRANSACTION,
        data: response.data,
        filters
    }
};

export function fetchTransaction(filters) {
    return function(dispatch) {
        axios.get(FETCH_MAP_TRANSACTION_URL)
            .then((response)=>{
                dispatch(fetchMapTransactionSuccess(response, filters));
                dispatch(addMessage("Data received at " + moment().format("dddd, MMMM Do YYYY, h:mm:ss a"), "success"));
            }).catch((error) => {
                console.log(error);
                dispatch(addMessage("Can't receive transactions, please try again later!", "danger"));
            });
    }
};

const filterTransactionSuccess = (response, filters) => {
    console.log("filterSuccess");
    return {
        type: FILTER_TRANSACTION,
        data: response.data,
        filters
    }
};

export function filterTransaction(filters) {
    let queryStr = '';
    for (let key in filters) {
        queryStr += key + "=" + filters[key] + '&';
    }
    return function(dispatch) {
        axios.get(FETCH_TRANSACTION_URL + '?' + queryStr)
            .then((response)=>{
                dispatch(filterTransactionSuccess(response, filters));
                dispatch(clearMessage());
            }).catch((error) => {
                console.log(error);
                dispatch(addMessage("Can't receive transactions, please try again later!", "danger"));
            });
    }
}

export function requestFilter() {
    return {
        type: REQUEST_FILTER
    }
}

export function requestMapData() {
    return {
        type: REQUEST_MAP_DATA
    }
}
