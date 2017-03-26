import { FETCH_TRANSACTION, REQUEST_MAP_DATA } from '../actions/index';

let data = [
    {
        id: 10,
        lat: 39.1,
        lng: -95.1,
        fraud: false
    },
    {
        id: 12,
        lat: 39.2,
        lng: -95.2,
        fraud: false
    },
    {
        id: 13,
        lat: 39.3,
        lng: -95.4,
        fraud: true
    },
    {
        id: 4,
        lat: 39.5,
        lng: -95.1,
        fraud: false
    },
    {
        id: 5,
        lat: 36.3,
        lng: -98.4,
        fraud: true
    },
    {
        id: 6,
        lat: 40.5,
        lng: -90.1,
        fraud: false
    },
    {
        id: 7,
        lat: 31.3,
        lng: -92.4,
        fraud: true
    },
    {
        id: 8,
        lat: 39.5,
        lng: -88.1,
        fraud: false
    },
];

// for (let i = 0; i < 100; i++) {
//     let obj = {
//             id: (i+100),
//             lat: 39.1 + (-10 + Math.random()*20),
//             lng: -95.1 + (-20 + Math.random()*30),
//             fraud: Math.random() > 0.9? -1: 0
//     };
//     data.push(obj);
// }

const INITIAL_STATE = { transactions: [], filters: null, isLoading: false, numFraud: 0, nonFraud: 0};


function mapData(data) {
    // if (data) {
    //     return data.map(function(item, idx) {
    //         return {
    //             id: item.ID,
    //             fraud: item.Fraud,
    //             lat: item.Latitude,
    //             lng: item.Longitude,
    //
    //         }
    //     });
    // } else {
    //     return [];
    // }
    return data;
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
    case FETCH_TRANSACTION:
        // action.data = {
        //     NonFraud: 0,
        //     Fraud: 0,
        //     Transactions: [
        //         {
        //             ID: 1,
        //             Fraud: -1,
        //             Latitude: 34,
        //             Longitude: -95
        //         }
        //     ]
        // };
        // let returnData = data; // test
        let returnData = action.data.Transactions? mapData(action.data.Transactions): [];
        let numFraud = action.data.Fraud?action.data.Fraud: 0;
        let nonFraud = action.data.NonFraud?action.data.NonFraud: 0;
        // console.log("returnData", returnData);
        // return { ...state, transactions: action.payload.data };
        return { ...state, transactions: returnData, isLoading: false, numFraud: numFraud, nonFraud: nonFraud };
        break;
    case REQUEST_MAP_DATA:
        return { ...state, isLoading: true };
        break;
    default:
        return state;
    }
}
