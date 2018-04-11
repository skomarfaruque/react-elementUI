import React from 'react';
import { connect } from 'react-redux';
import SiteLayout from './Layout';
import createStore from '../store';

import { Button, Input, Radio, Layout, Breadcrumb } from 'element-react';
import '../style.css'
import 'element-theme-default';
class Home extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      radio3: 'New User',
      radio4: 'Old User'
    }
  }
  componentWillMount () {
    document.title = "Home || Order selection";
  }
  onChange(key, value) {
    this.setState({
      [key]: value
    });
  }
  startBooking () {
    this.props.history.push("/order-first-step");
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
    };
    return (
      <SiteLayout>
        <Breadcrumb separator="/">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
        <Layout.Row type="flex">
        
          <Layout.Col style={styles.marginTop}>
            <Layout.Row type="flex">
              <Radio.Group size="large" value={this.state.radio3} onChange={this.onChange.bind(this, 'radio3')} className="homeScreen">
                <Radio.Button value="New User" />
                <Radio.Button value="Old User" />
              </Radio.Group>
            </Layout.Row>

            <Layout.Row type="flex" style={styles.inputBox} className="home-screen">
              <Layout.Col  offset="0">
                <Input placeholder="Phone number" type="number"/>
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
  slidedVal: state.amountReducer.value
})

const mapDispatchToProps = dispatch => ({
  addSliderValue: (value) => dispatch({ type: 'storeAmount', value }),
})

export default Home