import React, { useCallback, useEffect, useState } from 'react';
import { FC } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { IApartamentUpdateMoudlesRequest, IDeleteApartamentRequest, IRemoveUserApartamentReuqest } from '../../../../types/Apartament';
import { Col, Container, Modal, Row } from 'react-bootstrap';
import { ModalInfo } from '../../../common/ModalInfo';
import Switch from 'react-switch';
import { IModuleInfoDto, Modules } from '../../../../types/Module';

export interface IDeleteApartament {
  id: number;
  removeUserFromApartament: (request: IRemoveUserApartamentReuqest) => void;
  deleteApartament: (request: IDeleteApartamentRequest) => void;
}

export const DeleteApartament: FC<IDeleteApartament> = ({
  id,
  removeUserFromApartament,
  deleteApartament
}) => {

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const onDeleteHandler = useCallback(async () => {
    await deleteApartament({apartamentId: id});
    handleClose();
  },[id]);

  const onRemoveUserHandler = useCallback(() => {
    removeUserFromApartament({apartamentId : id});
  }, [id])

  return (
    <>
        <Container>
          <Row style={{marginBottom: 10}}>
            <Col xs={6}><strong>Wypisz mnie z mieszkania:</strong></Col>
            <Col xs={6}><button className="btn btn-danger" style={{width:80}} onClick={onRemoveUserHandler}>Wypisz</button></Col>
          </Row>
          <Row>
            <Col xs={6}><strong>Usuń mieszkanie:</strong></Col>
            <Col xs={6}><button className="btn btn-danger" style={{width:80}} onClick={handleShow}>Usuń</button></Col>
          </Row>
        </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Potwierdź akcje</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Czy na pewno chcesz usunąć mieszkanie?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Anuluj
          </Button>
          <Button variant="primary" onClick={onDeleteHandler}>
            Usuń
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
