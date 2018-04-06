import React from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Sidebar, SidebarItem } from 'react-responsive-sidebar';
import { Badge, Button, InputNumber, Tag } from 'element-react';
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
      num6: 1,
      grandTotalPrice: 0
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.onDrawerClose = this.onDrawerClose.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.setNoOverlay = this.setNoOverlay.bind(this);
  }
  async componentDidMount () {
   await this.upateGrandTotalPrice()
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
    await this.props.updateQuantity(obj)
    await this.upateGrandTotalPrice()
  }
  async upateGrandTotalPrice () {
    let grandTotalPrice = 0
    let grandTotal = await this.props.cartItem.cartItems.map(p=> {
      grandTotalPrice += p.quantity * p.totalPrice
    })
    this.setState({grandTotalPrice})
  }

  render () {
   
    let showCartItems = this.props.cartItem.cartItems.map((cartData, key) => {
      // console.log(cartData)
      let objArr = []
      let obj = cartData
      for (var akey in obj) { // loop the json object
        if (obj.hasOwnProperty(akey)) {
          if (akey !== 'totalPrice' && akey !=='tempProduct' && akey !=='allconfig' && akey !== 'quantity') {
            let inserArray = {key: akey, values: []}
             /*eslint no-undef: "error"*/
            if (Array.isArray(obj[akey])) {
              obj[akey].map (dt=>{
                let adonInfo = cartData.allconfig.find(allData => {
                  return allData.id === (dt).toString()
                })
                if (adonInfo) {
                  inserArray.values.push(adonInfo)
                }
              })
            } else {
              let adonInfo = cartData.allconfig.find(allData => {
                return allData.id === (obj[akey]).toString()
              })
              inserArray.values.push(adonInfo)
            }
            objArr.push(inserArray)
          }
        }
      }
      return (
        <div>
          <div className="columns" key>
            <div className="column is-4">
              <div className="columns">{cartData.tempProduct.Name} </div>
              <div className="columns">
                {objArr.map(inf=> {
                  // console.log(inf)
                    if (inf.values[0]) {
                      return (  <div>
                        {inf.key}:
                        {inf.values.map(ind=> {
                          return (<Tag>{ind.adons.Title}</Tag>)
                        })}
                      </div>)
                    }
                })}
              </div>
            </div>
            <div className="column is-3"> 
              <Button type="danger" icon="delete" onClick={this.deleteItemFromCart.bind(this, key)}></Button>
              <Button type="primary" icon="edit" onClick={this.deleteItemFromCart.bind(this, key)}></Button>
            </div>
            <div className="column is-3"> 
              <InputNumber size="large" min="1" defaultValue={cartData.quantity} onChange={this.onChange.bind(this, key)}></InputNumber>
            </div>
            <div className="column is-2">Price: 

              {cartData.totalPrice * cartData.quantity} tk
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
          <div className="modal-card" style={{width: '95%'}}>
            <header className="modal-card-head">
              <p className="modal-card-title"><span className="has-text-left">Cart Summary</span></p>
              <span className="has-text-right">Total Cost: {this.state.grandTotalPrice}Tk</span>
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