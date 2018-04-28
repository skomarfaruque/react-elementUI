import React from 'react'
import SiteLayout from './Layout'
import { connect } from 'react-redux'
import { Button, Input, Radio, Layout, Breadcrumb } from 'element-react'
import '../style.css'
import 'element-theme-default'
const pendingOrders = [
  {
    saleId: 1,
    sales: [
      {
        saleItemId: 1,
        productId: 1,
        productTitle: 'Demo product 1',
        orderGrandPrice: 120,
        saleQuantity: 2,
        saleStatus: 2,
        addonSummary: 'Milk: 1 spoon, Sugar: 2 spoon'
      },
      {
        saleItemId: 1,
        productId: 1,
        productTitle: 'Demo product 1',
        orderGrandPrice: 10,
        saleQuantity: 2,
        saleStatus: 2,
        addonSummary: 'Sugar: 2 spoon'
      },
      {
        saleItemId: 1,
        productId: 2,
        productTitle: 'Demo product 2',
        orderGrandPrice: 40,
        saleQuantity: 5,
        saleStatus: 3,
        addonSummary: 'TeaBag: 1 spoon, Sugar: 2 spoon, Mint: demo 1, demo2, demo 3'
      }
    ]
  },
  {
    saleId: 2,
    sales: [
      {
        saleItemId: 3,
        productId: 2,
        productTitle: 'Demo product 2',
        orderGrandPrice: 120,
        saleQuantity: 2,
        saleStatus: 1,
        addonSummary: 'Milk: 1 spoon, Sugar: 2 spoon'
      },
      {
        saleItemId: 11,
        productId: 21,
        productTitle: 'Demo product 1',
        orderGrandPrice: 10,
        saleQuantity: 2,
        saleStatus: 2,
        addonSummary: 'Sugar: 2 spoon'
      },
      {
        saleItemId: 211,
        productId: 2,
        productTitle: 'Demo product 2',
        saleGrandPrice: 40,
        saleQuantity: 5,
        saleStatus: 2,
        addonSummary: 'TeaBag: 1 spoon, Sugar: 2 spoon, Mint: demo 1, demo2, demo 3'
      }
    ]
  }

]
class PendingOrders extends React.Component{
  constructor (props) {
    super(props)
    
    
    this.state = {pendingOrders}
  }
  componentDidMount () {
    console.log('homedata', this.state)

  }
  onChange(key, value) {
    this.setState({
      [key]: value
    })
  }
  doneAction = async (key, proKey, type) => { // type 1= cancel
    if (type == 1) {
      pendingOrders[key].sales[proKey].saleStatus = 2
    } else {
      pendingOrders[key].sales[proKey].saleStatus = 1
    }
    await this.setState({pendingOrders})

  }
  inProgressAction = async (key, proKey, type) => { // type 1= cancel
    if (type == 1) {
      pendingOrders[key].sales[proKey].saleStatus = 2
    } else {
      pendingOrders[key].sales[proKey].saleStatus = 3
    }
    await this.setState({pendingOrders})

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
    return (
      <SiteLayout>
        
        <div className="columns pending-orders">
          {this.state.pendingOrders.length ?   <div className="column" style={{height: '30rem', overflow: 'scroll', scrollBehavior: 'smooth'}}>
            {pendingOrders.map((pOrders, key) => {
              return ( <div className="columns marginTop is-mobile">
              <nav className="panel history">
                <p className="panel-heading">
                  <span>Sale id: </span><span className="marginLeftOrderId">{pOrders.saleId}</span>
                </p>
                {pOrders.sales.map((pOrderList, pkey) => {
                  return (  <div className={"panel-block "+ (pOrderList.saleStatus === 3 ? 'inprogress': pOrderList.saleStatus === 1 ? 'done': '')}>
                  <div className="columns marginTopBottom ">
                    <div className="column is-1 has-text-weight-semibold" >
                      <span className="quantityCurve">{pOrderList.saleQuantity}</span>
                    </div>
                    <div className="column is-4">
                      <div className="columns has-text-weight-bold fontSizeOneRem">{pOrderList.productTitle}</div>
                      <div className="columns fontSizeOneRem">
                      {pOrderList.addonSummary}
                      </div>
                    </div>
                    {pOrderList.saleStatus === 2 ? 
                      <div className="columns">
                        <div className="column is-6">
                          <Button size="small customButton" type="warning" onClick={() => this.inProgressAction(key, pkey, 2)}>IN PROGRESS</Button>
                        </div>
                        <div className="column is-6">
                          <Button size="small customButton" type="success"  onClick={() => this.doneAction(key, pkey, 2)}>DONE</Button>
                        </div></div> : ''}
                    {pOrderList.saleStatus === 3 ? 
                      <div className="columns">
                        <div className="column is-6">
                          <Button size="small customButton" type="danger" onClick={() => this.inProgressAction(key, pkey, 1)}>CANCEL PROGRESS</Button>
                        </div>
                        <div className="column is-6">
                          <Button size="small customButton" type="success" onClick={() => this.doneAction(key, pkey, 2)}>DONE</Button>
                        </div></div> : ''}
                    {pOrderList.saleStatus === 1 ? 
                      <div className="columns">
                        <div className="column is-6">
                          <Button size="small customButton" type="danger" disabled onClick={() => this.inProgressAction(key, pkey, 1)}>CANCEL PROGRESS</Button>
                        </div>
                        <div className="column is-6">
                          <Button size="small customButton" type="danger" onClick={() => this.doneAction(key, pkey, 1)}>CANCEL DONE</Button>
                        </div></div> : ''}
                    
                    
                  </div>
                </div>)
                })}
              
              </nav>
            </div>)
            })}
           
          </div> : '<div>Today there is no order</div>'}
        
        </div>
    
      </SiteLayout>
    )
  }
}
const mapStateToProps = state => ({
  customerData: state.cus
})
const mapDispatchToProps = dispatch => ({
  cus: (value) => dispatch({ type: 'StoreCus', value }),
})
export default connect(mapStateToProps, mapDispatchToProps)(PendingOrders)