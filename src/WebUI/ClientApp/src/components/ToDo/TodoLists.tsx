import React, { FC } from 'react';
import TodoItemInput from './TodoItemInput';
import ToDoListItem from './TodoListItem';
import { isEmpty, map } from 'lodash';
import { ITodosVM } from '../../types/ToDoItem';
import { Col, Container, Row } from 'react-bootstrap';
import { TodoListHeader } from './TodoListHeader';

export interface ITodoLists {
  todoLists: ITodosVM[];
  onSaveHandler: (value: string, listId: number) => void;
  onDeleteHandler: (listId: number) => void;
}

export const TodoLists: FC<ITodoLists> = ({ todoLists, onSaveHandler, onDeleteHandler }) => {
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
                        <TodoListHeader id={fs.id} title={fs.title} onDeleteHandler={onDeleteHandler}></TodoListHeader>
                        <Row>
                          <Col xs={12}>
                            <div className="todo-list">
                              {map(fs.items, (item, i) => {
                                return <ToDoListItem done={item.done} value={item.title} />;
                              })}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12}>
                            <div className="input-container">
                              <TodoItemInput listId={fs.id} onSave={onSaveHandler} />
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
