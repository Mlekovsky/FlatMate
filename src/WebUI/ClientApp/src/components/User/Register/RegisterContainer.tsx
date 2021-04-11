import { Register } from './Register';
import React, { memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreatos } from '../../../actions/user/UserAction';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      registerUser: actionCreatos.registerUser,
    },
    dispatch,
  );

export default memo(connect(mapStateToProps, mapDispatchToProps)(Register));
