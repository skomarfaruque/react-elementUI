import React from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Sidebar, SidebarItem } from 'react-responsive-sidebar';
import { Badge, Button, InputNumber, Tag, Checkbox, Radio } from 'element-react';
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
        grandTotalPrice: 0,
        updateModal: false,
        activeCartItem: {},
        activeTempProduct: this.props.cartItem.tempProduct,
        totalPrice: 0,
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
        console.log('foundadon', foundAdon)
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
    let d = {hello: 12}
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
    console.log('f',finalIteration)
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
    let displayAdons = product.ProductDetails.map ((data, key) => {

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
    let modalContent = ''
    if (this.state.showModal) {
     return modalContent =  (  <div className={"modal " + (this.state.showModal ? 'is-active': '')}>
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
   </div>)
    } else if (this.state.updateModal) {
      return modalContent = ( <div className="modal is-active">
      <div className="modal-background"></div>
     
      <div className="modal-card" style={{width: '95%'}}>
        <header className="modal-card-head">
          <p className="modal-card-title"><span className="has-text-left">Update Screen</span></p>
          <span className="has-text-right">Total Cost: {this.state.totalPrice}Tk</span>
          <button className="delete" aria-label="close" onClick={() => {this.setState({updateModal: false, showModal: true})}}></button>
        </header>
        <section className="modal-card-body">
        <div className="columns is-multiline" key="adons">
    {displayAdons}
  </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={this.updateCartItem.bind(this)}>Update</button>
          <button className="button" onClick={() => {this.setState({updateModal: false, showModal: true})}}>Cancel</button>
        </footer>
      </div>
    </div>)
    }
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
       {modalContent}
      
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