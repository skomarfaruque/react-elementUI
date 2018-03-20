import React from 'react';
import Layout from './Layout';
import { Menu } from 'element-react';
export default ({ children }) => (
  <div>
    <div>
    <Menu theme="dark" defaultActive="1" className="el-menu-demo" mode="horizontal">
        <Menu.Item index="1">Tong</Menu.Item>
        <Menu.SubMenu index="2" title="Menu">
          <Menu.Item index="2-1">Option 1</Menu.Item>
          <Menu.Item index="2-2">Option 2</Menu.Item>
          <Menu.Item index="2-3">Option 3</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item index="3">Orders</Menu.Item>
        <Menu.Item index="4">Logout</Menu.Item>
        <Menu.Item index="5">Logout</Menu.Item>
        <Menu.Item index="6">Logout</Menu.Item>
        <Menu.Item index="7">Logout</Menu.Item>
        <Menu.Item index="8">Logout</Menu.Item>
        <Menu.Item index="9">Logout</Menu.Item>
        <Menu.Item index="10">Logout</Menu.Item>
      </Menu>
      
    </div>
    
    <div className='container hero'>
      { children }
    </div>
    <div>Footer</div>
  </div>
)