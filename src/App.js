import React, { Component } from 'react';
import { withRouter, BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import NavBarUI from './components/UIcomponents/NavBarUI';
import Suppliers from './components/suppliers/Suppliers';
import SupplierView from './components/suppliers/SupplierView'
import Components from './components/components/Components';
import Projects from './components/projects/projects';
import ProjectView from './components/projects/ProjectView'
import Login from './components/authentication/login';
import AuthenticationComponent from './AuthenticationComponent';
import './App.css';

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
              <Route exact path="/suppliers" component={Suppliers} />
              <Route path="/suppliers/:id" component={SupplierView} />
              <Route path="/components" component={Components} />
              <Route exact path="/projects" component={Projects} />
              <Route exact path="/projects/:id" component={ProjectView} />
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
  <Container className="py-5">
    <h1 className="h6 mb-4">Getting Started</h1>
    <Row>
      <Col lg="3">
        <Link className='btn btn-primary p-4 text-center w-100 disabled' to={`/`} disabled>
          <i className="fas fa-shipping-fast fa-2x mb-3"></i>
          <span className="d-block h4 mb-0">Orders</span>
        </Link>
      </Col>
      <Col lg="3">
        <Link className='btn btn-primary p-4 text-center w-100' to={`/projects`}>
          <i className="fas fa-project-diagram fa-2x mb-3"></i>
          <span className="d-block h4 mb-0">Projects</span>
        </Link>
      </Col>
      <Col lg="3">
        <Link className='btn btn-primary p-4 text-center w-100' to={`/components`}>
          <i className="fas fa-bolt fa-2x mb-3"></i>
          <span className="d-block h4 mb-0">Components</span>
        </Link>
      </Col>
      <Col lg="3">
        <Link className='btn btn-primary p-4 text-center w-100' to={`/suppliers`}>
          <i className="fas fa-industry fa-2x mb-3"></i>
          <span className="d-block h4 mb-0">Suppliers</span>
        </Link>
      </Col>
    </Row>
  </Container>
)

export default withRouter(App);
