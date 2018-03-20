import React from 'react';
import { Button, Form, Input, Layout } from 'element-react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import 'element-theme-default';
class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      form: {
        pass: '',
        checkPass: '',
        age: ''
      },
      rules: {
        pass: [
          { required: true, message: 'Please input the User name', trigger: 'blur' },
          { validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('Please input the password'));
            } else {
              if (this.state.form.checkPass !== '') {
                this.refs.form.validateField('checkPass');
              }
              callback();
            }
          } }
        ],
        checkPass: [
          { required: true, message: 'Please input the Password', trigger: 'blur' },
          { validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('Please input the password again'));
              } else {
                callback();
              }
            }
          }
        ]
      }
    };
  }
  componentWillMount () {
    document.title = "Login";
  }
  
  handleSubmit(e) {
    e.preventDefault();
  
    this.refs.form.validate((valid) => {
      if (valid) {
        this.props.history.push("/home")
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }
  
  handleReset(e) {
    e.preventDefault();
  
    this.refs.form.resetFields();
  }
  
  onChange(key, value) {
    this.setState({
      form: Object.assign({}, this.state.form, { [key]: value })
    });
  }
  
  render() {
    return (
      <div>
        <Layout.Row gutter="20">
          <Layout.Col span="6" offset="8">
            <div className="grid-content bg-purple"><img src={require('../logo.png')} /></div>
          </Layout.Col>
        </Layout.Row>
        <Layout.Row gutter="20">
          <Layout.Col span="6" offset="7">
            <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="100" className="demo-ruleForm">
              <Form.Item label="User name" prop="pass">
                <Input type="text" value={this.state.form.pass} onChange={this.onChange.bind(this, 'pass')} autoComplete="off" />
              </Form.Item>
              <Form.Item label="Password" prop="checkPass">
                <Input type="password" value={this.state.form.checkPass} onChange={this.onChange.bind(this, 'checkPass')} autoComplete="off" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={this.handleSubmit.bind(this)}>Login</Button>
              </Form.Item>
            </Form>
          </Layout.Col>
        </Layout.Row>
      </div>
    )
  }
}
  
export default Login