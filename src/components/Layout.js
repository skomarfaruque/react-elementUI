import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Sidebar, SidebarItem } from 'react-responsive-sidebar';
import { connect } from 'react-redux';
class Layout extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        optionsdata : []
    };
  }
  demoFunction () {
    console.log('clicked');
  }
  render () {
    const items = [
      <SidebarItem color="white" path="/pending-orders"><Link to="/home">Home</Link></SidebarItem>,
      <SidebarItem><Link to="/pending-orders">Pending Orders</Link></SidebarItem>,
      <SidebarItem><Link to="/">Logout</Link></SidebarItem>,
    ];
    return (
      <Sidebar content={items} background="orange" color="white" breakPoint={1024}>
      <div style={{textAlign: 'center', lineHeight: '53px', backgroundColor: 'gray'}}>Welcome to Tong {this.props.isLoggedIn}</div>
       <div className='box'>
         { this.props.children }
       </div>
      </Sidebar>
    )
  }
} 
const mapStateToProps = state => ({
  isLoggedIn: state.auth.token
})
export default connect(mapStateToProps, null)(Layout);  
// export default Layout;