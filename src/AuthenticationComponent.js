import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class AuthenticatedComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jwt: undefined
    };
  }

  componentDidMount() {
    const jwt = localStorage.getItem('login-jwt');
    if (!jwt) {
      this.props.history.push('/login');
    }

    axios.get(process.env.REACT_APP_API_BASE_URL + 'getUser', { headers: { Authorization: `Bearer ${jwt}` } })
    .then(res => this.setState({
      jwt: res.data
    })).catch(err => {
      localStorage.removeItem('login-jwt');
      this.props.history.push('/login');
    });
  }

  render() {
    if (this.state.jwt === undefined) {
      return (
        <div><h1>Loading...</h1></div>
      );
    }

    return (
      <div>
        {this.props.children}
      </div>
    );
  }

}

export default withRouter(AuthenticatedComponent);