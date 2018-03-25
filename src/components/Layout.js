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
    const items = [
      <SidebarItem color="white" path="/home"><Link to="/home">Home</Link></SidebarItem>,
      <SidebarItem><Link to="/order-first-step">Product</Link></SidebarItem>,
      <SidebarItem><Link to="/pending-orders">Pending Orders</Link></SidebarItem>,
      <SidebarItem>op</SidebarItem>
    ];
    return (
      <div>
        <div>
          {this.props.children}
          <button
            style={{margin: 20}}
            onClick={this.toggleDrawer}
            disabled={this.state.open && !this.state.noOverlay}
            >
            {!this.state.open ? <span>show drawer</span>: <span>close drawer</span>}
          </button>
        </div>
        <ReactDrawer
          open={this.state.open}
          position={this.state.position}
          onClose={this.onDrawerClose}
          noOverlay={this.state.noOverlay}>
          <i onClick={this.closeDrawer} className="icono-cross"></i>
          <h2><Link to ="/home">What a nice drawer !</Link></h2>
          <i onClick={this.closeDrawer} className="icono-cross">x</i>
          <h2>What a nice drawer !</h2>
          <h2 onClick={console.log('hello')}>Log out</h2>
        </ReactDrawer>
      </div>
    )
  }
} 
const mapStateToProps = state => ({
  isLoggedIn: state.auth.token
})
export default connect(mapStateToProps, null)(Layout);  
// export default Layout;