import { Box, Container, CssBaseline, Grid, makeStyles, Paper } from '@material-ui/core';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { IAssignableUserDto, IReactSelectOption } from '../../types/common';
import {
  ICreateReceiptPositionRequest,
  ICreateReceiptRequest,
  IDeleteReceiptPositionRequest,
  IDeleteReceiptRequest,
  IReceiptListDto,
  IUpdateReceiptPositionRequest,
  IUpdateReceiptRequest,
  IUpdateReceiptStatusRequest,
  ReceiptFilterMode,
  ReceiptFilterNames,
} from '../../types/Receipt';
import { Copyright } from '../User/Copyright';
import './Receipts.css';
import { ReceiptsList } from './ReceiptsList';
import Select from 'react-select';
import { Row, Col } from 'react-bootstrap';
import { AddReceipt } from './AddReceipt';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  receiptPaper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    minHeight: '300px',
  },
  fixedHeight: {
    height: 240,
  },
}));

export interface IReceipts {
  apartamentId: number;
  getReceipts: (apartamentId: number, mode: ReceiptFilterMode) => void;
  receipts: IReceiptListDto[];
  users: IAssignableUserDto[];
  addReceipt: (request: ICreateReceiptRequest) => void;
  updateReceipt: (request: IUpdateReceiptRequest) => void;
  updateReceiptStatus: (request: IUpdateReceiptStatusRequest) => void;
  deleteReceipt: (request: IDeleteReceiptRequest) => void;
  addReceiptPosition: (request: ICreateReceiptPositionRequest) => void;
  updateReceiptPosition: (request: IUpdateReceiptPositionRequest) => void;
  deleteReceiptPosition: (request: IDeleteReceiptPositionRequest) => void;
}

export const Receipts: FC<IReceipts> = ({
  apartamentId,
  getReceipts,
  receipts,
  users,
  addReceipt,
  updateReceipt,
  updateReceiptStatus,
  deleteReceipt,
  addReceiptPosition,
  updateReceiptPosition,
  deleteReceiptPosition,
}) => {
  const classes = useStyles();

  const [searchMode, setSearchMode] = useState(ReceiptFilterMode.NotPaid);
  const [selectedSearchMode, setSelectedSearchMode] = useState({
    label: 'Niezapłacone',
    value: ReceiptFilterMode.NotPaid,
  });

  useEffect(() => {
    getReceipts(apartamentId, searchMode);
  }, [searchMode, apartamentId]);

  const userOptions = useMemo(() => {
    return users?.map((item) => {
      return { value: item.userId, label: '' + item.user };
    });
  }, []);

  const filterOptions = useMemo(() => {
    return [
      { value: ReceiptFilterMode.Paid, label: ReceiptFilterNames[ReceiptFilterMode.Paid] },
      { value: ReceiptFilterMode.NotPaid, label: ReceiptFilterNames[ReceiptFilterMode.NotPaid] },
      { value: ReceiptFilterMode.All, label: ReceiptFilterNames[ReceiptFilterMode.All] },
    ];
  }, []);

  const onFilterSelect = useCallback(
    (value: IReactSelectOption) => {
      setSearchMode(value.value);
      setSelectedSearchMode({ value: value.value, label: ReceiptFilterNames[value.value] });
    },
    [searchMode],
  );

  const onUpdateReceiptHandler = useCallback(
    (receiptId: number, title: string, paidBy: number, date: Date) => {
      updateReceipt({ apartamentId: apartamentId, receiptId: receiptId, date: date, title: title, paidBy: paidBy });
    },
    [apartamentId],
  );

  const onUpdateReceiptStatusHandler = useCallback(
    (receiptId: number, paid: boolean) => {
      updateReceiptStatus({ apartamentId: apartamentId, paid: paid, receiptId: receiptId });
    },
    [apartamentId],
  );

  const onDeleteReceiptHandler = useCallback(
    (receiptId: number) => {
      deleteReceipt({ apartamentId: apartamentId, receiptId: receiptId });
    },
    [apartamentId],
  );

  const onCreateReceiptPositionHandler = useCallback(
    (receiptId: number, value: number, product: string, assignedUsersId: number[]) => {
      addReceiptPosition({
        apartamentId: apartamentId,
        receiptId: receiptId,
        value: value,
        product: product,
        assignedUsersId: assignedUsersId,
      });
    },
    [apartamentId],
  );

  const onUpdateReceiptPositionHandler = useCallback(
    (id: number, value: number, product: string, assignedUsersId: number[]) => {
      updateReceiptPosition({
        apartamentId: apartamentId,
        id: id,
        value: value,
        product: product,
        assignedUsersId: assignedUsersId,
      });
    },
    [apartamentId],
  );

  const onDelteReceiptPositionHandler = useCallback(
    (id: number) => {
      deleteReceiptPosition({ id: id, apartamentId: apartamentId });
    },
    [apartamentId],
  );

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <h3>Sprawdź, jakie paragony są obecne do rozliczenia</h3>
              </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={classes.paper}>
                <h4 style={{ paddingBottom: 10 }}>Dodaj nowy paragon</h4>
                <AddReceipt addReceipt={addReceipt} apartamentId={apartamentId} options={userOptions}></AddReceipt>
              </Paper>
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <Paper className={classes.receiptPaper}>
                <Row style={{ paddingBottom: 10 }}>
                  <Col xs={3}>
                    <h4>Przeglądaj paragony</h4>
                  </Col>
                </Row>
                <Row style={{ paddingBottom: 10 }}>
                  <Col xs={3}>
                    <Select options={filterOptions} onChange={onFilterSelect} value={selectedSearchMode}></Select>
                  </Col>
                </Row>

                <ReceiptsList
                  key={0}
                  options={userOptions}
                  receipts={receipts}
                  onDeleteHandler={onDeleteReceiptHandler}
                  onUpdateHandler={onUpdateReceiptHandler}
                  onUpdateStatusHandler={onUpdateReceiptStatusHandler}
                  onAddPositionHandler={onCreateReceiptPositionHandler}
                  onDeletePositionHandler={onDelteReceiptPositionHandler}
                  onUpdatePositionHandler={onUpdateReceiptPositionHandler}
                ></ReceiptsList>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </main>
      </div>
    </>
  );
};
