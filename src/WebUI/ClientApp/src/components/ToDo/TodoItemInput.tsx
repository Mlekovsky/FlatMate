import React, { ChangeEvent, FC, memo, useCallback, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

interface ITodoItemInput {
  listId: number;
  onSave: (value: string, listId: number) => void;
}

const TodoItemInput: FC<ITodoItemInput> = ({ listId, onSave }) => {
  const [name, setName] = useState('');

  const onChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  }, []);

  const onSaveClick = useCallback((): void => {
    onSave(name, listId);
    setName('');
  }, [name, listId]);

  return (
    <>
      <div style={{ padding: 5 }}>
        <Form >
          <Form.Group controlId="formName" style={{ width: '50%' }}>
            <Form.Control type="name" placeholder="Podaj tytuł zadania" onChange={onChangeHandler} />
          </Form.Group>
        </Form>
        <button className="btn btn-success" onClick={onSaveClick}>
          Dodaj!
        </button>
      </div>
    </>
  );
};

export default memo(TodoItemInput);
