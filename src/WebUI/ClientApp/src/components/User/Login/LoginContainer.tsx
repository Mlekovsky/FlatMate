import { Login } from './Login';
import React, { memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreatos } from '../../../actions/user/UserAction';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      loginUser: actionCreatos.loginUser,
    },
    dispatch,
  );

export default memo(connect(mapStateToProps, mapDispatchToProps)(Login));
