import React, { useEffect } from 'react';
import { FC } from 'react';
import { IApartamentDto, IAvailableApartament } from '../../../types/Apartament';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import { Button } from '@material-ui/core';
import { JoinApartamentModal } from './JoinApartamentModal';

export interface IApartamentList {
  apartamentList: IApartamentDto[];
  getApartamentList: () => void;
  joinApartament: (id: number, password: string) => boolean
}

export const ApartamentList: FC<IApartamentList> = ({
  getApartamentList,
  apartamentList,
  joinApartament
}) => {
  useEffect(() => {
    getApartamentList();
  }, []);

  const joinTemplate = (rowData) => {

    return <JoinApartamentModal apartamentId = {rowData.id} joinApartament = {joinApartament}></JoinApartamentModal>
  }

  return (
    <>
      <DataTable tableClassName="table-paper" value={apartamentList} className="table table-striped" style={{width:'100%'}}>
        <Column field="name" header="Nazwa" headerStyle={{padding: '0.5rem'}} style={{width: '20%', padding: '0.3rem', verticalAlign: 'baseline'}}></Column>
        <Column field="city" header="Miasto" headerStyle={{padding: '0.5rem'}} style={{width: '20%', padding: '0.3rem', verticalAlign: 'baseline'}}></Column>
        <Column field="address" header="Adres" headerStyle={{padding: '0.5rem'}} style={{width: '20%', padding: '0.3rem', verticalAlign: 'baseline'}}></Column>
        <Column field="usersInApartment" headerStyle={{padding: '0.5rem'}} header="Mieszkańcy" style={{width: '20%', padding: '0.3rem', verticalAlign: 'baseline'}}></Column>
        <Column header="Akcja" field="id" headerStyle={{padding: '0.5rem'}} body={joinTemplate} style={{width: '20%', padding: '0.3rem', verticalAlign: 'baseline'}}></Column>
      </DataTable>
    </>
  );
};
