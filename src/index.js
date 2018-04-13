import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from "react-router-dom"
import OrderFirstStep from './components/OrderFirstStep'
import OrderSecondStep from './components/OrderSecondStep'
import Login from './components/Login'
import PendingOrders from './components/PendingOrders'
import Home from './components/Home'
import Checkout from './components/Checkout'
import Logout from './components/Logout'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import {store, persistor} from './store'
import registerServiceWorker from './registerServiceWorker'
const app = document.getElementById('spring-it')
render(
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <Router>
        <div>
            <Route exact path="/" name="Login" component={Login}></Route>
            <Route exact path="/order-first-step" name="Order first step" component={OrderFirstStep}></Route>
            <Route exact path="/order-second-step" name="Order Second step" component={OrderSecondStep}></Route>
            <Route exact path="/home" name="type" component={Home}></Route>
            <Route exact path="/checkout" name="type" component={Checkout}></Route>
            <Route exact path="/logout" name="type" component={Logout}></Route>
            <Route path="/pending-orders" name="Pending orders"  component={PendingOrders}></Route>
        </div>
    </Router>
    </PersistGate>
    </Provider>
    ,
  app)
  registerServiceWorker()