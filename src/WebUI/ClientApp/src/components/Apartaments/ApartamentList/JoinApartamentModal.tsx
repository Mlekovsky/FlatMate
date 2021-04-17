import React, { FC, useCallback, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

export interface IJoinApartamentModal {
  joinApartament: (id: number, password: string) => boolean;
  apartamentId: number;
}

export const JoinApartamentModal: FC<IJoinApartamentModal> = ({ joinApartament, apartamentId }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [password, setPassword] = useState('');

  const onSaveHandler = useCallback(async () => {
    let success = await joinApartament(apartamentId, password);
    if (success) {
      setShow(false);
    }
  }, [apartamentId, password]);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Dołącz!
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Podaj hasło</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Hasło</Form.Label>
              <Form.Control type="password" placeholder="Podaj hasło" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Anuluj
          </Button>
          <Button variant="primary" onClick={onSaveHandler}>
            Dołącz
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
