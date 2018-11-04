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
    }).then(() =>
        this.props.history.go(-2)
    )
  }

  render() {
    return (
      <div>
        <form onSubmit={e => this.submit(e)}>
          <label>email</label><input type="text" name="email" onChange={e => this.change(e)} value={this.state.email} />
          <label>password</label><input type="password" name="password" onChange={e => this.change(e)}
                                        value={this.state.password} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);