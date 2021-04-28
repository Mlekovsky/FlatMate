import React, { FC, useCallback, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { IAssignableUserDto, IReactSelectOption } from '../../types/common';
import { isEmpty, map } from 'lodash';
import Select from 'react-select';

export interface IReceiptPosition {
  id: number;
  receiptId: number;
  product: string;
  value: number;
  assignedUsers: IAssignableUserDto[];
  options: IReactSelectOption[];
}

export const ReceiptPosition: FC<IReceiptPosition> = ({ id, receiptId, product, value, assignedUsers, options }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [currentValue, setCurrentValue] = useState(0);
  const [selectedUser, setSelectedUser] = useState({ label: '', value: 0 });

  const toggleEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit]);

  const onOptionSelect = useCallback(
    (value: IReactSelectOption) => {
      setUserId(value.value);
      setSelectedUser({ value: value.value, label: value.label });
    },
    [userId],
  );

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
        <button className="btn btn-success todo-buttons">
          <i className="fas fa-check"></i>
        </button>
        <button className="btn btn-secondary todo-buttons" onClick={toggleEdit}>
          <i className="fas fa-times"></i>
        </button>
      </>
    );
  } else {
    taskLabel = <>{value}</>;
    userLabel = (
      <>
        {map(assignedUsers, (item, index) => {
          return <p key={index}>{item.user}</p>;
        })}
      </>
    );
    buttons = (
      <>
        <button className="btn btn-warning todo-buttons" onClick={toggleEdit}>
          <i className="far fa-edit"></i>
        </button>
        <button className="btn btn-danger todo-buttons">
          <i className="fas fa-trash"></i>
        </button>
      </>
    );
  }

  return (
    <>
      <li className="list-item">
        <Container>
          <Row>
            <Col xs={3}>{product}</Col>
            <Col xs={3}>{value}</Col>
            <Col xs={4} className="task-owner">
              {userLabel}
            </Col>
            <Col xs={2}>{buttons}</Col>
          </Row>
        </Container>
      </li>
    </>
  );
};
