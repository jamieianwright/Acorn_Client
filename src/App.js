import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Suppliers from './Suppliers';

class App extends Component {
  render() {
    return (
      <div>
      <header>
        <div className="container">
          <div className="row">
            <div className="col-auto">
              <ul className="list-inline">
                <li className="list-inline-item"><Link to="/">Dashboard</Link></li>
                <li className="list-inline-item"><Link to="/suppliers">Suppliers</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </header>
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
  <div>Page not found!</div>
)

const Home = () => (
  <div>Dashboard coming soon!</div>
)

export default App;
