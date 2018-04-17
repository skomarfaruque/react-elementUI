import React from 'react'
import SiteLayout from './Layout'
import { connect } from 'react-redux'
import { Button, Input, Radio, Layout, Breadcrumb } from 'element-react'
import '../style.css'
import 'element-theme-default'
class PendingOrders extends React.Component{
  constructor (props) {
    super(props)
    this.state = {
      customerType: 'New',
      phone: this.props.customerPhone || ''
    }
  }
  componentDidMount () {
    console.log('homedata', this.props)
  }
  onChange(key, value) {
    this.setState({
      [key]: value
    })
  }
  async startBooking () {
    if (!this.state.phone) {
      await this.props.history.push('/order-first-step')
    }
    let body = JSON.stringify({PhoneNumber: this.state.phone})
    let res = await fetch(`http://52.14.91.110:8080/admin/lookup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body
    })
    let result = await res.json()
    await this.props.cus(result)
    if (result.userType === 1) {
      await this.props.history.push('/order-first-step')
    } else {
      console.log('Old customer')
      console.log(this.props)
    }
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
          <div className="column" style={{height: '30rem', overflow: 'scroll', scrollBehavior: 'smooth'}}>
            <div className="columns marginTop is-mobile">
              <nav className="panel history">
                <p className="panel-heading">
                  <span>12-12-2017</span><span className="marginLeftOrderId">TONG123</span>
                </p>
                <div className="panel-block">
                  <div className="columns marginTopBottom ">
                    <div className="column is-1 has-text-weight-semibold" >
                      <span className="quantityCurve">6</span>
                    </div>
                    <div className="column is-5" >
                      <div className="columns has-text-weight-bold fontSizeOneRem">Lemon Tea</div>
                      <div className="columns fontSizeOneRem">
                      Size: Medium, Sugar: 1Spoon, Adons: sample1, sample2
                      </div>
                    </div>
                    <div className="column is-3"><Button size="small customButton" type="warning">IN PROGRESS</Button></div>
                    <div className="column is-3"><Button size="small customButton" type="success">DONE</Button></div>
                  </div>
                </div>
              
                <div className="panel-block">
                  <div className="columns marginTopBottom ">
                    <div className="column is-1 has-text-weight-semibold" >
                      <span className="quantityCurve">6</span>
                    </div>
                    <div className="column is-5" >
                      <div className="columns has-text-weight-bold fontSizeOneRem">Lemon Tea</div>
                      <div className="columns fontSizeOneRem">
                      Size: Medium, Sugar: 1Spoon, Adons: sample1, sample2
                      </div>
                    </div>
                    <div className="column is-3"><Button size="small customButton" type="warning">IN PROGRESS</Button></div>
                    <div className="column is-3"><Button size="small customButton" type="success">DONE</Button></div>
                  </div>
                </div>
              </nav>
            </div>
            <div className="columns marginTop is-mobile">
              <nav className="panel history">
                <p className="panel-heading">
                  <span>12-12-2017</span><span className="marginLeftOrderId">TONG123</span>
                </p>
                <div className="panel-block">
                  <div className="columns marginTopBottom ">
                    <div className="column is-1 has-text-weight-semibold" >
                      <span className="quantityCurve">6</span>
                    </div>
                    <div className="column is-5" >
                      <div className="columns has-text-weight-bold fontSizeOneRem">Lemon Tea</div>
                      <div className="columns fontSizeOneRem">
                      Size: Medium, Sugar: 1Spoon, Adons: sample1, sample2
                      </div>
                    </div>
                    <div className="column is-3"><Button size="small customButton" type="warning">IN PROGRESS</Button></div>
                    <div className="column is-3"><Button size="small customButton" type="success">DONE</Button></div>
                  </div>
                </div>
              
                <div className="panel-block">
                  <div className="columns marginTopBottom ">
                    <div className="column is-1 has-text-weight-semibold" >
                      <span className="quantityCurve">6</span>
                    </div>
                    <div className="column is-5" >
                      <div className="columns has-text-weight-bold fontSizeOneRem">Lemon Tea</div>
                      <div className="columns fontSizeOneRem">
                      Size: Medium, Sugar: 1Spoon, Adons: sample1, sample2
                      </div>
                    </div>
                    <div className="column is-3"><Button size="small customButton" type="warning">IN PROGRESS</Button></div>
                    <div className="column is-3"><Button size="small customButton" type="success">DONE</Button></div>
                  </div>
                </div>
              </nav>
            </div>

    
          </div>
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