import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import './custom.css';
import { Login } from './components/Login/Login';
import { Dashboard } from './components/Homepage/Dashboard';
import {FacebookLoginPage} from './components/Login/FacebookLoginPage';
export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={Dashboard} />
          <Route path="/FacebookLoginPage" component={FacebookLoginPage}/>
        </Switch>
      </Layout>
    );
  }
}
