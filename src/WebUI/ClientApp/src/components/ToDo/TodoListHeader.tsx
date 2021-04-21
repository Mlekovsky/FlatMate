import React, { FC, useCallback } from 'react';
import { Col, Row } from 'react-bootstrap';

export interface ITodoListHeader {
  id: number;
  title: string;
  onDeleteHandler: (id: number) => void;
}

export const TodoListHeader: FC<ITodoListHeader> = ({ id, title, onDeleteHandler }) => {

  const deleteHandler = useCallback(() => {
    onDeleteHandler(id);
  },[id]);

  return (
    <Row style={{ marginBottom: 10 }}>
      <Col xs={3} className="title-buttons">
        <button className="btn btn-warning">
          <i className="far fa-edit"></i>
        </button>
      </Col>
      <Col xs={6} style={{ textAlign: 'center' }}>
        <h2 className="task-title">{title}</h2>
      </Col>
      <Col xs={3} className="title-buttons" style={{ margin: '0 auto' }}>
        <button className="btn btn-danger" onClick={deleteHandler}>
          <i className="fas fa-trash"></i>
        </button>
      </Col>
    </Row>
  );
};
