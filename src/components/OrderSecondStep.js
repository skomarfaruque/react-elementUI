import React from 'react';
import { connect } from 'react-redux';
import SiteLayout from './Layout';
import { Button, Breadcrumb, Card, Layout, Radio } from 'element-react';

import 'element-theme-default';

class OrderSecondStep extends React.Component{
  constructor (props) {
    super(props);
    let temProduct = this.props.cartItem.tempProduct
    console.log('cons', this.props.cartItem.tempProduct)
    this.state = {
     size: temProduct.Size[0].title,
     sugar: temProduct.Sugar[0].title,
    }
  }
  async componentWillMount () {
    document.title = "Product details";
  }
  componentDidMount () {
    console.log('secondstep', this.props)
  }

  productNext (key) { // here key is the product index
    let product = this.state.products[key]
    console.log('clicked on product')
    this.props.cart(product)
  }
  async onChange(key, value) {
    await this.setState({
      [key]: value
    });
    console.log('states', this.state)
  }

  render () {
    var styles = {
      marginTop: {
        margin: '3%',
        textAlign: 'left'
      }
    };
    let product = this.props.cartItem.tempProduct
    let size = product.Size.map((sizeInfo,key) => {
      return <Radio.Button value={sizeInfo.title}/>
    })
    let suagar = product.Sugar.map((suagarInfo,key) => {
      return <Radio.Button  value={suagarInfo.title}/>
    })
    // let adons = product.Adons.map((adonsInfo,key) => {
    // let adonHtml =  
    //   <div className="column">
    //     {adonsInfo.AdonsTitle}
    //     adonsInfo.AdonsDetails.map(da => {
    //       return <span></span>
    //     })
    //   </div>
    //   // adonsInfo.AdonsDetails.map((finalAdons,key) => {
    //   //   return <span>{finalAdons.title}</span>
    //   // })
    // })
    return (
      <SiteLayout>
        <div className="columns">
          <div className="column is-3"> Size
            <Radio.Group className="orderSecond" size="large" value={this.state.size} onChange={this.onChange.bind(this, 'size')}>
                {size}
            </Radio.Group>
          </div>
          <div className="column is-3"> Sugar
          <Radio.Group className="orderSecond" size="large" value={this.state.sugar} onChange={this.onChange.bind(this, 'sugar')}>
              {suagar}
              </Radio.Group>
          </div>
          {product.Adons.map(d=>{
            return <div className="column is-3">{d.AdonsTitle} 
            {
              d.AdonsDetails.map(s=>
                {
                  return <Radio.Group className="orderSecond" size="large" value={this.state[d.AdonsTitle]} onChange={this.onChange.bind(this, d.AdonsTitle)}>
                  <Radio.Button  value={s.name + ' +' +s.price + 'Tk'}/>
              </Radio.Group>
                }
              )
            }</div>})}
          {/* {product.Adons.map(data => {
            <div className="column">sd{data.AdonsTitle}</div>
          })} */}
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