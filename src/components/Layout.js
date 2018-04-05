import React from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Sidebar, SidebarItem } from 'react-responsive-sidebar';
import { connect } from 'react-redux';
import ReactDrawer from 'react-drawer';
import 'react-drawer/lib/react-drawer.css';

class Layout extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        optionsdata : [],
        open: false,
      position: 'left',
      noOverlay: false
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.onDrawerClose = this.onDrawerClose.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.setNoOverlay = this.setNoOverlay.bind(this);
  }
  componentDidMount () {
    // console.log('cartitem', this.props.cartItem)
  }
  setPosition(e) {
    this.setState({position: e.target.value});
  }
  setNoOverlay(e) {
    this.setState({noOverlay: e.target.checked});
  }
  toggleDrawer() {
    this.setState({open: !this.state.open});
  }
  closeDrawer() {
    this.setState({open: false});
  }
  onDrawerClose() {
    this.setState({open: false});
  }
  demoFunction (e) {
    console.log(this.props)
  }
  render () {
    return (
      <div>

        <div className="columns" style={{textAlign: 'center', lineHeight: '53px', backgroundColor: 'gray'}}>
          <div className="has-text-left is-3">
          <a  style={{margin: 20}} onClick={this.toggleDrawer}><img style={{width: '50px', height: '100px'}} src={require('../menu.png')} /></a>
            {/* <button 
             
              onClick={this.toggleDrawer}
              disabled={this.state.open && !this.state.noOverlay}
              >
              {!this.state.open ? <span>Menu</span>: <span>close drawer</span>}
            </button> */}
          </div>
          <div className="is-8">Welcome to Tong {this.props.isLoggedIn} - {this.props.cartItem.product.length} <a><span className="mi mi-face"></span></a></div>
          <div className="column"></div>
        </div>
        <div className="container">{this.props.children}</div>
          
        
      
        <ReactDrawer
          open={this.state.open}
          position={this.state.position}
          onClose={this.onDrawerClose}
          noOverlay={this.state.noOverlay}>
          <i onClick={this.closeDrawer} className="icono-cross"></i>
          <div className="columns">
            <div className="column has-text-right" style={{marginRight: '2%'}}>
            <i onClick={this.closeDrawer} className="icono-cross">x</i></div>
          </div>
          <div className="panel list-group">
          <Link className="panel-block list-group-item is-primary" to ="/home">Home</Link>
          <Link className="panel-block list-group-item is-primary" to ="/order-first-step">Product</Link>
          <Link className="panel-block list-group-item is-primary" to ="/pending-orders">Orders pending</Link>
            <a className="panel-block list-group-item is-warning">Logout</a>
          </div>
        </ReactDrawer>
      </div>
    )
  }
} 
const mapStateToProps = state => ({
  isLoggedIn: state.auth.token,
  cartItem: state.cart
})
export default connect(mapStateToProps, null)(Layout);  
// export default Layout;