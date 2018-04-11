import React from 'react';
import { connect } from 'react-redux';
import SiteLayout from './Layout';
import { Button, Breadcrumb, Layout, Radio, Table, Tag, Checkbox, Notification, Input  } from 'element-react';

import 'element-theme-default';
import { isArray } from 'util';

class OrderSecondStep extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      totalPrice: 0,
      tempProduct: this.props.cartItem.tempProduct,
      allconfig: [],
      quantity: 1,
      paymentType: 'cash',
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
  async componentWillMount () {
    document.title = "Checkout";
    let pro = this.props.cartItem.tempProduct
  }
  async componentDidMount () {
  //  console.log(this.props)
  }
  onChange(key, value) {
    this.setState({
      [key]: value
    });
  }

  async checkPreviousHistory () {
console.log('sd')
  }

  breadCrumbAction (val) {
    this.props.history.push(val);
  }
  successNotification() {
    Notification({
      title: 'Success',
      message: 'Item is added to cart',
      type: 'success'
    });
  }


  render () {
    var styles = {
      marginTop: {
        margin: '3%',
        textAlign: 'left'
      }
    }
    console.log(this.state.paymentType)
    let cardInput = <div className="columns home-screen marginTop cardNumber"><Input placeholder="Last 4 Digit"/></div>
    let cardNumber = this.state.paymentType === 'card' ? cardInput : ''
    return (
      <SiteLayout>
        <div className="columns is-right" key="price">
          <div className="column has-text-right">Payable: <Tag>{this.state.totalPrice} Tk</Tag> </div>
        </div>
        <div className="columns" key="ck">
          <div className="column is-4 home-screen">
            <div className="columns">
              <Input placeholder="Phone number"/>
            </div>
            <div className="columns">
              <Button type="primary customButton marginTop" onClick={this.checkPreviousHistory.bind(this)}>Check</Button>
            </div>
            <div className="columns marginTop">
              <nav className="panel history">
                <p className="panel-heading">
                  <span>12-12-2017</span><span className="marginLeft">TONG123</span>
                </p>
                <div className="panel-block">
                  <div className="columns marginTopBottom">
                    <div className="column is-1">1</div>
                    <div className="column is-9">
                      <div className="columns">Lemon Tea</div>
                      <div className="columns">
                      Size: Medium, Sugar: 1Spoon, Adons: sample1, sample2
                      </div>
                    </div>
                    <div className="column is-2">$price</div>
                  </div>
                
                </div>
                <div className="panel-block">
                  <div className="columns marginTopBottom">
                    <div className="column is-1">1</div>
                    <div className="column is-9">
                      <div className="columns">Lemon Tea</div>
                      <div className="columns">
                      Size: Medium, Sugar: 1Spoon, Adons: sample1, sample2
                      </div>
                    </div>
                    <div className="column is-2">$price</div>
                  </div>
                
                </div>
                <div className="panel-block">
                  <div className="columns marginTopBottom">
                    <div className="column is-1">1</div>
                    <div className="column is-9">
                      <div className="columns">Lemon Tea</div>
                      <div className="columns">
                      Size: Medium, Sugar: 1Spoon, Adons: sample1, sample2
                      </div>
                    </div>
                    <div className="column is-2">$price</div>
                  </div>
                
                </div>
              </nav>
            </div>
            <div className="columns marginTop">
              <nav className="panel history">
                <p className="panel-heading">
                  <span>12-12-2017</span><span className="marginLeft">TONG123</span>
                </p>
                <div className="panel-block">
                </div>
              </nav>
            </div>
          </div>
          <div className="column is-4 home-screen">
            <div className="columns">
              <Radio.Group className="orderSecond" size="large" value={this.state.paymentType}  onChange={this.onChange.bind(this, "paymentType")}>
                <Radio.Button key="Cash" value="cash">Cash</Radio.Button>
                <Radio.Button key="Card" value="card">Card</Radio.Button>
              </Radio.Group>
            </div>
             {cardNumber}
          </div>
          <div className="column is-4  home-screen">
            <div className="columns">
              <Input placeholder="Amount"/>
            </div>
            <div className="columns marginTop">
              <Input placeholder="Discount"/>
            </div>
            <div className="columns">
              <Button type="primary customButton marginTop" onClick={this.checkPreviousHistory.bind(this)}>Confirm</Button>
            </div>
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
  cart: (cartItems) => dispatch({ type: 'cartItems', cartItems }),
})
export default connect(mapStateToProps, mapDispatchToProps)(OrderSecondStep);  