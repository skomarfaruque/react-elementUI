import React from 'react';
import { connect } from 'react-redux';
import SiteLayout from './Layout';
import createStore from '../store';

import { Button, Table, Card, Layout } from 'element-react';

import 'element-theme-default';
const store = createStore();
class Home extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      image: 'https://eleme.github.io/element-react/50e4091cc60a.png',
      data: [{
        date: '2016-05-03',
        name: 'Coffee',
        image: 'http://52.14.91.110/pos/uploads/category/thumb/2.jpg',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036'
      }, {
        date: '2016-05-02',
        name: 'Tea',
        image: 'http://52.14.91.110/pos/uploads/category/thumb/1.jpg',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036'
      }]
    }
  }
  componentWillMount () {
    document.title = "Home";
  }

  render () {
   let marginTop = {
     marginTop: '10px'
   }
   let products =  this.state.data.map(productInfo => {
     return  <Layout.Col span={ 6 } offset={ 0 } style={marginTop}>
     <Card bodyStyle={{ padding: 0 }}>
       <img src={productInfo.image} className="image" />
       <div style={{ padding: 14, textAlign: 'center' }}>
         <span>{productInfo.name}</span>
         <div className="bottom clearfix">
         <Button type="primary" size="mini">XL</Button>
         <Button type="primary" size="mini">M</Button>
         <Button type="primary" size="mini">L</Button>
         </div>
       </div>
     </Card>
   </Layout.Col>
   }) 
    return (
      <SiteLayout>
        Products
        <Layout.Row gutter="15">
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

export default Home