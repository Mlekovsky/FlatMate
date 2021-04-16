import React, { useCallback, useEffect, useState } from 'react';
import { FC } from 'react';
import { IApartamentCreateRequest,  } from '../../../types/Apartament';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export interface ICreateApartament {
  createApartament: (request: IApartamentCreateRequest) => void;
}

export const CreateApartament: FC<ICreateApartament> = ({ createApartament }) => {

    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');

    const onCreateHandler = useCallback((): void => {
        createApartament({shortName: name, city: city, address: address, password: password});
        setName('');
        setCity('');
        setAddress('');
        setPassword('');
      }, [name, city, address, password]);

  return (
    <>
      <Form>
        <Form.Group controlId="formName">
          <Form.Label>Nazwa</Form.Label>
          <Form.Control type="name" placeholder="Podaj nazwę" onChange={(e) => setName(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formCity">
          <Form.Label>Miasto</Form.Label>
          <Form.Control type="name" placeholder="Podaj miasto" onChange={(e) => setCity(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formAddress">
          <Form.Label>Adres</Form.Label>
          <Form.Control type="name" placeholder="Podaj adres" onChange={(e) => setAddress(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Hasło</Form.Label>
          <Form.Control type="password" placeholder="Podaj hasło" onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Button variant="primary" onClick={onCreateHandler}>
          Dodaj mieszkanie!
        </Button>
      </Form>
    </>
  );
};
