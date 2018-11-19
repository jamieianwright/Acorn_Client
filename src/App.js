import React, { Component } from 'react';
import { withRouter, BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import NavBarUI from './components/NavBarUI';
import Suppliers from './components/suppliers/Suppliers';
import Login from './components/authentication/login';
import AuthenticationComponent from './AuthenticationComponent';

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      login_jwt: undefined
    };
    this.onLogIn = this.onLogIn.bind(this)
    this.onLogOut = this.onLogOut.bind(this)
  }

  componentWillMount(){
    this.setState({
      login_jwt: localStorage.getItem('login-jwt')
    })
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  onLogOut(){
    localStorage.removeItem('login-jwt');
    this.setState({
      login_jwt: undefined
    })
  }

  onLogIn(jwt){
    this.setState({
      login_jwt: jwt
    })
  }

  render() {

    console.log(this.props.location)
    const navBar = (this.props.location.pathname === '/login') ? null : <NavBarUI login_jwt={this.state.login_jwt} onLogOut={this.onLogOut}/>;

    return (
      <BrowserRouter>
      <div>
        {navBar}
      <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" render={(props) => <Login onLogIn={this.onLogIn} {...props}/>}/>
            <AuthenticationComponent>
              <Route path="/suppliers" component={Suppliers} />
            </AuthenticationComponent>
            <Route component={PageNotFound} />
          </Switch>   
      </main>
    </div>
    </BrowserRouter>
    );
  }
}

const PageNotFound = () => (
  <Container>Page not found!</Container>
)

const Home = () => (
  <Container>Dashboard coming soon!</Container>
)

export default withRouter(App);
