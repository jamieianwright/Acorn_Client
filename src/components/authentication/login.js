import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }


  change(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submit(e) {
    e.preventDefault();
    axios.post(process.env.REACT_APP_API_BASE_URL + 'login', {
        email: this.state.email,
        password: this.state.password
    }).then(res => {
        localStorage.setItem('login-jwt', res.data)
        this.props.onLogIn(localStorage.getItem('login-jwt'))
    }).then(() =>
      this.props.history.go(-2)
    )
  }

  render() {
    console.log(this.props)

    return (
      <div className='container'>
        <form onSubmit={e => this.submit(e)} className='form-group'>
        <div className="form-group">
          <label>email</label>
          <input type="text" className="form-control" name="email" onChange={e => this.change(e)} value={this.state.email} />
        </div>
        <div className="form-group">
          <label>password</label>
          <input type="password" className="form-control" name="password" onChange={e => this.change(e)} value={this.state.password} />
        </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);