import { Container } from '@material-ui/core';
import React, { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import { IUserReceiptTotalValueDto } from '../../types/Receipt';
import { map } from 'lodash';

export interface IReceiptSummary {
  totalValue: number;
  userTotalValues: IUserReceiptTotalValueDto[];
}

export const ReceiptSummary: FC<IReceiptSummary> = ({ totalValue, userTotalValues }) => {
  return (
    <>
        <Row style={{paddingLeft:15}}>
          <Col xs={3}>
            <strong>TOTAL:</strong>
          </Col>
          <Col xs={3}>
             {totalValue}
          </Col>
          <Col xs={6}>
            {map(userTotalValues, (item: IUserReceiptTotalValueDto, index) => {
              return (
                <p style={{ marginBottom: 5 }}>
                  {item.user}: <strong>{item.totalValue}</strong>
                </p>
              );
            })}
          </Col>
        </Row>
    </>
  );
};
