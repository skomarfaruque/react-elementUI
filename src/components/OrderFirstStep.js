import React from 'react';
import { connect } from 'react-redux';
import SiteLayout from './Layout';
import { Button, Breadcrumb, Card, Layout, Radio } from 'element-react';

import 'element-theme-default';
require('dotenv');
class OrderFirstStep extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      selectedCategory: 'All',
      image: 'https://eleme.github.io/element-react/50e4091cc60a.png',
      categories: [],
      products: []
    }
  }
  async componentWillMount () {
    document.title = "Category & Products";
    let res = await fetch(`http://52.14.91.110:8080/admin/product/list`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
    let result = await res.json();
    if (result.status === 200) {
      this.setState({categories: result.categories, products: result.categories[0].products})
    }
  }
  // componentDidMount () {
  //   console.log(this.state)
  // }
  async onChange(key, value) {
    let res =  await this.state.categories.find(data => {
      return data.CategoryName === value;
    })
    if (res) {
      this.setState({products: res.products})
    }
    console.log(this.state.products)
    this.setState({
      [key]: value
    });
  }

  render () {
    var styles = {
      marginTop: {
        margin: '3%',
        textAlign: 'left'
      }
    };

   let products =  this.state.products.map((productInfo, key) => {
     return  <Layout.Col key= {key} span="5"  style={{margin: '.1rem'}}>
     <Card bodyStyle={{ padding: 0 }}>
       {/* <img src={productInfo.image} className="image" /> */}
       <div style={{ padding: '6%', textAlign: 'center' }}>
         <span>{productInfo.Name}</span>
         <div className="bottom clearfix">
          10Tk - 1000Tk<hr/>
          <span> <Button type="primary">Order</Button></span>
         </div>
       </div>
     </Card>
   </Layout.Col>
   }) 
     let category =  this.state.categories.map((categoryInfo, key) => {
     return  <Radio.Button value={categoryInfo.CategoryName}/>
    
   }) 
    return (
      <SiteLayout>
        {/* <Breadcrumb separator="/">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Product</Breadcrumb.Item>
        </Breadcrumb> */}
        <Layout.Row type="flex" justify="left"  style={styles.marginTop}>
          <Layout.Col>
              <Radio.Group className="orderFirst" size="large" value={this.state.selectedCategory} onChange={this.onChange.bind(this, 'selectedCategory')}>
                {category}
              </Radio.Group>
          </Layout.Col>
        </Layout.Row>
        <Layout.Row  justify="left" style={{marginLeft: '3%'}}>
        {products}
        </Layout.Row>
      </SiteLayout>
    )
  }
}
const mapStateToProps = state => ({
  slidedVal: state.amountReducer.value
})

const mapDispatchToProps = dispatch => ({
  addSliderValue: (value) => dispatch({ type: 'storeAmount', value }),
})

export default OrderFirstStep