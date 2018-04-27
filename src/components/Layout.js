import React from 'react'

import { Link } from "react-router-dom"
import { Badge, Button, InputNumber, Checkbox, Radio, Notification, MessageBox, Message } from 'element-react'
import { connect } from 'react-redux'
import ReactDrawer from 'react-drawer'
import 'react-drawer/lib/react-drawer.css'
import FaBeer from 'react-icons/lib/fa/align-justify'
import Cart from 'react-icons/lib/fa/shopping-cart'
import PropTypes from 'prop-types'
class Layout extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
        optionsdata : [],
        open: false,
        position: 'left',
        noOverlay: false,
        showModal: false,
        num6: 1,
        grandTotalPrice: 0,
        updateModal: false,
        activeCartItem: {},
        activeTempProduct: this.props.cartItem.tempProduct,
        totalPrice: 0,
        isFull: true
    }
    this.toggleDrawer = this.toggleDrawer.bind(this)
    this.closeDrawer = this.closeDrawer.bind(this)
    this.onDrawerClose = this.onDrawerClose.bind(this)
    this.setPosition = this.setPosition.bind(this)
    this.setNoOverlay = this.setNoOverlay.bind(this)
  }
  async componentDidMount () {
    if (!this.props.isLoggedIn) {
      this.context.router.history.push('/')
    }
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
    MessageBox.confirm('Would you like to Continue?', 'Confirmation', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'error'
    }).then(async () => {
      await this.props.cart(key)
      await this.upateGrandTotalPrice()
      this.successNotification("Removed from cart")
      if (this.props.cartItem.cartItems.length === 0 ) {
        this.setState({showModal: false})
        this.context.router.history.push('home')
      }
    }).catch(() => {
    })
  }
  clearAll () {
    MessageBox.confirm('Would you like to Continue?', 'Confirmation', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'error'
    }).then(async () => {
      await this.props.removeAll()
      this.successNotification("Removed from cart")
      this.setState({showModal: false})
    }).catch(() => {
    });
  }
  async enableUPdateScreen (key) {
    await this.setState(
      {
        showModal: false, 
        updateModal: true, 
        activeCartItem: this.props.cartItem.cartItems[key],
        activeTempProduct: this.props.cartItem.cartItems[key].tempProduct,
        totalPrice:  this.props.cartItem.cartItems[key].totalPrice,
        key
      })
      let objArr = []
      let obj = this.state.activeCartItem
      for (var key in obj) { // loop the json object
        if (obj.hasOwnProperty(key)) {
          if (key !== 'totalPrice' && key !=='tempProduct' && key !=='allconfig' && key !== 'quantity') {
            let dummyInfo = {key, info: [], array: true}
            if (Array.isArray(obj[key])) {
              obj[key].map (dt=>{
                dummyInfo.info.push({configId:(dt).toString()})
              })
            } else {
              dummyInfo.array = false
              dummyInfo.info.push({configId:(obj[key]).toString()})
            }
            objArr.push(dummyInfo)
          }
        }
      }
      await this.state.activeTempProduct.ProductDetails.map(async(data)=>{
        let foundAdon = await objArr.find(d=> {
          return d.key === data.ConfigurationName
        })
        if (foundAdon.key === data.ConfigurationName) {
          if (foundAdon.array) {
            let selectedAdonsArrayType = []
            await foundAdon.info.map(adt=> {
              if (adt.configId) {
                selectedAdonsArrayType.push(adt.configId)
              }
              
            })
            await this.setState({[data.ConfigurationName]: selectedAdonsArrayType})
          } else {
            await this.setState({[data.ConfigurationName]: foundAdon.info[0].configId || ''})
          }
        }
      })
  }
  async onChange (key, value) {
    if (typeof value === 'number') {
      value = Math.floor(value)
    } else {
      value = this.props.cartItem.cartItems[key].quantity
    }
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
  async onChangeUpdate(key, value) {
    await this.setState({
      [key]: value
    })
    await this.priceCalculation()
  }
  async priceCalculation () {
    let objArr = []
    let obj = this.state
    for (var key in obj) { // loop the json object
      if (obj.hasOwnProperty(key)) {
        if (key !== 'totalPrice' && key !=='tempProduct' && key !=='allconfig' && key !== 'quantity') {
          if (Array.isArray(obj[key])) {
            obj[key].map (dt=>{
              objArr.push({configId:(dt).toString()})
            })
          } else {
            objArr.push({configId:(obj[key]).toString()})
          }
        }
      }
    }

    let price = []
    await objArr.map(async oData => {
      let conPrice = await this.state.activeCartItem.allconfig.find(allData => {
        return allData.id === oData.configId
      })
      await price.push(conPrice)
    })
    let finalCalPrice = this.state.activeCartItem.tempProduct.Price
    await price.map(pCal=> {
      if (pCal) {
        finalCalPrice += pCal.adons.Price
      }
    })
    this.setState({totalPrice: finalCalPrice})
  
  }
  async updateCartItem () {
    // let activeCart = await Object.assign({},this.state.activeCartItem) 
    let finalIteration = await Object.assign({},this.state.activeCartItem, this.state)
    delete finalIteration.activeCartItem
    delete finalIteration.activeTempProduct
    delete finalIteration.grandTotalPrice
    delete finalIteration.noOverlay
    delete finalIteration.num6
    delete finalIteration.open
    delete finalIteration.optionsdata
    delete finalIteration.position
    delete finalIteration.showModal
    delete finalIteration.updateModal
    delete finalIteration.key
    let ind = {finalIteration, arrayInd: this.state.key}
    await this.props.updateCartItems(ind)
    await this.upateGrandTotalPrice()
    this.successNotification("Update success")
    await this.setState({updateModal: false, showModal: true})
  }
  async showCartModal () {
    if (this.props.cartItem.cartItems.length) {
      await this.setState({showModal: true})
      await this.upateGrandTotalPrice()
    }
  }
  successNotification(msg) {
    Message({
      title: 'Success',
      message: msg,
      type: 'success'
    })
  }
  redirectCheckout () {
    this.setState({showModal: false})
    this.context.router.history.push('checkout')
  }
  render () {
   
    let showCartItems = this.props.cartItem.cartItems.map((cartData, key) => {
      let objArr = []
      let obj = cartData
      for (var akey in obj) { // loop the json object
        if (obj.hasOwnProperty(akey)) {
          if (akey !== 'totalPrice' && akey !=='tempProduct' && akey !=='allconfig' && akey !== 'phone' && akey !== 'quantity' && akey !== 'userType') {
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
          <div className="columns is-mobile" key>
            <div className="column is-4">
              <div className="columns is-size-4">{cartData.tempProduct.Name} </div>
             
                {objArr.map((inf,rid)=> {
                    if (inf.values[0]) {
                      return (  <div key={rid} className="columns">
                        <div className="column is-4 has-text-right tag">{inf.key}: </div>
                        {inf.values.map((ind,kid)=> {
                          return (<div key={kid} className="column has-text-left tag">{ind.adons.Title}</div>)
                        })}
                      </div>)
                    }
                })}
             
            </div>
            <div className="column is-3"> 
              <Button type="danger" icon="delete" onClick={this.deleteItemFromCart.bind(this, key)}></Button>
              <Button type="primary" icon="edit" onClick={this.enableUPdateScreen.bind(this, key)}></Button>
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
    let product = this.state.activeTempProduct
    let displayAdons
    if (product) {
      displayAdons = product.ProductDetails.map((data, key) => {
        let adonsData = []
        for (var keyData in data.Configurables) { // loop the json object
          if (data.Configurables.hasOwnProperty(keyData)) {
              adonsData.push({adons:data.Configurables[keyData], id: keyData})
          }
        }
        if (data.Multiple) { // check box
          return (<div className="column is-3" key={data.ConfigurationName+ key}>
          <span className="has-text-link" style={{fontWeight: 'bold'}}>{data.ConfigurationName}</span>
              {
                <Checkbox.Group   className="orderSecond" size="large" value={this.state[data.ConfigurationName] || []} onChange={this.onChangeUpdate.bind(this, data.ConfigurationName)}>
                  {
                    adonsData.map ((adonInfo,aKey) => {
                      return <Checkbox.Button key={adonInfo.adons.Title+aKey} value={adonInfo.id} label={adonInfo.adons.Title + ' +' +adonInfo.adons.Price + 'Tk'}>hello</Checkbox.Button>
                    })
                  }
                </Checkbox.Group>
              }
          </div>)
        } else { // radio box
          return (<div className="column is-3" key={data.ConfigurationName+ key}>{data.ConfigurationName}
              {
                <Radio.Group className="orderSecond" size="large" value={this.state[data.ConfigurationName]}  onChange={this.onChangeUpdate.bind(this, data.ConfigurationName)}>
                  {
                    adonsData.map ((adonInfo,aKey) => {
                      return <Radio.Button key={aKey} value={adonInfo.id}>{adonInfo.adons.Title + "+"+ adonInfo.adons.Price+"Tk" }</Radio.Button>
                    })
                  }
                </Radio.Group>
              }
          </div>)
        }
      })
    } else {
      displayAdons = ''
    }
 
    let modalContent = ''
    if (this.state.showModal) {
     return modalContent =  
      (
        <div className={"modal " + (this.state.showModal ? 'is-active': '')}>
          <div className="modal-background"></div>
          <div className="modal-card" style={{width: '95%'}}>
            <header className="modal-card-head">
              <p className="modal-card-title"><span className="has-text-left">Cart Summary</span></p>
              <p className="modal-card-title has-text-left">Total Cost: {this.state.grandTotalPrice} Tk</p>
              <button className="delete" aria-label="close" onClick={() => {this.setState({showModal: false})}}></button>
            </header>
            <section className="modal-card-body">
              {showCartItems}
            </section>
            <footer className="modal-card-foot space-btween">
              <button className="button is-danger custom-large" onClick={this.clearAll.bind(this)}>Clear all</button>
              <button className="button is-success custom-large" onClick={this.redirectCheckout.bind(this)}>Checkout</button>
            </footer>
          </div>
        </div>
      )
    } else if (this.state.updateModal) {
      return modalContent = 
        (
          <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card" style={{width: '95%'}}>
              <header className="modal-card-head">
                <p className="modal-card-title"><span className="has-text-left">Update Screen</span></p>
                <p className="modal-card-title has-text-left">Total Cost: {this.state.totalPrice} Tk</p>
                <button className="delete" aria-label="close" onClick={() => {this.setState({updateModal: false, showModal: true})}}></button>
              </header>
              <section className="modal-card-body">
                <div className="columns is-multiline" key="adons">
                  {displayAdons}
                </div>
              </section>
              <footer className="modal-card-foot space-btween">
                <button className="button is-danger custom-large" onClick={() => {this.setState({updateModal: false, showModal: true})}}>Cancel</button>
                <button className="button is-success custom-large" onClick={this.updateCartItem.bind(this)}>Update</button>
              </footer>
            </div>
        </div>
      )
    }
    return (
      <div className="full-screenable-node" style={{margin: '1%'}}>
        <div className="columns blue-background is-mobile">
          <div className="column is-6 has-text-left">
            <a onClick={this.toggleDrawer} style={{margin: '3%'}}><FaBeer size="50" color="#ffffff" /></a>
          </div>
          <div className="column is-6 has-text-right">
            <span onClick={this.showCartModal.bind(this)} style={{marginRight: '1.3rem'}}>
              <Badge value={ this.props.cartItem.cartItems.length }>
                <Cart  size="50" color="#ffffff" />
              </Badge>
            </span>
          </div>
        </div>
        <div className="container">{this.props.children}</div>
        {modalContent}
      
        <ReactDrawer
          open={this.state.open}
          position={this.state.position}
          onClose={this.onDrawerClose}
          noOverlay={this.state.noOverlay}>
          <div className="columns">
            <div className="column has-text-right" style={{marginRight: '2%'}}>
              <i  onClick={this.closeDrawer} className="el-icon-close"></i>
            </div>
          </div>
          <div className="panel list-group">
            <Link className="panel-block list-group-item is-primary" to ="/home">Home</Link>
            <Link className="panel-block list-group-item is-primary" to ="/order-first-step">Product</Link>
            <Link className="panel-block list-group-item is-primary" to ="/orders">Orders</Link>
            <Link className="panel-block list-group-item is-primary" to ="/pending-orders">Pending Orders</Link>
            <Link className="panel-block list-group-item is-primary" to ="/logout">Logout</Link>
          </div>
        </ReactDrawer>
      </div>
 
    )
  }
} 
Layout.contextTypes = {
  router: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  isLoggedIn: state.auth.token,
  cartItem: state.cart
})
const mapDispatchToProps = dispatch => ({
  cart: (index) => dispatch({ type: 'removeCartItems', index }),
  removeAll: (index) => dispatch({ type: 'removeAll', index }),
  updateQuantity: (index) => dispatch({ type: 'updateQuantity', index }),
  updateCartItems: (index) => dispatch({ type: 'updateCartItems', index })
})
export default connect(mapStateToProps, mapDispatchToProps)(Layout)
