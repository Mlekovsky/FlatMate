import React, { ChangeEvent, FC, useCallback, useState } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import { IReactSelectOption } from '../../types/common';
import Select from 'react-select';

export interface IReceiptPositionInput {
  receiptId: number;
  options: IReactSelectOption[];
  onAddPositionHandler: (receiptId: number, value: number, product: string, assignedUsersId: number[]) => void;
}

export const ReceiptPositionInput: FC<IReceiptPositionInput> = ({ receiptId, options, onAddPositionHandler }) => {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState([]);
  const [price, setPrice] = useState(0);

  const onChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  }, []);

  const onOptionSelect = useCallback((e: IReactSelectOption[]) => {
    setUserId(Array.isArray(e) ? e.map((x) => x.value) : []);
  }, []);

  const addPositionHandler = useCallback(() => {
    onAddPositionHandler(receiptId, price, name, userId);
  }, [price, name, userId]);

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
                <Form.Control
                  type="number"
                  placeholder="Cena..."
                  onChange={(e) => setPrice(parseFloat(e.target.value))}
                />
              </Col>
              <Col>
                <Select
                  options={options}
                  onChange={onOptionSelect}
                  isMulti
                  isClearable
                  placeholder="Przypisz użytkowników..."
                ></Select>
              </Col>
            </Row>
          </Container>
        </Form>
        <button className="btn btn-success" onClick={addPositionHandler} style={{ margin: 15 }}>
          Dodaj!
        </button>
      </div>
    </>
  );
};
