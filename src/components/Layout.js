import React from 'react';
import { Menu } from 'element-react';
import Interest from './Interest'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Sidebar, SidebarItem } from 'react-responsive-sidebar';

export default class Layout extends React.Component {
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
      <Sidebar content={items} background="orange" color="white">
      <div style={{textAlign: 'center', lineHeight: '53px', backgroundColor: 'gray'}}>Welcome to Tong</div>
       <div className='box'>
         { this.props.children }
       </div>
      </Sidebar>
    )
  }
} 