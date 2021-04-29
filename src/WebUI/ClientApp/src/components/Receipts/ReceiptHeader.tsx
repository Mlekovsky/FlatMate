import React, { FC, useCallback, useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Switch from 'react-switch';
import { IAssignableUserDto, IReactSelectOption } from '../../types/common';
import Select from 'react-select';

export interface IReceiptHeader {
  id: number;
  title: string;
  date: Date;
  paid: boolean;
  userPaid: IAssignableUserDto;
  options: IReactSelectOption[];
  onDeleteHandler: (id: number) => void;
  onUpdateHandler: (receiptId: number, title: string, paidBy: number, date: Date) => void;
  onUpdateStatusHandler: (receiptId: number, paid: boolean) => void;
}

export const ReceiptHeader: FC<IReceiptHeader> = ({ id, title, date, options, paid, userPaid, onDeleteHandler, onUpdateHandler, onUpdateStatusHandler }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isPaid, setIsPaid] = useState(paid);
  const [paidBy, setPaidBy] = useState({ label: userPaid?.user, value: userPaid?.userId });
  const [paidById, setPaidById] = useState(userPaid?.userId);

  const handlePaidCheck = (nextChecked) => {
    setIsPaid(nextChecked);
    onUpdateStatusHandler(id, nextChecked);
  };

  const toggleEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit]);

  const onOptionSelect = useCallback(
    (value: IReactSelectOption) => {
      setPaidById(value.value);
      setPaidBy({ value: value.value, label: value.label });
    },
    [paidBy],
  );

  const deleteHandler = useCallback(() => {
    onDeleteHandler(id);
  }, [id]);

  const updateHandler = useCallback(() => {
    onUpdateHandler(id, currentTitle, paidById, currentDate);
    toggleEdit();
  },[id, currentTitle, paidById, currentDate]);

  let titleLabel;
  let dateLabel;
  let paidByLabel;
  let buttons;

  if (isEdit) {
    buttons = (
      <>
        <button className="btn btn-success" onClick={updateHandler} style={{ marginRight: 5 }}>
          <i className="fas fa-check"></i>
        </button>
        <button className="btn btn-secondary" onClick={toggleEdit}>
          <i className="fas fa-times"></i>
        </button>
      </>
    );
    titleLabel = (
      <>
        <Form style={{ marginTop: 10 }}>
          <Form.Control type="name" value={currentTitle} onChange={(e) => setCurrentTitle(e.target.value)} />
        </Form>
      </>
    );
    dateLabel = (
      <>
        {'Data:'}
        <br />
        <Form.Group controlId="formName">
          <Form.Control
            type="date"
            onChange={(e) => setCurrentDate(new Date(e.target.value))}
            defaultValue={new Date(date).toISOString().substr(0, 10)}
          />
        </Form.Group>
      </>
    );
    paidByLabel = (
      <>
        <Form.Group controlId="formName">
          <Select options={options} onChange={onOptionSelect} value={paidBy}></Select>
        </Form.Group>
      </>
    );
  } else {
    buttons = (
      <>
        <button className="btn btn-warning" onClick={toggleEdit}>
          <i className="far fa-edit"></i>
        </button>
      </>
    );
    titleLabel = (
      <>
        <h2 className="receipt-title">{title}</h2>
      </>
    );
    dateLabel = (
      <>
        {'Data:'}
        <br />
        <h4 className="receipt-title">{new Date(date).toLocaleDateString()}</h4>
      </>
    );
    paidByLabel = <>{userPaid?.user}</>;
  }

  useEffect(() => {
    setCurrentTitle(title);
    setCurrentDate(new Date(date));
    setIsPaid(paid);
    setPaidBy({ label: userPaid?.user, value: userPaid?.userId });
    setPaidById(userPaid?.userId);
  }, [title, date, paid, userPaid]);

  return (
    <>
      <Row>
        <Col xs={3} className="title-buttons">
          {buttons}
        </Col>
        <Col xs={6} style={{ textAlign: 'center' }}>
          <Row>{titleLabel}</Row>
          <Row></Row>
        </Col>
        <Col xs={3} className="title-buttons">
          <button className="btn btn-danger" onClick={deleteHandler}>
            <i className="fas fa-trash"></i>
          </button>
        </Col>
      </Row>
      <Row style={{ marginBottom: 10 }}>
        <Col xs={4} style={{ textAlign: 'center' }}>
          Zapłacono:
          <br />
          <Switch onChange={handlePaidCheck} checked={isPaid}></Switch>
        </Col>
        <Col xs={4} style={{ textAlign: 'center' }}>
          {dateLabel}
        </Col>
        <Col xs={4} style={{ textAlign: 'center' }}>
          Płacił:
          <br />
          {paidByLabel}
        </Col>
      </Row>
    </>
  );
};
