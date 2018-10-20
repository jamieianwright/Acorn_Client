import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  } from 'reactstrap';
import Suppliers from './Suppliers';

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
      <div>
        <Navbar color="light" light expand="md">
          <Container>
            <Link to='/' className='navbar-brand'>Dashboard</Link>
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
          <Route path="/suppliers" component={Suppliers} />
          <Route component={PageNotFound} />
        </Switch>
      </main>
    </div>
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
