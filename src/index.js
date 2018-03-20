import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './components/Home';
import Interest from './components/Interest';
import Layout from './components/Layout';
const store = createStore();
const app = document.getElementById('spring-it');
ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" name="settings" store={store} component={Home}></Route>
            <Route path="/interest" name="settings" store={store} component={Interest}></Route>
        </div>
    </Router>,
  app);