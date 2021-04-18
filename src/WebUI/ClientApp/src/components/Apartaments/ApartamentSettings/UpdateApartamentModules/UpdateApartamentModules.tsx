import React, { useCallback, useEffect, useState } from 'react';
import { FC } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { IApartamentUpdateMoudlesRequest } from '../../../../types/Apartament';
import { Col, Container, Modal, Row } from 'react-bootstrap';
import { ModalInfo } from '../../../common/ModalInfo';
import Switch from 'react-switch';
import { IModuleInfoDto, Modules } from '../../../../types/Module';

export interface IUpdateApartamentModules {
  updateApartamentModules: (request: IApartamentUpdateMoudlesRequest) => boolean;
  currentModules: number[];
  id: number;
  modulesList: IModuleInfoDto[];
  getModulesInfo: () => void;
}

export const UpdateApartamentModules: FC<IUpdateApartamentModules> = ({
  updateApartamentModules,
  currentModules,
  id,
  modulesList,
  getModulesInfo
}) => {
  const [text, setText] = useState('');
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const [todoCheck, setTodoCheck] = useState(false);
  const [shoppingListCheck, setShoppingListCheck] = useState(false);

  const handleTodoCheck = (nextChecked) => {
    setTodoCheck(nextChecked);
  };

  const handleShoppingListCheck = (nextChecked) => {
    setShoppingListCheck(nextChecked);
  };

  const onUpdateHandler = useCallback(async () => {
    let toUpdate = [];
    if (todoCheck) toUpdate.push(Modules.TODO_MODULE);
    if (shoppingListCheck) toUpdate.push(Modules.SHOPPING_LIST);

    let success = await updateApartamentModules({
      apartamentId: id,
      modules: toUpdate,
    });

    if (success) {
      setText('Pomyślnie edytowano moduły');
    } else {
      setText('Ups! Coś poszło nie tak');
    }
    handleShow();
  }, [currentModules, id, todoCheck, shoppingListCheck]);

  useEffect(() => {
    setTodoCheck(currentModules.includes(Modules.TODO_MODULE));
    setShoppingListCheck(currentModules.includes(Modules.SHOPPING_LIST));
    getModulesInfo();
  }, [currentModules]);

  return (
    <>
      <Form>
        <Container>
          <Row style={{marginBottom: 10}}>
            <Col xs={4}><strong>Obowiązki domowe:</strong></Col>
            <Col xs={6}>{modulesList?.find(x => x.id == Modules.TODO_MODULE)?.description}</Col>
            <Col xs={2}>
              <Switch onChange={handleTodoCheck} checked={todoCheck}></Switch>
            </Col>
          </Row>
          <Row style={{marginBottom: 10}}>
            <Col xs={4}><strong>Lista zakupów:</strong></Col>
            <Col xs={6}>{modulesList?.find(x => x.id == Modules.SHOPPING_LIST)?.description}</Col>
            <Col xs={2}>
              <Switch onChange={handleShoppingListCheck} checked={shoppingListCheck}></Switch>
            </Col>
          </Row>
          <Row>
            <Button variant="primary" onClick={onUpdateHandler}>
              Aktualizuj moduły
            </Button>
          </Row>
        </Container>
      </Form>

      <ModalInfo showModal={show} text={text}></ModalInfo>
    </>
  );
};
