import { ShoppingList } from './ShoppingList';
import React, { memo } from 'react';
import { connect, Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreatos } from '../../actions/Todo/TodoAction';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({}, dispatch);

export default memo(connect(mapStateToProps, mapDispatchToProps)(ShoppingList));
