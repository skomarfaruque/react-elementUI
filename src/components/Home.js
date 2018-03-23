import React from 'react';
import { connect } from 'react-redux';
import SiteLayout from './Layout';
import createStore from '../store';

import { Button, Input, Radio, Layout, Breadcrumb } from 'element-react';

import 'element-theme-default';
const store = createStore();
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

  render () {
    var styles = {
      marginTop: {
        margin: '13% 36%'
      },
      inputBox: {
        width: '209px', marginTop: '10%'
      },
      rightNav: {
      },
      verticalLine: {
      },
    };
    return (
      <SiteLayout>
        <Breadcrumb separator="/">
          <Breadcrumb.Item>Homepage</Breadcrumb.Item>
        </Breadcrumb>
        <Layout.Row type="flex">
        
          <Layout.Col style={styles.marginTop}>
            <Layout.Row type="flex">
              <Radio.Group size="large" value={this.state.radio3} onChange={this.onChange.bind(this, 'radio3')}>
                <Radio.Button value="New User" />
                <Radio.Button value="Old User" />
              </Radio.Group>
            </Layout.Row>

            <Layout.Row type="flex" style={styles.inputBox}>
              <Layout.Col  offset="0">
                <Input placeholder="Phone number"/>
              </Layout.Col>
            </Layout.Row>

            <Layout.Row type="flex" style={styles.inputBox}>
              <Layout.Col  offset="0">
               <Button type="primary" style={{width: '100%'}}>Next</Button>
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