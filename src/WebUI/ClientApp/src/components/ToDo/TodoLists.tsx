import React, { FC } from 'react';
import TodoItemInput from './TodoItemInput';
import ToDoListItem from './TodoListItem';
import { isEmpty, map } from 'lodash';
import { ITodosVM } from '../../types/ToDoItem';
import { Col, Container, Row } from 'react-bootstrap';
import { TodoListHeader } from './TodoListHeader/TodoListHeader';
import { IReactSelectOption } from '../../types/common';

export interface ITodoLists {
  todoLists: ITodosVM[];
  onSaveHandler: (value: string, listId: number, userId: number) => void;
  onDeleteHandler: (listId: number) => void;
  onEditHandler: (title: string, id: number) => void;
  options: IReactSelectOption[];
  onTodoItemStatusUpdateHandler: (id: number, done: boolean) => void;
  onTodoItemDetailsUpdateHandler: (id: number, listId: number, title: string, assignedUserId: number) => void;
  onTodoItemDeleteHandler: (id: number) => void;
}

export const TodoLists: FC<ITodoLists> = ({
  todoLists,
  onSaveHandler,
  onDeleteHandler,
  onEditHandler,
  options,
  onTodoItemDeleteHandler,
  onTodoItemDetailsUpdateHandler,
  onTodoItemStatusUpdateHandler,
}) => {
  return (
    <>
      <div className="container">
        <div className="row">
          {!isEmpty(todoLists.lists) &&
            map(todoLists.lists, (fs, index) => {
              return (
                <>
                  <div className="col-6" style={{ paddingBottom: 20 }} key={index}>
                    <Container>
                      <div className="card">
                        <TodoListHeader
                          id={fs.id}
                          title={fs.title}
                          onDeleteHandler={onDeleteHandler}
                          onEditHandler={onEditHandler}
                        ></TodoListHeader>
                        <Row>
                          <Col xs={12}>
                            <div className="todo-list">
                              {map(fs.items, (item, i) => {
                                return (
                                  <ToDoListItem
                                    id={item.id}
                                    done={item.done}
                                    value={item.title}
                                    assignedUser={item.assignedUser}
                                    assignedUserId={item.assignedUserId}
                                    listId={fs.id}
                                    onTodoItemDeleteHandler={onTodoItemDeleteHandler}
                                    onTodoItemDetailsUpdateHandler={onTodoItemDetailsUpdateHandler}
                                    onTodoItemStatusUpdateHandler={onTodoItemStatusUpdateHandler}
                                    options = {options}
                                  />
                                );
                              })}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12}>
                            <div className="input-container">
                              <TodoItemInput listId={fs.id} onSave={onSaveHandler} options={options} />
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Container>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};
