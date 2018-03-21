import React from 'react';
import {render} from 'react-dom';
import createStore from './store';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import PendingOrders from './components/PendingOrders';
import Layout from './components/Layout';
const store = createStore();
const app = document.getElementById('spring-it');
render(
    <Router>
        <div>
            <Route exact path="/" name="Login" store={store} component={Login}></Route>
            <Route exact path="/home" name="Home" store={store} component={Home}></Route>
            <Route path="/pending-orders" name="Pending orders" store={store} component={PendingOrders}></Route>
        </div>
    </Router>,
  app);