import Todo from './Todo';
import React, { memo } from 'react';
import { connect, Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreatos } from '../../actions/Todo/TodoAction';

const mapStateToProps = (state) => ({
  todoLists: state.toDos.todoItems,
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      getTodoLists: actionCreatos.getTodoLists,
      saveTodoItem: actionCreatos.saveTodoItem,
    },
    dispatch,
  );

export default memo(connect(mapStateToProps, mapDispatchToProps)(Todo));
