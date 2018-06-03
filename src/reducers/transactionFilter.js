import { FILTER_TRANSACTION, REQUEST_FILTER } from '../actions/index';

const data = [
    {
        id: 10,
        lat: 39.1,
        lng: -95.1,
        account: 1,
        fraud: false,
        name: "California",
    },
    {
        id: 12,
        lat: 39.2,
        lng: -95.2,
        account: 2,
        fraud: false,
        name: "California",
    },
    {
        id: 13,
        lat: 39.3,
        lng: -95.4,
        account: 3,
        fraud: true,
        name: "California",
    },
    {
        id: 4,
        lat: 39.5,
        lng: -95.1,
        account: 4,
        fraud: false,
        name: "California",
    },
    {
        id: 5,
        lat: 36.3,
        lng: -98.4,
        account: 5,
        fraud: true,
        name: "California",
    },
    {
        id: 6,
        lat: 40.5,
        lng: -90.1,
        account: 6,
        fraud: false,
        name: "California",
    },
    {
        id: 7,
        lat: 31.3,
        lng: -92.4,
        account: 7,
        fraud: true,
        name: "California",
    },
    {
        id: 8,
        lat: 39.5,
        lng: -88.1,
        account: 8,
        fraud: false,
        name: "California",
    },
];
const INITIAL_STATE = {
    transactionsFilter: [],
    filters: null,
    totalPage: 0,
    loading: true,
    numFraud: 0,
    nonFraud: 0
};


function mapData(data) {
    // if (data) {
    //     return data.map(function(item, idx) {
    //         return {
    //             id: item.ID,
    //             city: item.City,
    //             county: item.County,
    //             fraud: item.Fraud,
    //             lat: item.Latitude,
    //             lng: item.Longitude,
    //             name: item.Name,
    //             time: item.Time,
    //             value: item.Value,
    //             account: item.Account
    //         }
    //     });
    // } else {
    //     return [];
    // }
    return data? data: [];
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
    case FILTER_TRANSACTION:
        console.log(action);
        let data = mapData(action.data.Transactions);
        let numFraud = action.data.Fraud?action.data.Fraud: 0;
        let nonFraud = action.data.NonFraud?action.data.NonFraud: 0;
        let totalPage = Math.ceil((numFraud + nonFraud) / 10);
        console.log("totalPage", totalPage);
        return { ...state, transactionsFilter: data, totalPage: totalPage, loading: false,
                numFraud: numFraud, nonFraud: nonFraud};
        break;
    case REQUEST_FILTER:
        return {...state, loading: true};
        break;
    default:
        return state;
    }
}
