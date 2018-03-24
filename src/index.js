import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import OrderFirstStep from './components/OrderFirstStep';
import Login from './components/Login';
import PendingOrders from './components/PendingOrders';
import Layout from './components/Layout';
import Home from './components/Home';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import {store, persistor} from './store';
const app = document.getElementById('spring-it');
render(
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <Router>
        <div>
            <Route exact path="/" name="Login" component={Login}></Route>
            <Route exact path="/order-first-step" name="Order first step" component={OrderFirstStep}></Route>
            <Route exact path="/home" name="type" component={Home}></Route>
            <Route path="/pending-orders" name="Pending orders"  component={PendingOrders}></Route>
        </div>
    </Router>
    </PersistGate>
    </Provider>
    ,
  app);