import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Landing from './components/Landing.jsx';
import TransactionList from './components/TransactionList';

export default (
    <Route path='/' components={App} >
        <IndexRoute component={Landing} />
        <Route path="/details" component={TransactionList} />
    </Route>
);
