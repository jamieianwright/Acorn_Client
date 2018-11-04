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
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
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
            </Collapse>
          </Container>
        </Navbar>
      <main>
        
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
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

export default App;
