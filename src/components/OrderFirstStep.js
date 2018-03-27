import React from 'react';
import { connect } from 'react-redux';
import SiteLayout from './Layout';
import { Button, Breadcrumb, Card, Layout, Radio } from 'element-react';

import 'element-theme-default';
class OrderFirstStep extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      radio3: 'All',
      radio4: 'Tea',
      radio4: 'Coffee',
      radio4: 'Coffee2',
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
    document.title = "Category & Products";
  }
  onChange(key, value) {
    this.setState({
      [key]: value
    });
  }

  render () {
    var styles = {
      marginTop: {
        margin: '2%',
        textAlign: 'center'
      }
    };

   let products =  this.state.data.map((productInfo, key) => {
     return  <Layout.Col key= {key} span={ 6 } offset={ 0 } style={styles.marginTop}>
     <Card bodyStyle={{ padding: 0 }}>
       <img src={productInfo.image} className="image" />
       <div style={{ padding: 14, textAlign: 'center' }}>
         <span>{productInfo.name}</span>
         <div className="bottom clearfix">
          10Tk - 1000Tk<hr/>
          <span>Available</span>
         </div>
       </div>
     </Card>
   </Layout.Col>
   }) 
    return (
      <SiteLayout>
        <Breadcrumb separator="/">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Product</Breadcrumb.Item>
        </Breadcrumb>
        <Layout.Row type="flex" justify="end"  style={styles.marginTop}>
          <Layout.Col>
              <Radio.Group size="small" value={this.state.radio3} onChange={this.onChange.bind(this, 'radio3')}>
                <Radio.Button value="All" />
                <Radio.Button value="Tea" />
                <Radio.Button value="Coffee" />
                <Radio.Button value="Coffee2" />
              </Radio.Group>
          </Layout.Col>
      </Layout.Row>
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

export default OrderFirstStep