import React, { Component } from 'react';
import { withRouter, BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import NavBarUI from './components/UIcomponents/NavBarUI';
import Suppliers from './components/suppliers/Suppliers';
import SupplierView from './components/suppliers/SupplierView'
import Components from './components/components/Components';
import Projects from './components/projects/Projects';
import ProjectView from './components/projects/ProjectView'
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
  <Container>Dashboard coming soon!</Container>
)

export default withRouter(App);
