import React, { FC, useCallback, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { IReactSelectOption } from '../../types/common';
import { ICreateReceiptRequest, ReceiptFilterMode } from '../../types/Receipt';
import Select from 'react-select';

export interface IAddReceipt {
  addReceipt: (request: ICreateReceiptRequest) => void;
  apartamentId: number;
  options: IReactSelectOption[];
}

export const AddReceipt: FC<IAddReceipt> = ({ addReceipt, apartamentId, options }) => {
  const [title, setTitle] = useState('');

  const curr = new Date();
  curr.setDate(curr.getDate());
  const currDate = curr.toISOString().substr(0, 10);

  const [date, setDate] = useState(currDate);
  const [paidBy, setPaidBy] = useState(0);

  const addReceiptHandler = useCallback(() => {
    addReceipt({ apartamentId: apartamentId, date: date, title: title, paidBy: paidBy });
  }, [apartamentId, title, date, paidBy]);

  const onOptionSelect = useCallback(
    (value: IReactSelectOption) => {
      setPaidBy(value.value);
    },
    [paidBy],
  );

  return (
    <>
      <Form>
        <Form.Group controlId="formName" style={{ width: '50%' }}>
          <Form.Label>Tytuł paragonu</Form.Label>
          <Form.Control type="name" placeholder="Podaj tytuł paragonu" onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formName" style={{ width: '50%' }}>
          <Form.Label>Data paragonu</Form.Label>
          <Form.Control type="date" onChange={(e) => setDate(new Date(e.target.value))} defaultValue={currDate}/>
        </Form.Group>
        <Form.Group controlId="formName" style={{ width: '50%' }}>
          <Form.Label>Zapłacił</Form.Label>
          <Select options={options} onChange={onOptionSelect}></Select>
        </Form.Group>

        <Button variant="primary" onClick={addReceiptHandler}>
          Dodaj nowy paragon!
        </Button>
      </Form>
    </>
  );
};
