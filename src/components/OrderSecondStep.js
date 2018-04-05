import React from 'react';
import { connect } from 'react-redux';
import SiteLayout from './Layout';
import { Button, Breadcrumb, Card, Layout, Radio, Checkbox } from 'element-react';

import 'element-theme-default';
import { isArray } from 'util';

class OrderSecondStep extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      totalPrice: 0,
      tempProduct: this.props.cartItem.tempProduct,
      allconfig: []
    }
  }
  async componentWillMount () {
    document.title = "Product details";
    let pro = this.props.cartItem.tempProduct
    let adonsData = []
    await pro.ProductDetails.map(async(data)=>{
      await this.setState({[data.ConfigurationName]: data.Default || ''})
      
      for (var key in data.Configurables) { // loop the json object
        if (data.Configurables.hasOwnProperty(key)) {
            adonsData.push({adons:data.Configurables[key], id: key})
        }
      }
      
    })
    await this.setState({allconfig: adonsData, totalPrice: this.state.tempProduct.Price})
    this.priceCalculation()
  }
  async componentDidMount () {
   
  }
  productNext (key) { // here key is the product index
    let product = this.state.products[key]
    this.props.cart(product)
  }
  async onChange(key, value) {
    await this.setState({
      [key]: value
    })
    // console.log(key, value)
    this.priceCalculation()
  }
  addToCart () {
    console.log(this.state)
  }
  async addToCartReturnHome () {
    console.log(this.state)
  }
  async priceCalculation () {
    let objArr = []
    let obj = this.state
    for (var key in obj) { // loop the json object
      if (obj.hasOwnProperty(key)) {
        if (key !== 'totalPrice' && key !=='tempProduct' && key !=='allconfig') {
          if (isArray(obj[key])) {
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


  render () {
    var styles = {
      marginTop: {
        margin: '3%',
        textAlign: 'left'
      }
    };
    let product = this.props.cartItem.tempProduct
    let displayAdons = product.ProductDetails.map ((data, key) => {

      let adonsData = []
      for (var keyData in data.Configurables) { // loop the json object
        if (data.Configurables.hasOwnProperty(keyData)) {
            adonsData.push({adons:data.Configurables[keyData], id: keyData})
        }
      }
      if (data.Multiple) { // check box
        return (<div className="column is-4" key={data.ConfigurationName+ key}>
        <span className="has-text-link" style={{fontWeight: 'bold'}}>{data.ConfigurationName}</span>
            {
              <Checkbox.Group   className="orderSecond" size="large" onChange={this.onChange.bind(this, data.ConfigurationName)}>
                {
                  adonsData.map ((adonInfo,aKey) => {
                    return <Checkbox.Button key={adonInfo.adons.Title+aKey} value={adonInfo.id} label={adonInfo.adons.Title + ' +' +adonInfo.adons.Price + 'Tk'}>hello</Checkbox.Button>
                  })
                }
             </Checkbox.Group>
            }
        </div>)
      } else { // radio box
        return (<div className="column is-4" key={data.ConfigurationName+ key}>{data.ConfigurationName}
            {
              <Radio.Group className="orderSecond" size="large" value={this.state[data.ConfigurationName]}  onChange={this.onChange.bind(this, data.ConfigurationName)}>
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

    return (
      <SiteLayout>
        <div className="columns is-right" key="price">
          <div className="column has-text-right">Price: {this.state.totalPrice} Tk</div>
        </div>
        <div className="columns is-multiline" key="adons">
          {displayAdons}
        </div>
        <div className="columns">
          <div className="column">
            <button className="button is-info is-large" style={{width: '100%'}} onClick={this.addToCartReturnHome.bind(this)}>Add Another</button>
          </div>
          <div className="column">
            <button className="button is-primary is-large" style={{width: '100%'}} onClick={this.addToCart.bind(this)}>Add to Cart</button>
          </div>
          <div className="column">
            <button className="button is-success is-large" style={{width: '100%'}} onClick={this.addToCart.bind(this)}>Checkout</button>
          </div>
        </div>
      </SiteLayout>
    )
  }
}
const mapStateToProps = state => ({
  cartItem: state.cart
})

const mapDispatchToProps = dispatch => ({
  cart: (product) => dispatch({ type: 'tempProduct', product }),
})
export default connect(mapStateToProps, mapDispatchToProps)(OrderSecondStep);  