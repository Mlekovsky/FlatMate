import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { IApartamentDto } from '../../../types/Apartament';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { JoinApartamentModal } from './JoinApartamentModal';
import { Button } from 'primereact/button';
import { Ripple } from 'primereact/ripple';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import classNames from 'classnames';

export interface IApartamentList {
  apartamentList: IApartamentDto[];
  getApartamentList: () => void;
  joinApartament: (id: number, password: string) => boolean;
}

export const ApartamentList: FC<IApartamentList> = ({ getApartamentList, apartamentList, joinApartament }) => {
  useEffect(() => {
    getApartamentList();
  }, []);

  const [first, setFirst] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const joinTemplate = (rowData) => {
    return <JoinApartamentModal apartamentId={rowData.id} joinApartament={joinApartament}></JoinApartamentModal>;
  };

  return (
    <>
      <DataTable
        tableClassName="table-paper"
        sortMode="multiple"
        paginator
        first={first}
        onPage={(e) => setFirst(e.first)}
        value={apartamentList}
        className="table table-striped"
        style={{ width: '100%' }}
        rows={5}
      >
        <Column
          sortable
          field="name"
          header="Nazwa"
          headerStyle={{ padding: '0.5rem' }}
          style={{ width: '25%', padding: '0.3rem', verticalAlign: 'baseline' }}
        ></Column>
        <Column
          sortable
          field="city"
          header="Miasto"
          headerStyle={{ padding: '0.5rem' }}
          style={{ width: '25%', padding: '0.3rem', verticalAlign: 'baseline' }}
        ></Column>
        <Column
          sortable
          field="usersInApartment"
          headerStyle={{ padding: '0.5rem' }}
          header="Mieszkańcy"
          style={{ width: '25%', padding: '0.3rem', verticalAlign: 'baseline' }}
        ></Column>
        <Column
          header="Akcja"
          field="id"
          headerStyle={{ padding: '0.5rem' }}
          body={joinTemplate}
          style={{ width: '25%', padding: '0.3rem', verticalAlign: 'baseline' }}
        ></Column>
      </DataTable>
    </>
  );
};
