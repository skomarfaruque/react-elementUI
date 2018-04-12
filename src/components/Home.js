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
    this.props.history.push(`${this.state.customerType === 'New' ? '/order-first-step': 'checkout'}`)
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
        <Layout.Row type="flex">
        
          <Layout.Col style={styles.marginTop}>
            <Layout.Row type="flex">
              <Radio.Group size="large" value={this.state.customerType} onChange={this.onChange.bind(this, 'customerType')} className="homeScreen">
                <Radio.Button value="New" />
                <Radio.Button value="Old" />
              </Radio.Group>
            </Layout.Row>

            <Layout.Row type="flex" style={styles.inputBox} className="home-screen">
              <Layout.Col  offset="0">
                <Input placeholder="Phone number" type="number" value={this.state.phone} onChange={this.onChange.bind(this, 'phone')}/>
              </Layout.Col>
            </Layout.Row>

            <Layout.Row type="flex" style={styles.submitButtonDiv}>
              <Layout.Col  offset="0">
               <Button type="primary"  style={styles.submitButton} onClick={this.startBooking.bind(this)}>Next</Button>
              </Layout.Col>
            </Layout.Row>

          </Layout.Col>

        </Layout.Row>
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