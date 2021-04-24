import React, { FC, useCallback, useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

export interface ITodoListHeader {
  id: number;
  title: string;
  onDeleteHandler: (id: number) => void;
  onEditHandler: (title: string, id: number) => void;
}

export const TodoListHeader: FC<ITodoListHeader> = ({ id, title, onDeleteHandler, onEditHandler }) => {
  
  const [isEdit, setIsEdit] = useState(false);
  const [currentTitle, setCurrentTitle] = useState('');

  const toggleEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit]);

  const deleteHandler = useCallback(() => {
    onDeleteHandler(id);
  }, [id]);

  const editHandler = useCallback(() => {
    onEditHandler(currentTitle, id);
    toggleEdit();
  }, [id, currentTitle]);

  let button;
  let titleLabel;
  if (isEdit) {
    button = (
      <>
        <button className="btn btn-success" onClick={editHandler} style={{ marginRight: 5 }}>
          <i className="fas fa-check"></i>
        </button>
        <button className="btn btn-secondary" onClick={toggleEdit}>
          <i className="fas fa-times"></i>
        </button>
      </>
    );
    titleLabel = (
      <>
        <Form style={{marginTop:10}}>
            <Form.Control type="name" value={currentTitle} onChange={(e) => (setCurrentTitle(e.target.value))} />
        </Form>
      </>
    );
  } else {
    button = (
      <button className="btn btn-warning" onClick={toggleEdit}>
        <i className="far fa-edit"></i>
      </button>
    );
    titleLabel = (
      <>
        <h2 className="task-title">{title}</h2>
      </>
    );
  }

  useEffect(() => {
    setCurrentTitle(title);
  }, [title]);

  return (
    <Row style={{ marginBottom: 10 }}>
      <Col xs={3} className="title-buttons">
        {button}
      </Col>
      <Col xs={6} style={{ textAlign: 'center' }}>
        {titleLabel}
      </Col>
      <Col xs={3} className="title-buttons">
        <button className="btn btn-danger" onClick={deleteHandler}>
          <i className="fas fa-trash"></i>
        </button>
      </Col>
    </Row>
  );
};
