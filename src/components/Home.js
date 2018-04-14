import React from 'react'
import SiteLayout from './Layout'
import { connect } from 'react-redux'
import { Button, Input, Radio, Layout, Breadcrumb } from 'element-react'
import '../style.css'
import 'element-theme-default'
class Home extends React.Component{
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
        <Breadcrumb separator="/">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
        <div className="columns">
          <div className="column is-4">
            <div className="columns marginTop">
              <Radio.Group size="large" value={this.state.customerType} onChange={this.onChange.bind(this, 'customerType')} className="homeScreen">
                <Radio.Button value="New" />
                <Radio.Button value="Old" />
              </Radio.Group>
            </div>
            <div className="columns home-screen marginTop">
              <Input placeholder="Phone number" type="number" value={this.state.phone} onChange={this.onChange.bind(this, 'phone')}/>
            </div>
            <div className="columns marginTop">
              <Button type="primary"  style={styles.submitButton} onClick={this.startBooking.bind(this)}>Next</Button>
            </div>
          </div>
          <div className="column is-8" style={{height: '30rem', overflow: 'scroll', scrollBehavior: 'smooth'}}>
            <div className="columns marginTop marginLeft is-mobile">
              <nav className="panel history">
                <p className="panel-heading">
                  <span>12-12-2017</span><span className="marginLeftOrderId">TONG123</span>
                </p>
                <div className="panel-block">
                  <div className="columns marginTopBottom ">
                    <div className="column is-1 has-text-weight-semibold" style={{marginTop: '1.5rem'}}>
                      <span className="quantityCurve">6</span>
                    </div>
                    <div className="column is-6" style={{marginTop: '1.2rem'}}>
                      <div className="columns has-text-weight-bold">Lemon Tea</div>
                      <div className="columns">
                      Size: Medium, Sugar: 1Spoon, Adons: sample1, sample2
                      </div>
                    </div>
                    <div className="column is-1" style={{marginTop: '1.5rem'}}>80Tk</div>
                    <div className="column is-4"><Button size="small customButton" type="success">RE ORDER</Button></div>
                  </div>
                </div>
              
                <div className="panel-block">
                  <div className="columns marginTopBottom ">
                    <div className="column is-1 has-text-weight-semibold" style={{marginTop: '1.5rem'}}>
                      <span className="quantityCurve">6</span>
                    </div>
                    <div className="column is-6" style={{marginTop: '1.2rem'}}>
                      <div className="columns has-text-weight-bold">Lemon Tea</div>
                      <div className="columns">
                      Size: Medium, Sugar: 1Spoon, Adons: sample1, sample2
                      </div>
                    </div>
                    <div className="column is-1" style={{marginTop: '1.5rem'}}>80Tk</div>
                    <div className="column is-4"><Button size="small customButton" type="success">RE ORDER</Button></div>
                  </div>
                </div>
              
                <div className="panel-block">
                  <div className="columns marginTopBottom ">
                    <div className="column is-1 has-text-weight-semibold" style={{marginTop: '1.5rem'}}>
                      <span className="quantityCurve">6</span>
                    </div>
                    <div className="column is-6" style={{marginTop: '1.2rem'}}>
                      <div className="columns has-text-weight-bold">Lemon Tea</div>
                      <div className="columns">
                      Size: Medium, Sugar: 1Spoon, Adons: sample1, sample2
                      </div>
                    </div>
                    <div className="column is-1" style={{marginTop: '1.5rem'}}>80Tk</div>
                    <div className="column is-4"><Button size="small customButton" type="success">RE ORDER</Button></div>
                  </div>
                </div>
              
          
              </nav>
            </div>
            <div className="columns marginTop marginLeft is-mobile">
              <nav className="panel history">
                <p className="panel-heading">
                  <span>12-12-2017</span><span className="marginLeftOrderId">TONG123</span>
                </p>
                <div className="panel-block">
                  <div className="columns marginTopBottom ">
                    <div className="column is-1 has-text-weight-semibold" style={{marginTop: '1.5rem'}}>
                      <span className="quantityCurve">6</span>
                    </div>
                    <div className="column is-6" style={{marginTop: '1.2rem'}}>
                      <div className="columns has-text-weight-bold">Lemon Tea</div>
                      <div className="columns">
                      Size: Medium, Sugar: 1Spoon, Adons: sample1, sample2
                      </div>
                    </div>
                    <div className="column is-1" style={{marginTop: '1.5rem'}}>80Tk</div>
                    <div className="column is-4"><Button size="small customButton" type="success">RE ORDER</Button></div>
                  </div>
                </div>
              
                <div className="panel-block">
                  <div className="columns marginTopBottom ">
                    <div className="column is-1 has-text-weight-semibold" style={{marginTop: '1.5rem'}}>
                      <span className="quantityCurve">6</span>
                    </div>
                    <div className="column is-6" style={{marginTop: '1.2rem'}}>
                      <div className="columns has-text-weight-bold">Lemon Tea</div>
                      <div className="columns">
                      Size: Medium, Sugar: 1Spoon, Adons: sample1, sample2
                      </div>
                    </div>
                    <div className="column is-1" style={{marginTop: '1.5rem'}}>80Tk</div>
                    <div className="column is-4"><Button size="small customButton" type="success">RE ORDER</Button></div>
                  </div>
                </div>
              
                <div className="panel-block">
                  <div className="columns marginTopBottom ">
                    <div className="column is-1 has-text-weight-semibold" style={{marginTop: '1.5rem'}}>
                      <span className="quantityCurve">6</span>
                    </div>
                    <div className="column is-6" style={{marginTop: '1.2rem'}}>
                      <div className="columns has-text-weight-bold">Lemon Tea</div>
                      <div className="columns">
                      Size: Medium, Sugar: 1Spoon, Adons: sample1, sample2
                      </div>
                    </div>
                    <div className="column is-1" style={{marginTop: '1.5rem'}}>80Tk</div>
                    <div className="column is-4"><Button size="small customButton" type="success">RE ORDER</Button></div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Home)