import React from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Sidebar, SidebarItem } from 'react-responsive-sidebar';
import { Badge, Button, InputNumber } from 'element-react';
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
      noOverlay: false,
      showModal: false,
      num6: 1
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.onDrawerClose = this.onDrawerClose.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.setNoOverlay = this.setNoOverlay.bind(this);
  }
  componentDidMount () {
    console.log('cartitem', this.props.cartItem)
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
  async deleteItemFromCart (key) {
    await this.props.cart(key)
  }
  async onChange (key, value) {
    let obj = {key, value}
    console.log(obj)
    await this.props.updateQuantity(obj)
  }

  render () {
    let showCartItems = this.props.cartItem.cartItems.map((cartData, key) => {
      return (
        <div>
          <div className="columns" key>
            <div className="column is-6">
              <div className="columns">{cartData.tempProduct.Name} </div>
              <div className="columns">Adons1, Adons2</div>
            </div>
            <div className="column is-3"> 
              <Button type="danger" icon="delete" onClick={this.deleteItemFromCart.bind(this, key)}></Button>
              <Button type="primary" icon="edit" onClick={this.deleteItemFromCart.bind(this, key)}></Button>
            </div>
            <div className="column is-3"> 
              <InputNumber size="small" min="1" defaultValue={cartData.quantity} onChange={this.onChange.bind(this, key)}></InputNumber>
            </div>
        </div>
        <hr/>
        </div>
      )
    })
    return (
      <div>

        <div className="columns" style={{textAlign: 'center', lineHeight: '53px', backgroundColor: 'gray'}}>
          <div className="column is-4">
            <button 
              onClick={this.toggleDrawer}
              disabled={this.state.open && !this.state.noOverlay}
              >
              {!this.state.open ? <span>Menu</span>: <span>close drawer</span>}
            </button>
          </div>
          <div className="column is-4">Welcome to Tong {this.props.isLoggedIn} - {this.props.cartItem.product.length} <a><span className="mi mi-face"></span></a></div>
          <div className="column is-4">
          <Badge value={ this.props.cartItem.cartItems.length }>
            <Button size="small" onClick={() => {this.setState({showModal: true})}}>Items</Button>
          </Badge>
          </div>
        </div>
        <div className="container">{this.props.children}</div>
          
        <div className={"modal " + (this.state.showModal ? 'is-active': '')}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Cart Summary</p>
              <button className="delete" aria-label="close" onClick={() => {this.setState({showModal: false})}}></button>
            </header>
            <section className="modal-card-body">
              {showCartItems}
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success">Checkout</button>
              <button className="button" onClick={() => {this.setState({showModal: false})}}>Cancel</button>
            </footer>
          </div>
        </div>
      
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
const mapDispatchToProps = dispatch => ({
  cart: (index) => dispatch({ type: 'removeCartItems', index }),
  updateQuantity: (index) => dispatch({ type: 'updateQuantity', index }),
})
export default connect(mapStateToProps, mapDispatchToProps)(Layout);  
// export default Layout;