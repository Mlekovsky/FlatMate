import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Home } from '../components/Home';
import { Login } from '../components/Login/Login';
import { Dashboard } from '../components/Homepage/Dashboard';
import { FacebookLoginPage } from '../components/Login/FacebookLoginPage';
import { actionCreators as loaderActionsCreator } from '../actions/common/loaderAction';
import TodoContainer from '../components/ToDo/TodoContainer';

const Routes = () => (
  <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/home" component={Dashboard} />
      <Route path="/FacebookLoginPage" component={FacebookLoginPage} />
      <Route path="/Todo" component={TodoContainer} />
    </Switch>
  </>
);

export default connect(
  (state) => ({}),
  (dispatch) => bindActionCreators({ ...loaderActionsCreator }, dispatch),
)(Routes);
