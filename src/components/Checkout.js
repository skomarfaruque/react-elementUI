import React from 'react'
import { connect } from 'react-redux'
import SiteLayout from './Layout'
import PropTypes from 'prop-types'
import { Button, Radio, Notification, Input  } from 'element-react'

class Checkout extends React.Component{
  constructor (props) {
    super(props)
    this.state = {
      grandTotalPrice: this.props.cartItem.cartItems.length,
      tempProduct: this.props.cartItem.tempProduct,
      allconfig: [],
      quantity: 1,
      paymentType: 'cash',
      phone: this.props.customerPhone || '',
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
      let grandTotal = await props.cartItem.cartItems.map(p=> {
        grandTotalPrice += p.quantity * p.totalPrice
      })
      this.setState({grandTotalPrice})
    } else {
      this.context.router.history.push('order-first-step')
    }
   
  }
  async componentWillMount () {
    document.title = "Checkout"
    console.log(this.props)
    await this.upateGrandTotalPrice()
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

  async checkPreviousHistory () {
    console.log('sd')
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


  render () {
    let cardInput = <div className="columns home-screen marginTop cardNumber is-mobile"><Input type="password" placeholder="Last 4 Digit"/></div>
    let cardNumber = this.state.paymentType === 'card' ? cardInput : ''
    return (
      <SiteLayout>
        <div className="columns marginTop marginLeft is-mobile" key="ck">
          <div className="column is-4 home-screen" >
            <div className="columns">
              <Input placeholder="Phone number"  value={this.state.phone} type="number"/>
            </div>
            <div className="columns is-mobile">
              <Button type="primary customButton marginTop" onClick={this.checkPreviousHistory.bind(this)}>Check</Button>
            </div>
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
            </div>
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
            <div className="columns">
              <Input disabled placeholder="Amount" value={this.state.grandTotalPrice}/>
            </div>
          </div>
        </div>
        <div className="stickyConfirm">
          <Button type="primary customButton" onClick={this.checkPreviousHistory.bind(this)}>Confirm</Button>
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
  customerPhone: state.cus.phone
})

const mapDispatchToProps = dispatch => ({
  cart: (cartItems) => dispatch({ type: 'cartItems', cartItems }),
})
export default connect(mapStateToProps, mapDispatchToProps)(Checkout)