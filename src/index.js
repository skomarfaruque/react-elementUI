import React from 'react';
import { render } from 'react-dom';
import createStore from './store';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import OrderFirstStep from './components/OrderFirstStep';
import Login from './components/Login';
import PendingOrders from './components/PendingOrders';
import Layout from './components/Layout';
import Home from './components/Home';
import { Provider } from 'react-redux'
const store = createStore();
const app = document.getElementById('spring-it');
render(
    <Provider store={store}>
    <Router>
        <div>
            <Route exact path="/" name="Login" component={Login}></Route>
            <Route exact path="/order-first-step" name="Order first step" component={OrderFirstStep}></Route>
            <Route exact path="/home" name="type" component={Home}></Route>
            <Route path="/pending-orders" name="Pending orders"  component={PendingOrders}></Route>
        </div>
    </Router>
    </Provider>
    ,
  app);