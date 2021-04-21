import React, { FC, useCallback, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { ITodoListCreateRequest } from '../../types/ToDoItem';

export interface IAddTodoList {
  addTodoList: (request: ITodoListCreateRequest) => void;
  apartamentId: number;
}

export const AddTodoList: FC<IAddTodoList> = ({ addTodoList, apartamentId }) => {
  const [title, setTitle] = useState('');

  const addTodoListHandler = useCallback(() => {
    addTodoList({ apartamentId: apartamentId, title: title });
    setTitle('');
  }, [apartamentId, title]);

  return (
    <>
      <Form>
        <Form.Group controlId="formName" style={{width: '50%'}}>
          <Form.Label>Tytuł listy</Form.Label>
          <Form.Control type="name" placeholder="Podaj tytuł listy" onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>

        <Button variant="primary" onClick={addTodoListHandler}>
          Dodaj nową liste!
        </Button>
      </Form>
    </>
  );
};
