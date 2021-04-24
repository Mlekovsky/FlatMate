import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import classnames from 'classnames';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { IReactSelectOption } from '../../types/common';
import Select from 'react-select';

interface ITodoListItem {
  value: string;
  done: boolean;
  id: number;
  assignedUser: string;
  assignedUserId: number;
  listId: number;
  onTodoItemStatusUpdateHandler: (id: number, done: boolean) => void;
  onTodoItemDetailsUpdateHandler: (id: number, listId: number, title: string, assignedUserId: number) => void;
  onTodoItemDeleteHandler: (id: number) => void;
  options: IReactSelectOption[];
}

const ToDoListItem: FC<ITodoListItem> = ({
  value,
  done,
  onTodoItemStatusUpdateHandler,
  onTodoItemDeleteHandler,
  onTodoItemDetailsUpdateHandler,
  id,
  assignedUser,
  assignedUserId,
  options,
  listId
}) => {
  const updateStatusHandler = useCallback(() => {
    onTodoItemStatusUpdateHandler(id, !done);
  }, [done]);

  const [isEdit, setIsEdit] = useState(false);
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState({label: '', value:0});

  const toggleEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit]);

  const onOptionSelect = useCallback(
    (value: IReactSelectOption) => {
      setUserId(value.value);
      setSelectedUser({value: value.value, label: value.label});
    },
    [userId],
  );

  const deleteHandler = useCallback(() => {
    onTodoItemDeleteHandler(id);
  }, [id]);

  const onEditHandler = useCallback(() => {
    onTodoItemDetailsUpdateHandler(id, listId, title, userId);
    toggleEdit();
  }, [userId, id, title, listId]);

  let taskLabel;
  let userLabel;
  let buttons;

  if (isEdit) {
    taskLabel = (
      <>
        <Form.Control type="name" value={title} onChange={(e) => setTitle(e.target.value)} />
      </>
    );

    userLabel = (
      <>
        <Select options={options} onChange={onOptionSelect} value={selectedUser}></Select>
      </>
    );
    buttons = (
      <>
        <button className="btn btn-success todo-buttons" onClick={onEditHandler}>
          <i className="fas fa-check"></i>
        </button>
        <button className="btn btn-secondary todo-buttons" onClick={toggleEdit}>
          <i className="fas fa-times"></i>
        </button>
      </>
    );
  } else {
    taskLabel = <>{value}</>;
    userLabel = <>{assignedUser}</>;
    buttons = (
      <>
        <button className="btn btn-warning todo-buttons" onClick={toggleEdit}>
          <i className="far fa-edit"></i>
        </button>
        <button className="btn btn-danger todo-buttons" onClick={deleteHandler}>
          <i className="fas fa-trash"></i>
        </button>
      </>
    );
  }

  useEffect(() => {
    setUserId(assignedUserId);
    setTitle(value);
    setSelectedUser({value: assignedUserId, label: assignedUser});
  }, []);

  return (
    <li className="list-item">
      <Container>
        <Row>
          <Col xs={1}>
            <i
              onClick={updateStatusHandler}
              className={classnames(
                'status-box',
                { 'fas fa-check-circle': done == true },
                { 'far fa-check-circle': done == false },
              )}
            ></i>
          </Col>
          <Col xs={5}>{taskLabel}</Col>
          <Col xs={4} className="task-owner">
            {userLabel}
          </Col>
          <Col xs={2}>{buttons}</Col>
        </Row>
      </Container>
    </li>
  );
};

export default memo(ToDoListItem);
