import React from 'react';
import { Button, Form, Input, Layout } from 'element-react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from 'react-redux'
import 'element-theme-default';
class Logout extends React.Component{
  constructor(props) {
    super(props);
  }
  componentDidMount () {
    this.props.removeAll()
    this.props.logOut()
    this.props.removeCustomer()
    this.props.history.push('/')
  }
  
  
  render() {
    return (<div></div>)
  }
}
const mapStateToProps = state => ({
  isLoggedIn: state.auth.token
})

const mapDispatchToProps = dispatch => ({
  logOut: (token) => dispatch({ type: 'Logout', token }),
  removeAll: (index) => dispatch({ type: 'removeAll', index }),
  removeCustomer: (index) => dispatch({ type: 'removeCustomer', index })
})

export default connect(mapStateToProps, mapDispatchToProps)(Logout);  
// export default Login