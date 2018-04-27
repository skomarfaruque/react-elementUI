import React from 'react'
import SiteLayout from './Layout'
import { connect } from 'react-redux'
import { Button, Input, Radio, Layout, Breadcrumb, Message } from 'element-react'
import '../style.css'
import 'element-theme-default'
var crypto = require('crypto')
class Home extends React.Component{
  constructor (props) {
    super(props)
    this.state = {
      customerType: 'New',
      phone: this.props.customerData.phone || '',
      totalPrice: 0,
      quantity: 1,
      userType: this.props.customerData.userType || 1 // 1 means new user 2 means existing user
    }
  }
  async componentDidMount () {
    await this.props.emptyCart()
    await this.props.removeCustomer()
    await this.setState({customerType: 'New', phone: '', userType: 1})
    console.log('p', this.props, 's', this.state)
  }
  onChange(key, value) {
    this.setState({
      [key]: value
    })
  }
  async addToCart (historyInfo) {
    console.log('his', this.props.customerData.history)
    let productReOrderObj = {
      ProductId: historyInfo.productId,
      Name: historyInfo.productTitle, 
      Price: historyInfo.productPrice, 
      ProductDetails: historyInfo.productDetails
    }
    await this.setState({tempProduct: productReOrderObj})
    let pro = this.state.tempProduct
    let adonsData = []
    await pro.ProductDetails.map(async(data)=>{
      await this.setState({[data.ConfigurationName]: data.Multiple ? data.Default ? data.Default : [] : data.Default  || ''})
      
      for (var key in data.Configurables) { // loop the json object
        if (data.Configurables.hasOwnProperty(key)) {
            adonsData.push({adons:data.Configurables[key], id: key})
        }
      }
      
    })
    await this.setState({allconfig: adonsData, totalPrice: pro.Price})
    await this.priceCalculation()
    var obj=this.state
    let sum = ''
    for( var el in obj ) {
      if( obj.hasOwnProperty( el ) ) {
        sum += obj[el]
      }
    }
    let cryptoFingerPrint = await crypto.createHash('md5').update(sum).digest("hex");
    let fingerPrint = {fingerPrint: cryptoFingerPrint}
    let matchedInCart = await this.props.cartItem.cartItems.find(d => {
      return d.fingerPrint === cryptoFingerPrint
    })
    if (!matchedInCart) {
      let postObj = Object.assign(fingerPrint, this.state)
      console.log('submitedobj', postObj)
      await this.props.cart(postObj)
      this.successNotification("Added to cart")
    } else {
      await this.props.updateQuantityCart({cryptoFingerPrint, quantity: matchedInCart.quantity + 1})
      this.successNotification("Same product.Quantity updated in cart")
    }

  }
  successNotification(msg) {
    Message({
      title: 'Success',
      message: msg,
      type: 'success'
    })
  }
  async priceCalculation () {
    let objArr = []
    let obj = this.state
    for (var key in obj) { // loop the json object
      if (obj.hasOwnProperty(key)) {
        if (key !== 'totalPrice' && key !=='userType' && key !=='tempProduct' && key !=='allconfig' && key !== 'quantity' && key !== 'customerType' && key !== 'phone') {
          if (Array.isArray(obj[key])) {
            obj[key].map (dt => {
              return objArr.push({configId:(dt).toString()})
            })
          } else {
            objArr.push({configId:(obj[key]).toString()})
          }
        }
      }
    }
    let price = []
    await objArr.map(async oData => {
      let conPrice = await this.state.allconfig.find(allData => {
        return allData.id === oData.configId
      })
      await price.push(conPrice)
    })
    let finalCalPrice = this.state.tempProduct.Price
    await price.map(pCal=> {
      if (pCal) {
        finalCalPrice += pCal.adons.Price
      }
    })
    this.setState({totalPrice: finalCalPrice})
  
  }
  async changePhone (key, val) {
    await this.setState({phone: val})
    if (val) {
      await this.startBooking()
    } else {
      await this.setState({userType: 1})
      if (val === 1) {
        await this.setState({phone: ''})
      }
    }
    
  }
  async startBooking () {
    if (!this.state.phone) {
      await this.props.removeCustomer()
      return await this.props.history.push('/order-first-step')
    }
    let body = JSON.stringify({PhoneNumber: this.state.phone})
    let res = await fetch(`${process.env.REACT_APP_API_URL}/lookup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body
    })
    let result = await res.json()
    console.log('api response', result)
    await this.props.cus(result)
    if (result.userType === 1) {
      await this.setState({userType: 1})
      await this.props.history.push('/order-first-step')
    } else {
      this.setState({userType: 2, customerType: 'Old'})
    }
  }
  newOrder () {
    this.props.history.push('/order-first-step')
  }
  async customerChange (val) {
    await this.setState({customerType: val})
    if (this.state.customerType === 'New') {
      await this.props.removeCustomer(val)
      await this.props.emptyCart()
      this.setState({userType: 1, phone: ''})
    }
  }

  render () {
    var styles = {
      marginTop: {
        margin: '11% 15% 20%'
      },
      inputBox: {
        margin: '4% 0% 1%'
      },
      rightNav: {
      },
      verticalLine: {
      },
      submitButtonDiv: {
        height: '70px',
        marginTop: '3%'
      },
      submitButton: {
        width: '100%',
        height: '70px',
        fontSize: '28px'
      }
    }
    let history = this.state.userType !== 1 ? this.props.customerData.history.length ?
    <div className="column is-8 pending-orders marginLeft" style={{height: '30rem', overflow: 'scroll', scrollBehavior: 'smooth'}}>
    {this.props.customerData.history.map( hisData => {
      return (   <div className="columns marginTop is-mobile">
      <nav className="panel history">
        <p className="panel-heading">
          <span>{hisData.date}</span>
        </p>
       {hisData.orders.map(hisOrderData => {
         return ( <div className="panel-block">
         <div className="columns marginTopBottom ">
           <div className="column is-1 has-text-weight-semibold" >
             <span className="quantityCurve">{hisOrderData.quantity}</span>
           </div>
           <div className="column is-8" >
             <div className="columns has-text-weight-bold fontSizeOneRem">{hisOrderData.productTitle}</div>
             <div className="columns fontSizeOneRem">
              {hisOrderData.summary}
             </div>
           </div>
           <div className="column is-3"><Button size="small customButton" type="success" onClick = {this.addToCart.bind(this, hisOrderData)}>Reorder</Button></div>
         </div>
       </div>)
       })}
       
      </nav>
    </div>)
    })}
 
 
  </div>: <div className="column is-8 marginLeft has-text-danger" style={{margin: '10rem 16rem', fontWeight: 'bolder'}}>No history</div> : ''
    
    return (
      <SiteLayout>
        <div className="columns">
          <div className="column is-4">
            <div className="columns marginTop">
              <Radio.Group size="large" value={this.state.customerType} onChange={this.customerChange.bind(this)} className="homeScreen">
                <Radio.Button value="New" />
                <Radio.Button value="Old" />
              </Radio.Group>
            </div>
            <div className="columns home-screen marginTop">
              <Input placeholder="Phone number" type="number" value={this.state.phone} onChange={this.onChange.bind(this, 'phone')}/>
            </div>
            { this.state.userType === 1 ? (<div className="columns marginTop">
              <Button type="primary"  style={styles.submitButton} onClick={this.startBooking.bind(this)}>Next</Button>
            </div>) : ( <div className="columns marginTop">
              <Button type="primary"  style={styles.submitButton} onClick={this.newOrder.bind(this)}>New order</Button>
            </div>)}
           
          </div>
         {history}
        </div>
    
      </SiteLayout>
    )
  }
}
const mapStateToProps = state => ({
  customerData: state.cus,
  cartItem: state.cart
})
const mapDispatchToProps = dispatch => ({
  cus: (value) => dispatch({ type: 'StoreCus', value }),
  cart: (cartItems) => dispatch({ type: 'cartItems', cartItems }),
  updateQuantityCart: (data) => dispatch({ type: 'updateQuantityCart', data }),
  removeCustomer: (index) => dispatch({ type: 'removeCustomer', index }),
  emptyCart: (index) => dispatch({ type: 'removeAll', index })
})
export default connect(mapStateToProps, mapDispatchToProps)(Home)