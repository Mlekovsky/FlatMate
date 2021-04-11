import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Home } from '../components/Home';
import LoginContainer from './User/Login/LoginContainer';
import RegisterContainer from './User/Register/RegisterContainer';
import { Dashboard } from '../components/Homepage/Dashboard';
import { actionCreators as loaderActionsCreator } from '../actions/common/loaderAction';
import TodoContainer from '../components/ToDo/TodoContainer';

const Routes = () => (
  <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={LoginContainer} />
      <Route path="/home" component={Dashboard} />
      <Route path="/Todo" component={TodoContainer} />
      <Route path="/Register" component={RegisterContainer} />
    </Switch>
  </>
);

export default connect(
  (state) => ({}),
  (dispatch) => bindActionCreators({ ...loaderActionsCreator }, dispatch),
)(Routes);
