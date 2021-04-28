import { Receipts } from './Receipts';
import React, { memo } from 'react';
import { connect, Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import { receiptActionCreator } from '../../actions/receipt/receiptAction';

const mapStateToProps = (state) => ({
    receipts: state.receipts.receipts,
    users: state.receipts.users,
    apartamentId: state.currentApartament.id
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    getReceipts: receiptActionCreator.getReceipts,
    addReceipt: receiptActionCreator.createReceipt,
    updateReceipt: receiptActionCreator.updateReceipt,
    updateReceiptStatus: receiptActionCreator.updateReceiptStatus,
    deleteReceipt: receiptActionCreator.deleteReceipt,
    addReceiptPosition: receiptActionCreator.createReceiptPosition,
    updateReceiptPosition: receiptActionCreator.updateReceiptPosition,
    deleteReceiptPosition: receiptActionCreator.deleteReceiptPosition
}, dispatch);

export default memo(connect(mapStateToProps, mapDispatchToProps)(Receipts));
