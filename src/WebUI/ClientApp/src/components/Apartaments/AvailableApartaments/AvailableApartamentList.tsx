import React, { useEffect } from 'react';
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
}

export const AvailableApartamentList: FC<IAvailableApartamentList> = ({
  getAvailableApartaments,
  availableApartamentList,
}) => {
  useEffect(() => {
    getAvailableApartaments();
  }, []);

  const joinTemplate = (rowData) => {
    console.log(rowData);
    return <Button>{rowData.id}</Button>
  }

  return (
    <>
      <DataTable value={availableApartamentList} className="table table-striped">
        <Column field="name" header="Nazwa"></Column>
        <Column header="Wybierz" field="id" body={joinTemplate}></Column>
      </DataTable>
    </>
  );
};
