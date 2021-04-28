import React, { FC } from 'react';
import { IAssignableUserDto, IReactSelectOption } from '../../types/common';
import { IReceiptListDto } from '../../types/Receipt';
import { map } from 'lodash';
import { Container, Row, Col } from 'react-bootstrap';
import { ReceiptHeader } from './ReceiptHeader';
import { ReceiptPosition } from './ReceiptPosition';
import { ReceiptPositionInput } from './ReceiptPositionInput';
import { ReceiptSummary } from './ReceiptSummary';

export interface IReceiptsList {
  receipts: IReceiptListDto[];
  options: IReactSelectOption[];
}

export const ReceiptsList: FC<IReceiptsList> = ({ receipts, options }) => {
  return (
    <>
      <div className="container">
        <div className="row">
          {map(receipts, (fs, index) => {
            return (
              <>
                <div className="col-6" style={{ paddingBottom: 20 }} key={index}>
                  <Container>
                    <div className="card">
                      <ReceiptHeader
                        key={index}
                        date={fs.date}
                        id={fs.id}
                        title={fs.title}
                        options={options}
                        paid={fs.paid}
                        userPaid={fs.paidByUser}
                      ></ReceiptHeader>
                      <Row>
                        <Col xs={12}>
                          <div className="todo-list">
                            {map(fs.positions, (item, i) => {
                              return (
                                <ReceiptPosition
                                  id={item.id}
                                  key={i}
                                  assignedUsers={item.assignedUsers}
                                  options={options}
                                  product={item.product}
                                  receiptId={fs.id}
                                  value={item.value}
                                ></ReceiptPosition>
                              );
                            })}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12}>
                          <div className="receipt-summary">
                            <ReceiptSummary
                              key={index}
                              totalValue={fs.totalValue}
                              userTotalValues={fs.userTotalValues}
                            ></ReceiptSummary>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12}>
                          <div className="input-container">
                            <ReceiptPositionInput
                              key={index}
                              options={options}
                              receiptId={fs.id}
                            ></ReceiptPositionInput>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Container>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

function isEmpty(lists: any) {
  throw new Error('Function not implemented.');
}
