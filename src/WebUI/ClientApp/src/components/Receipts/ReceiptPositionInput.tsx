import React, { ChangeEvent, FC, useCallback, useState } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import { IReactSelectOption } from '../../types/common';
import Select from 'react-select';

export interface IReceiptPositionInput {
  receiptId: number;
  options: IReactSelectOption[];
}

export const ReceiptPositionInput: FC<IReceiptPositionInput> = ({ receiptId, options }) => {

    const [name, setName] = useState('');
    const [userId, setUserId] = useState(0);
  
    const onChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
      setName(event.target.value);
    }, []);
  
    const onSaveClick = useCallback((): void => {
      setName('');
    }, [name, receiptId, userId]);
  
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
                <Form.Control type="name" placeholder="Produkt..." onChange={onChangeHandler} />
              </Col>
              <Col>
                <Form.Control type="number" placeholder="Cena..." />
              </Col>
              <Col>
                <Select options={options} onChange={onOptionSelect} placeholder="Przypisz użytkowników..."></Select>
              </Col>
            </Row>
          </Container>
        </Form>
        <button className="btn btn-success" onClick={onSaveClick} style={{ margin: 15 }}>
          Dodaj!
        </button>
      </div>
    </>
  );
};
