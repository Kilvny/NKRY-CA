'use client'
import React from 'react'
import { DataGrid, GridColDef, GridRowsProp, GridToolbar } from '@mui/x-data-grid';

const rows: GridRowsProp = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
    { id: 4, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 5, col1: 'MUI', col2: 'is Amazing' },
    { id: 6, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 7, col1: 'MUI', col2: 'is Amazing' },
    { id: 8, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 9, col1: 'MUI', col2: 'is Amazing' },
    { id: 10, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 11, col1: 'MUI', col2: 'is Amazing' },
    { id: 12, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 13, col1: 'MUI', col2: 'is Amazing' },
    { id: 14, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 15, col1: 'MUI', col2: 'is Amazing' },
    { id: 16, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 17, col1: 'MUI', col2: 'is Amazing' }
    ];
const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
    ];

const ManageEmployees = () => {

    
      return (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows} 
            columns={columns}
            slots={{
            toolbar: GridToolbar
            }}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10, 25]}
          />
        </div>
      );
}

export default ManageEmployees