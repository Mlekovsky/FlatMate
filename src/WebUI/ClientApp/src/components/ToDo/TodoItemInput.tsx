import React, { ChangeEvent, FC, memo, useCallback, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Select from 'react-select';
import { IReactSelectOption } from '../../types/common';

interface ITodoItemInput {
  listId: number;
  onSave: (value: string, listId: number, userId: number) => void;
  options: IReactSelectOption[];
}

const TodoItemInput: FC<ITodoItemInput> = ({ listId, onSave, options }) => {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState(0);

  const onChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  }, []);

  const onSaveClick = useCallback((): void => {
    onSave(name, listId, userId);
    setName('');
  }, [name, listId, userId]);

  const onOptionSelect = useCallback(
    (value: IReactSelectOption) => {
      setUserId(value.value);
    },
    [userId],
  );

  return (
    <>
      <div style={{ padding: 5 }}>
        <Form>
          <Container>
            <Row>
              <Col>
                <Form.Control type="name" placeholder="Podaj tytuł zadania" onChange={onChangeHandler} />
              </Col>
              <Col>
                <Select options={options} onChange={onOptionSelect} placeholder = "Przypisz użytkownika..."></Select>
              </Col>
            </Row>
          </Container>
        </Form>
        <button className="btn btn-success" onClick={onSaveClick} style = {{margin:15}}>
          Dodaj!
        </button>
      </div>
    </>
  );
};

export default memo(TodoItemInput);
