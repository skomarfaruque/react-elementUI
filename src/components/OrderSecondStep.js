import React from 'react';
import { connect } from 'react-redux';
import SiteLayout from './Layout';
import { Button, Breadcrumb, Card, Layout, Radio, Checkbox } from 'element-react';

import 'element-theme-default';

class OrderSecondStep extends React.Component{
  constructor (props) {
    super(props);
    // let temProduct = this.props.cartItem.tempProduct
    this.state = {}
  }
  async componentWillMount () {
    document.title = "Product details";
  }
  componentDidMount () {
    this.setState({'sohag': 1})
    let pro = this.props.cartItem.tempProduct
    console.log(pro)
    pro.ProductDetails.map(info=>{
      this.setState({[info.ConfigurationName]: 1})
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
              <Checkbox.Group key={key}  className="orderSecond" size="large">
                {
                  adonsData.map ((adonInfo,aKey) => {
                    return <Checkbox.Button key={aKey} label={adonInfo.adons.Title + ' +' +adonInfo.adons.Price + 'Tk'}>{adonInfo.adons.Price}</Checkbox.Button>
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
                    return <Radio.Button key={aKey} value={adonInfo.id}>{adonInfo.adons.Title}</Radio.Button>
                  })
                }
             </Radio.Group>
            }
        </div>)
      }
    })
    // let size = product.Size.map((sizeInfo,key) => {
    //   return <Radio.Button key={key} value={sizeInfo.title}/>
    // })
    // let suagar = product.Sugar.map((suagarInfo,key) => {
    //   return <Radio.Button key={key} label="w"  value={suagarInfo.title}/>
    // })
    console.log('tempproduct',product)
  //  let adons = product.Adons.map((d,k)=>{
  //   return <div key={k} className="column is-3">{d.AdonsTitle}
  //   {
  //     d.AdonsDetails.map((s,k)=>
  //       {
  //         return ( <Checkbox.Group key={k}  className="orderSecond" size="large" value={this.state[d.AdonsTitle]}  onChange={this.onChange.bind(this, d.AdonsTitle)}>
  //         <Checkbox.Button key={k} label={s.name + ' +' +s.price + 'Tk'}>{s.price}</Checkbox.Button>
  //         </Checkbox.Group>)
  //       }
  //     )
  //   }</div>})
    return (
      <SiteLayout>
        <div className="columns">
          {/* <div className="column is-3"> Size
            <Radio.Group name="size" key="sugar" className="orderSecond" size="large" value={this.state.size} onChange={this.onChange.bind(this, 'size')}>
                {size}
            </Radio.Group>
          </div> */}
          {/* <div className="column is-3"> Sugar
          <Radio.Group className="orderSecond" name="sugar" size="large"  value={this.state.sugar} onChange={this.onChange.bind(this, 'sugar')}>
            {suagar}
          </Radio.Group>
          </div> */}
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