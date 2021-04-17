import React, { FC, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

export interface IModalInfo {
  text: string;
  showModal: boolean;
}
export const ModalInfo: FC<IModalInfo> = ({ text, showModal }) => {
  const [show, setShow] = useState(showModal);

  const handleClose = () => setShow(false);

  return (
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
  );
};
