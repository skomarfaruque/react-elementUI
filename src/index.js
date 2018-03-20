import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store';
import Home from './components/Home';
const store = createStore();
ReactDOM.render(<Home store={store}/>, document.getElementById('spring-it'));