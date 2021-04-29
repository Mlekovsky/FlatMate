import React, { FC, useCallback, useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { IAssignableUserDto, IReactSelectOption } from '../../types/common';
import { map } from 'lodash';
import Select from 'react-select';

export interface IReceiptPosition {
  id: number;
  receiptId: number;
  product: string;
  value: number;
  assignedUsers: IAssignableUserDto[];
  options: IReactSelectOption[];
  onUpdatePositionHandler: (id: number, value: number, product: string, assignedUsersId: number[]) => void;
  onDeletePositionHandler: (id: number) => void;
}

export const ReceiptPosition: FC<IReceiptPosition> = ({
  id,
  receiptId,
  product,
  value,
  assignedUsers,
  options,
  onUpdatePositionHandler,
  onDeletePositionHandler,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [userId, setUserId] = useState([]);
  const [title, setTitle] = useState(product);
  const [currentValue, setCurrentValue] = useState(value);
  const [currentUsers, setCurrentUsers] = useState([]);

  useEffect(() => {
    setCurrentUsers(
      Array.isArray(assignedUsers)
        ? assignedUsers.map((item) => {
            return { label: item.user, value: item.userId };
          })
        : [],
    );
  }, [assignedUsers]);

  const toggleEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit]);

  const onOptionSelect = useCallback(
    (value: IReactSelectOption[]) => {
      setUserId(Array.isArray(value) ? value.map((x) => x.value) : []);
      setCurrentUsers(
        Array.isArray(value)
          ? value.map((item) => {
              return { label: item.label, value: item.value };
            })
          : [],
      );
    },
    [userId, currentUsers],
  );

  const onDeleteHandler = useCallback(() => {
    onDeletePositionHandler(id);
  }, [id]);

  const onUpdateHandler = useCallback(() => {
    onUpdatePositionHandler(id, currentValue, title, userId);
  }, [title, currentValue, userId, id]);

  let productLabel;
  let userLabel;
  let buttons;
  let valueLabel;

  if (isEdit) {
    productLabel = (
      <>
        <Form.Control type="name" value={title} onChange={(e) => setTitle(e.target.value)} />
      </>
    );
    valueLabel = (
      <>
        <Form.Control
          type="number"
          value={currentValue}
          onChange={(e) => setCurrentValue(parseFloat(e.target.value))}
        />
      </>
    );

    userLabel = (
      <>
        <Select options={options} onChange={onOptionSelect} value={currentUsers} isMulti isClearable></Select>
      </>
    );
    buttons = (
      <>
        <button className="btn btn-success todo-buttons" onClick={onUpdateHandler}>
          <i className="fas fa-check"></i>
        </button>
        <button className="btn btn-secondary todo-buttons" onClick={toggleEdit}>
          <i className="fas fa-times"></i>
        </button>
      </>
    );
  } else {
    productLabel = <>{product}</>;
    valueLabel = <>{value}</>;
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
        <button className="btn btn-danger todo-buttons" onClick={onDeleteHandler}>
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
            <Col xs={3}>{productLabel}</Col>
            <Col xs={3}>{valueLabel}</Col>
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
