import Todo from './Todo';
import React, { memo } from 'react';
import { connect, Provider } from 'react-redux';

const mapStateToProps = (state) => {};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch({ type: 'FETCH_DATA', payload: { testObject: 'test' } }),
  };
};

export default memo(connect(mapStateToProps, mapDispatchToProps)(Todo));
