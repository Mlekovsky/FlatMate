import Todo from './Todo';
import React, { memo } from 'react';
import { connect, Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreatos } from '../../actions/Todo/TodoAction';

const mapStateToProps = (state) => ({
  todoLists: state.toDos.todoItems,
  apartamentId: state.currentApartament.id
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      getTodoLists: actionCreatos.getTodoLists,
      addTodoList: actionCreatos.createTodoList,
      deleteTodoList: actionCreatos.deleteTodoList,
      updateTodoList: actionCreatos.updateTodoListName,
      saveTodoItem: actionCreatos.saveTodoItem,
      updateTodoItem: actionCreatos.updateTodoItemStatus,
      updateTodoItemDetails: actionCreatos.updateTodoItemDetails,
      deleteTodoItem: actionCreatos.deleteTodoItem
    },
    dispatch,
  );

export default memo(connect(mapStateToProps, mapDispatchToProps)(Todo));
