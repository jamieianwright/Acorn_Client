import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import { Alert } from 'reactstrap';
import axios from 'axios';
import './login.css';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            alertVisible: false,
            alertMessage: ''
        };
    }

    onDismissAlert() {
        this.setState({
            alertVisible: !this.state.alertVisible
        })
    }

    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submit(e) {
        e.preventDefault();
        axios
            .post(process.env.REACT_APP_API_BASE_URL + 'login', {
            email: this.state.email,
            password: this.state.password
        })
            .then(res => {
                localStorage.setItem('login-jwt', res.data)
                this
                    .props
                    .onLogIn(localStorage.getItem('login-jwt'))
            })
            .then(() => this.props.history.go(-2))
            .catch(
                this.setState({alertVisible: true, alertMessage: `Either Email and/or Password are incorrect`})
            )
    }

    render() {

        return (
            <div id='login-background'>
                <div className='wrap-login'>
                    <img className='login-logo' src={require('./logo.png')} alt='acorn logo'></img>
                    <Alert
                        color="danger"
                        isOpen={this.state.alertVisible}
                        toggle={() => this.onDismissAlert()}>
                        {this.state.alertMessage}
                    </Alert>
                    <form onSubmit={e => this.submit(e)} className='form-group login-form'>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="text"
                                className="form-control"
                                name="email"
                                onChange={e => this.change(e)}
                                value={this.state.email}/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                onChange={e => this.change(e)}
                                value={this.state.password}/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    <ul className="slideshow">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);