import React from 'react'
import { connect } from 'react-redux'
import SiteLayout from './Layout'
import PropTypes from 'prop-types'
import { Button, Radio, Notification, Input  } from 'element-react'
import { isArray } from 'util'

class Checkout extends React.Component{
  constructor (props) {
    super(props)
    this.state = {
      grandTotalPrice: this.props.cartItem.cartItems.length,
      tempProduct: this.props.cartItem.tempProduct,
      allconfig: [],
      quantity: 1,
      useWallet: false,
      usedWalletAmount: 0,
      customerWallet: this.props.customerData.wallet,
      payableAmount: 0,
      paymentType: 'cash',
      cardNumber: '',
      loadingButton: false,
      orderActive: true,
      phone: this.props.customerData.phone || '',
      columns: [
        {
          type: 'expand',
          expandPannel: function(data) {
            return (
              <div>
                <p>State: {data.state}</p>
                <p>City: {data.city}</p>
                <p>Address: {data.address}</p>
                <p>Zip: {data.zip}</p>
              </div>
            )
          }
        },
        {
          label: "Date",
          prop: "date",
        },
        {
          label: "Order Id",
          prop: "name",
        }
      ],
      data: [
        {
        date: '05-04-18',
        name: 'T123',
        Type: 'Tea',
        Config: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036'
      }, {
        date: '2016-05-02',
        name: 'T546',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036'
      },
      {
        date: '2016-05-02',
        name: 'T985',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036'
      }]
    }
  }
  async componentWillReceiveProps (props) {
    if (props.cartItem.cartItems.length) {
      let grandTotalPrice = 0
      let grandTotal = await props.cartItem.cartItems.map( p => {
        grandTotalPrice += p.quantity * p.totalPrice
      })
      this.setState({grandTotalPrice})
    } else {
      if (this.state.orderActive) {
        this.context.router.history.push('order-first-step')
      } else {
        this.context.router.history.push('home')
      }
    }
  }
  async componentDidMount () {
    console.log(this.props)
   await this.upateGrandTotalPrice()
  }
  async upateGrandTotalPrice () {
    let grandTotalPrice = 0
    let grandTotal = await this.props.cartItem.cartItems.map(p=> {
      grandTotalPrice += p.quantity * p.totalPrice
    })
    this.setState({grandTotalPrice})
  }
  onChange(key, value) {
    this.setState({
      [key]: value
    })
  }
  checkPreviousHistory () {
    console.log('a')
  }
  async confirmOrder () {
    this.setState({loadingButton: true})
    let postObj = {
      customerId: this.props.customerData.id,
      managerId: this.props.loggedUser.token,
      paymentType: this.state.paymentType,
      cardNumber: this.state.cardNumber,
      usedWalletAmount: this.state.usedWalletAmount,
      grandTotal: this.state.grandTotalPrice,
      products: []
    }
    await this.props.cartItem.cartItems.map( obj => {
      let customProduct = {
        productId: obj.tempProduct.ProductId, 
        quantity: obj.quantity,
        totalPrice: obj.totalPrice,
        fingerPrint: obj.fingerPrint,
        adons: []
      }
      for (var key in obj) { // loop the json object
        if (obj.hasOwnProperty(key)) {
          if (key !== 'totalPrice' && key !=='tempProduct' && key !=='allconfig' && key !== 'quantity' && key !== 'isFull'  && key !== 'fingerPrint') {
            if (isArray(obj[key])) {
              obj[key].map (dt => {
                return customProduct.adons.push((dt).toString())
              })
            } else {
              if (obj[key]) {
                customProduct.adons.push((obj[key]).toString())
              }
            }
          }
        }
      }
      postObj.products.push(customProduct)
    })
    console.log('finaldispatch', postObj)
    // once order is finished
    this.setState({orderActive: false})
    await this.props.removeAll();
    this.setState({loadingButton: false})
  }
  addNew () {
    console.log(this.props)
    this.props.history.push('/order-first-step')
  }
  breadCrumbAction (val) {
    this.props.history.push(val)
  }
  successNotification() {
    Notification({
      title: 'Success',
      message: 'Item is added to cart',
      type: 'success'
    })
  }
  walletUse (type) { // 1 means use wallet 2 means cancel wallet
    if (type === 1) {
      if (this.state.customerWallet > this.state.grandTotalPrice) {
        let customerWallet = this.state.customerWallet - this.state.grandTotalPrice
        this.setState({customerWallet, usedWalletAmount: this.state.grandTotalPrice})
      } else {
        this.setState({customerWallet: 0, usedWalletAmount: this.props.customerData.wallet})
      }
      this.setState(
        {
          useWallet: true,
          payableAmount: (Number(this.state.grandTotalPrice) - Number(this.state.customerWallet))
        }
      )
    } else {
      this.setState({useWallet: false, customerWallet: this.props.customerData.wallet, usedWalletAmount: 0})
    }
  }


  render () {
    let cardInput = <div className="columns home-screen marginTop cardNumber is-mobile"><Input type="password" value={this.state.cardNumber}  onChange={this.onChange.bind(this, 'cardNumber')} placeholder="Last 4 Digit"/></div>
    let cardNumber = this.state.paymentType === 'card' ? cardInput : ''
    return (
      <SiteLayout>
        <div className="columns marginTop marginLeft is-mobile" key="ck">
          <div className="column is-4 home-screen" >
          {this.props.customerData.id ? <div>  
            <div className="columns is-mobile">
              <label className="label">Customer Phone: {this.props.customerData.phone}</label>
            </div>
            <div className="columns is-mobile">
              <label className="label">Wallet: {this.state.customerWallet} Tk</label>
            </div>
            {!this.state.useWallet ? <div className="columns is-mobile">
              <Button type="warning customButton" onClick={this.walletUse.bind(this, 1)}>USE WALLET</Button>
            </div>: ''}</div>: <div>  <div className="columns">
              <Input placeholder="Phone number"  value={this.state.phone} type="number"/>
            </div>
            <div className="columns is-mobile">
              <Button type="primary customButton marginTop" onClick={this.checkPreviousHistory.bind(this)}>Check</Button>
            </div>
          </div> }
          
{/*             
            <div className="columns marginTop is-mobile" style={{height: '15rem', overflow: 'scroll', scrollBehavior: 'smooth'}}>
              <span>
              <div className="columns marginTop is-mobile" style={{margin: '.2rem 0 0 0'}}>
                <nav className="panel history">
                  <p className="panel-heading">
                    <span>12-12-2017</span><span className="marginLeftOrderId">TONG123</span>
                  </p>
                  <div className="panel-block">
                    <div className="columns marginTopBottom ">
                      <div className="column is-2 has-text-weight-semibold panelMarginTop"><span className="quantityCurve">6</span></div>
                      <div className="column is-8">
                        <div className="columns has-text-weight-bold">Lemon Tea</div>
                        <div className="columns">
                        Size: Medium, Sugar: 1Spoon, Adons: sample1, sample2
                        </div>
                      </div>
                      <div className="column is-2">80Tk</div>
                    </div>
                  </div>
                  <div className="panel-block">
                    <div className="columns marginTopBottom">
                      <div className="column is-2 has-text-weight-semibold panelMarginTop"><span className="quantityCurve">2</span></div>
                      <div className="column is-8">
                        <div className="columns has-text-weight-bold">Lemon Tea</div>
                        <div className="columns">
                        Size: Medium, Sugar: 1Spoon, Adons: sample1, sample2
                        </div>
                      </div>
                      <div className="column is-2">80Tk</div>
                    </div>
                  </div>
                  <div className="panel-block">
                    <div className="columns marginTopBottom">
                      <div className="column is-2 has-text-weight-semibold panelMarginTop"><span className="quantityCurve">10</span></div>
                      <div className="column is-8">
                        <div className="columns has-text-weight-bold">Lemon Tea</div>
                        <div className="columns">
                        Size: Medium, Sugar: 1Spoon, Adons: sample1, sample2
                        </div>
                      </div>
                      <div className="column is-2">80Tk</div>
                    </div>
                  </div>
                </nav>
              </div>
              <div className="columns marginTop is-mobile" style={{margin: '.2rem 0 0 0'}}>
                <nav className="panel history">
                  <p className="panel-heading">
                    <span>12-12-2017</span><span className="marginLeftOrderId">TONG123</span>
                  </p>
                  <div className="panel-block">
                    <div className="columns marginTopBottom ">
                      <div className="column is-2 has-text-weight-semibold panelMarginTop"><span className="quantityCurve">6</span></div>
                      <div className="column is-8">
                        <div className="columns has-text-weight-bold">Lemon Tea</div>
                        <div className="columns">
                        Size: Medium, Sugar: 1Spoon, Adons: sample1, sample2
                        </div>
                      </div>
                      <div className="column is-2">80Tk</div>
                    </div>
                  </div>
                  <div className="panel-block">
                    <div className="columns marginTopBottom">
                      <div className="column is-2 has-text-weight-semibold panelMarginTop"><span className="quantityCurve">2</span></div>
                      <div className="column is-8">
                        <div className="columns has-text-weight-bold">Lemon Tea</div>
                        <div className="columns">
                        Size: Medium, Sugar: 1Spoon, Adons: sample1, sample2
                        </div>
                      </div>
                      <div className="column is-2">80Tk</div>
                    </div>
                  </div>
                  <div className="panel-block">
                    <div className="columns marginTopBottom">
                      <div className="column is-2 has-text-weight-semibold panelMarginTop"><span className="quantityCurve">10</span></div>
                      <div className="column is-8">
                        <div className="columns has-text-weight-bold">Lemon Tea</div>
                        <div className="columns">
                        Size: Medium, Sugar: 1Spoon, Adons: sample1, sample2
                        </div>
                      </div>
                      <div className="column is-2">80Tk</div>
                    </div>
                  </div>
                </nav>
              </div>
              </span>
            </div> */}
          </div>
          <div className="column is-4 home-screen">
            <div className="columns">
              <Radio.Group className="checkoutScreen" size="large" value={this.state.paymentType}  onChange={this.onChange.bind(this, "paymentType")}>
                <Radio.Button key="Cash" value="cash">Cash</Radio.Button>
                <Radio.Button key="Card" value="card">Card</Radio.Button>
              </Radio.Group>
            </div>
             {cardNumber}
          </div>
          <div className="column is-4  home-screen">
            {/* <div className="columns">
              <Input disabled placeholder="Amount" value={this.state.grandTotalPrice}/>
            </div> */}
            <div className="columns">
              <div className="column">Total:</div>
              <div className="column">{this.state.grandTotalPrice} Tk</div>
            </div>
            {this.state.useWallet ? <div><div className="columns">
              <div className="column">Wallet pay:</div>
              <div className="column">{this.state.usedWalletAmount} Tk</div>
            </div>
            <div className="columns">
              <div className="column">Payable:</div>
              <div className="column">{this.state.payableAmount} Tk</div>
            </div>
            <div className="columns">
            <Button type="danger customButton" onClick={this.walletUse.bind(this, 2)}>Cancel wallet</Button>
            </div>
            </div>: ''}
           
          </div>
        </div>
        <div className="stickyConfirm">
          <Button type="primary customButton" loading={this.state.loadingButton} onClick={this.confirmOrder.bind(this)}>Confirm</Button>
        </div>
        <div className="stickyAddNew">
          <Button type="default customButton grayButton" onClick={this.addNew.bind(this)}>Add New</Button>
        </div>
      </SiteLayout>
    )
  }
}
Checkout.contextTypes = {
  router: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  cartItem: state.cart,
  customerData: state.cus,
  loggedUser: state.auth
})

const mapDispatchToProps = dispatch => ({
  cart: (cartItems) => dispatch({ type: 'cartItems', cartItems }),
  removeAll: (index) => dispatch({ type: 'removeAll', index }),
})
export default connect(mapStateToProps, mapDispatchToProps)(Checkout)