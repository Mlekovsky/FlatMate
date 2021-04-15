import React, { useEffect } from 'react';
import { FC } from 'react';
import { IApartamentDto, IAvailableApartament } from '../../../types/Apartament';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';

export interface IApartamentList {
  apartamentList: IApartamentDto[];
  availableApartamentList: IAvailableApartament[];
  getApartamentList: () => void;
  getAvailableApartaments: () => void;
}

export const ApartamentList: FC<IApartamentList> = ({
  getApartamentList,
  getAvailableApartaments,
  apartamentList,
  availableApartamentList,
}) => {
  useEffect(() => {
    getApartamentList();
    //getAvailableApartaments();
  }, []);

  return (
    <>
      <DataTable value={apartamentList}>
        <Column field="name"></Column>
        <Column field="city"></Column>
        <Column field="address"></Column>
        <Column field="usersInApartment"></Column>
      </DataTable>
    </>
  );
};
