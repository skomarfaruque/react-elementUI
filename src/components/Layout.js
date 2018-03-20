import React from 'react';
import Layout from './Layout';
import { Menu } from 'element-react';
import Interest from './Interest'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
export default ({ children }) => (
  <div>
    <div>
      <Menu theme="dark" defaultActive="1" className="el-menu-demo" mode="horizontal">
        <Menu.Item index="1"> <Link to="/">Home</Link></Menu.Item>
        <Menu.SubMenu index="2" title="Menu">
          <Menu.Item index="2-1">Option 1</Menu.Item>
          <Menu.Item index="2-2"><Link to="/pending-orders">Pending Orders</Link></Menu.Item>
          <Menu.Item index="2-3">Option 3</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item index="3"><Link to="/pending-orders">Pending Orders</Link></Menu.Item>
        <Menu.Item index="4">Logout</Menu.Item>
      </Menu>
      
    </div>
    
    <div className='container hero'>
      { children }
    </div>
    <div>Footer</div>
  </div>
)