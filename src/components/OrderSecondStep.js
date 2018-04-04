import React from 'react';
import { connect } from 'react-redux';
import SiteLayout from './Layout';
import { Button, Breadcrumb, Card, Layout, Radio, Checkbox } from 'element-react';

import 'element-theme-default';

class OrderSecondStep extends React.Component{
  constructor (props) {
    super(props);
    this.state = {}
  }
  async componentWillMount () {
    document.title = "Product details";
  }
  async componentDidMount () {
    let pro = this.props.cartItem.tempProduct
    await pro.ProductDetails.map(async(info)=>{
      await this.setState({[info.ConfigurationName]: info.Default || ''})
    })
  }

  productNext (key) { // here key is the product index
    let product = this.state.products[key]
    this.props.cart(product)
  }
  async onChange(key, value) {

    await this.setState({
      [key]: value
    });
    console.log(this.state)
  }
  async restRadio(key, value) {
    console.log('key:', key,'value:',value)
  }
  addToCart () {
    console.log(this.state)
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

      if (data.Default) {
      }
      let adonsData = []
      for (var key in data.Configurables) { // loop the json object
        if (data.Configurables.hasOwnProperty(key)) {
        
            adonsData.push({adons:data.Configurables[key], id: key})
        }
      }
      if (data.Multiple) { // check box
        return (<div className="column" key>{data.ConfigurationName}
            {
              <Checkbox.Group key={data.ConfigurationName+key}  className="orderSecond" size="large" onChange={this.onChange.bind(this, data.ConfigurationName)}>
                {
                  adonsData.map ((adonInfo,aKey) => {
                    return <Checkbox.Button key={adonInfo.adons.Title+aKey} value={adonInfo.id} label={adonInfo.adons.Title + ' +' +adonInfo.adons.Price + 'Tk'}>hello</Checkbox.Button>
                  })
                }
             </Checkbox.Group>
            }
        </div>)
      } else { // radio box
        return (<div className="column" key>{data.ConfigurationName}
            {
              <Radio.Group key={key}  className="orderSecond" size="large" value={this.state[data.ConfigurationName]}  onChange={this.onChange.bind(this, data.ConfigurationName)}>
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
        <div className="columns">
          {displayAdons}
        </div>
        <div className="columns">
          <div className="column">
            <button className="button is-info is-large" style={{width: '100%'}} onClick={this.addToCart.bind(this)}>Add Another</button>
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