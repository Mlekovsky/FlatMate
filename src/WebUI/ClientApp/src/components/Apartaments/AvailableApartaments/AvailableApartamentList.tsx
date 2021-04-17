import React, { useCallback, useEffect } from 'react';
import { FC } from 'react';
import { IApartamentDto, IAvailableApartament } from '../../../types/Apartament';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import { Button } from '@material-ui/core';

export interface IAvailableApartamentList {
  availableApartamentList:  IApartamentDto[];
  getAvailableApartaments: () => void;
  chooseApartament:(id: number) => void;
}

export const AvailableApartamentList: FC<IAvailableApartamentList> = ({
  getAvailableApartaments,
  availableApartamentList,
  chooseApartament
}) => {
  useEffect(() => {
    getAvailableApartaments();
  }, []);

  const joinTemplate = (rowData) => {
    
    const onChooseHandler = () => {
      chooseApartament(rowData.id);
    }

    return (<button type="button" className="btn btn-success" onClick={onChooseHandler}>Wybierz</button>)
  }

  return (
    <>
      <DataTable tableClassName="table-paper" value={availableApartamentList} className="table table-striped">
        <Column field="name" header="Nazwa" headerStyle={{padding: '0.5rem'}} style={{width: '70%', padding: '0.3rem', verticalAlign: 'baseline'}}></Column>
        <Column header="Wybierz" field="id" headerStyle={{padding: '0.5rem'}} style={{width: '30%', padding: '0.3rem', verticalAlign: 'baseline'}} body={joinTemplate}></Column>
      </DataTable>
    </>
  );
};
