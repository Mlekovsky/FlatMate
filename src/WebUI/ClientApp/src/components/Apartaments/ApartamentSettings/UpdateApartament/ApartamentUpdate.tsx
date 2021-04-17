import React, { useCallback, useEffect, useState } from 'react';
import { FC } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { IApartamentUpdateRequest } from '../../../../types/Apartament';
import { Modal } from 'react-bootstrap';

export interface IApartamentUpdate {
  updateApartament: (request: IApartamentUpdateRequest) => boolean;
  shortName: string;
  city: string;
  address: string;
  id: number;
}

export const ApartamentUpdate: FC<IApartamentUpdate> = ({ updateApartament, shortName, city, address, id }) => {
  const [nameValue, setName] = useState('');
  const [cityValue, setCity] = useState('');
  const [addressValue, setAddress] = useState('');

  const [text, setText] = useState('');
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const onUpdateHandler = useCallback(async () => {
    let success = await updateApartament({
      apartamentId: id,
      shortName: nameValue,
      city: cityValue,
      address: addressValue,
    });
    if (success) {
      setText('Pomyślnie edytowano informacje o mieszkaniu');
    } else {
      setText('Ups! Coś poszło nie tak');
    }
    handleShow();
  }, [nameValue, cityValue, addressValue, id]);

  useEffect(() => {
    setName(shortName);
    setCity(city);
    setAddress(address);
  }, [shortName, city, address]);

  return (
    <>
      <Form>
        <Form.Group controlId="formName">
          <Form.Label>Nazwa</Form.Label>
          <Form.Control
            type="name"
            placeholder="Podaj nazwę"
            value={nameValue}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formCity">
          <Form.Label>Miasto</Form.Label>
          <Form.Control type="name" 
          placeholder="Podaj miasto" 
          value={cityValue} 
          onChange={(e) => setCity(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formName">
          <Form.Label>Adres</Form.Label>
          <Form.Control
            type="name"
            placeholder="Podaj adres"
            value={addressValue}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={onUpdateHandler}>
          Aktualizuj dane
        </Button>
      </Form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>{text}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
