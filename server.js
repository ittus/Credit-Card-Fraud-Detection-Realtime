'use strict';

const express = require('express');
const app = express();
const path = require('path');

app.get('/api/transactions_map', (req, res) => {
    let data = [];
    let numFraud = 0;
    let nonFraud = 0;
    let numRand = Math.floor(Math.random() * 500) + 10;
    for (let i = 0; i < numRand; i++) {
        let obj = {
                id: (i+100),
                lat: 39.1 + (-10 + Math.random()*20),
                lng: -95.1 + (-20 + Math.random()*30),
                fraud: Math.random() > 0.9? 1: 0
        };

        obj.fraud == 1 ? (numFraud += 1) : (nonFraud += 1)
        data.push(obj);
    }
    res.json({
        Transactions: data,
        Fraud: numFraud,
        NonFraud: nonFraud

    });
});

app.get('/api/region_query', (req, res) => {
    let data = [];
    let numFraud = 0;
    let nonFraud = 0;
    for (let i = 0; i < 10; i++) {
        let obj = {
                id: (i+100),
                city: "Test city",
                county: "Random county",
                name: "Name",
                time: new Date().getTime()/1000,
                value: (Math.random() * 100 + 100).toFixed(2),
                account: (i + 1000),
                lat: 39.1 + (-10 + Math.random()*20),
                lng: -95.1 + (-20 + Math.random()*30),
                fraud: Math.random() > 0.9? 1: 0
        };

        obj.fraud == 1 ? (numFraud += 1) : (nonFraud += 1)
        data.push(obj);
    }
    res.json({
        Transactions: data,
        Fraud: numFraud,
        NonFraud: nonFraud

    });
});

app.use('/', express.static(__dirname + '/'));


app.get('/*', (req, res) => {
  res.status(200).sendFile(path.join(__dirname + '/index.html'));
});

// Start the server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
