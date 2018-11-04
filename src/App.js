import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  } from 'reactstrap';
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

    const AuthenticationNav = (this.state.login_jwt) ? <LogOut onLogOut={this.onLogOut}/> : <LogIn />;

    return (
      <BrowserRouter>
      <div>
        <Navbar color="light" light expand="md">
          <Container>
            <Link to='/' className='navbar-brand text-primary'>Dashboard</Link>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <Link className='nav-link' to='/suppliers'>Suppliers</Link>
                </NavItem>
              </Nav>
              <Nav className="ml-auto">
                {AuthenticationNav}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
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

const LogOut = (props) => (
  <NavItem ><Link onClick={() => props.onLogOut()} to='/'>Log Out</Link></NavItem>
)

const LogIn = () => (
  <NavItem ><Link to='/login'>Log In</Link></NavItem>
)

export default App;
