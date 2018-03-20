import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store';
import Slider from './components/Slider';
const store = createStore();
ReactDOM.render(<Slider store={store}/>, document.getElementById('spring-it'));