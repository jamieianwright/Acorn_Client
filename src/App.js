import React, { Component } from 'react';
import { withRouter, BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import NavBarUI from './components/UIcomponents/NavBarUI';
import Suppliers from './components/suppliers/Suppliers';
import Components from './components/components/Components';
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
    console.log('Logged Out')
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

    const navBar = (this.props.location.pathname === '/login') ? null : <NavBarUI login_jwt={this.state.login_jwt} onLogOut={this.onLogOut}/>;

    return (
      <BrowserRouter>
      <div>
        {navBar}
      <main>
          <Switch>
            <Route path="/login" render={(props) => <Login onLogIn={this.onLogIn} {...props}/>}/>
            <AuthenticationComponent>
              <Route exact path="/" component={Home} />
              <Route path="/suppliers" component={Suppliers} />
              <Route path="/components" component={Components} />
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
