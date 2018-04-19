import React from 'react'
import { Button, Form, Input, Notification, Message } from 'element-react'
import { connect } from 'react-redux'
import 'element-theme-default'
class Login extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      form: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          { required: true, message: 'Please input the User name', trigger: 'blur' },
          { validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('Please input the User name'));
            } else {
              // if (this.state.form.checkPass !== '') {
              //   this.refs.form.validateField('checkPass');
              // }
              callback();
            }
          } }
        ],
        password: [
          { required: true, message: 'Please input the Password', trigger: 'blur' },
          { validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('Please input the Password'));
              } else {
                callback();
              }
            }
          }
        ]
      }
    };
  }

  
  async handleSubmit(e) {
    e.preventDefault();
  
    await this.refs.form.validate(async (valid) => {
      if (valid) {
        await this.login()
        
      } else {
        console.log('error submit!!')
        return false;
      }
    });
  }
  async login () {
    let body = JSON.stringify({UserName: this.state.form.userName, Password: this.state.form.password})
    let res = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body
    })
    let result = await res.json()
    if (result.status === 200) {
      this.successNotification()
      await this.props.login(result.user.id)
      this.props.history.push("/home")
    } else if (result.status === 400) {
      this.errorNotification()
    }
  }
  errorNotification() {
    Message({
      title: 'Error',
      message: 'Login Failed',
      type: 'error'
    });
  }
  successNotification() {
    Message({
      title: 'Success',
      message: 'Login success',
      type: 'success'
    });
  }
  handleReset(e) {
    e.preventDefault();
    this.refs.form.resetFields()
  }
  
  onChange(key, value) {
    this.setState({
      form: Object.assign({}, this.state.form, { [key]: value })
    });
  }
  
  render() {
    return (
      <div>
        <div className="container marginTop">
          <div className="columns is-mobile">
            <div className="column has-text-centered"><img style={{width: '100px', height: '100px'}} src={require('../logo.png')} alt="Logo" /></div>
          </div>
          <div className="columns is-mobile">
          <div className="column is-3"></div>
            <div className="column has-text-centered home-screen is-6">
              <Form ref="form" label-position="top" model={this.state.form} rules={this.state.rules}>
                <Form.Item prop="userName">
                  <Input type="text" placeholder="User name" value={this.state.form.userName} onChange={this.onChange.bind(this, 'userName')} autoComplete="off" />
                </Form.Item> 
                <Form.Item prop="password">
                  <Input type="password" placeholder="Password" value={this.state.form.password} onChange={this.onChange.bind(this, 'password')} autoComplete="off" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" className="customButton" onClick={this.handleSubmit.bind(this)}>Login</Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  isLoggedIn: state.auth.token
})

const mapDispatchToProps = dispatch => ({
  login: (token) => dispatch({ type: 'Store', token }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login) 
