import React, { FC, useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { IAssignableUserDto, IReactSelectOption } from '../../types/common';

export interface IReceiptHeader {
  id: number;
  title: string;
  date: Date;
  paid: boolean;
  userPaid: IAssignableUserDto;
  options: IReactSelectOption[];
}

export const ReceiptHeader: FC<IReceiptHeader> = ({ id, title, date, options, paid, userPaid }) => {

  const [isEdit, setIsEdit] = useState(false);
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());

  const toggleEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit]);

  useEffect(() => {
    setCurrentTitle(title);
    setCurrentDate(new Date(date));
  }, [title]);

  return (
    <>
      <Row style={{ marginBottom: 10 }}>
        <Col xs={3} className="title-buttons">
          <button className="btn btn-warning" onClick={toggleEdit}>
            <i className="far fa-edit"></i>
          </button>
        </Col>
        <Col xs={6} style={{ textAlign: 'center' }}>
          <Row><h2 className="receipt-title">{title}</h2></Row>
          <Row><h4 className="receipt-title">{new Date(date).toLocaleDateString()}</h4></Row>
        </Col>
        <Col xs={3} className="title-buttons">
          <button className="btn btn-danger">
            <i className="fas fa-trash"></i>
          </button>
        </Col>
      </Row>
    </>
  );
};
