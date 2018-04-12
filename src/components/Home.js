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
    console.log(this.props)
  }
  componentWillMount () {
    document.title = "Home || Customer selection"
  }
  onChange(key, value) {
    this.setState({
      [key]: value
    })
  }
  async startBooking () {
    await this.props.cus(this.state.phone)
    this.props.history.push(`${this.state.customerType === 'New' ? '/order-first-step': 'customer-history'}`)
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
          <div className="column is-8">
            <div className="columns marginTop marginLeft is-mobile">
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
            </div>
        </div>
    
      </SiteLayout>
    )
  }
}
const mapStateToProps = state => ({
  customerPhone: state.cus.phone
})
const mapDispatchToProps = dispatch => ({
  cus: (phone) => dispatch({ type: 'StoreCus', phone }),
})
export default connect(mapStateToProps, mapDispatchToProps)(Home)