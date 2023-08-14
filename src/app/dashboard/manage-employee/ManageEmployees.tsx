'use client'
import React, { useState } from 'react';
import { DataGrid, GridColDef, GridRowsProp, GridToolbar } from '@mui/x-data-grid';
import { useMediaQuery, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const employees = [
  {
    "name": "Metro",
    "email": "sada@as.net",
    "phoneNumber": "0219479466",
    "salary": "4760",
    "department": "Accounting"
  },
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "1234567890",
    "salary": "5500",
    "department": "HR"
  },
  // Add more employee data
];

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 150 },
  { field: 'phoneNumber', headerName: 'Phone Number', width: 150 },
  { field: 'salary', headerName: 'Salary', width: 100 },
  { field: 'department', headerName: 'Department', width: 150 },
  { field: 'actions', headerName: 'Actions', width: 150 },
];

const ManageEmployees = () => {
  const isTabletSize = useMediaQuery('(max-width:768px)');
  const [editUserId, setEditUserId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedDepartment, setEditedDepartment] = useState('');

  const handleEditClick = (userId: any, name: string, email: string, department: string) => {
    setEditUserId(userId);
    setEditedName(name);
    setEditedEmail(email);
    setEditedDepartment(department);
  };

  const handleSaveClick = () => {
    // Implement save logic here
    // Update the user's data and close the edit dialog
    setEditUserId(null);
  };

  const handleCloseClick = () => {
    setEditUserId(null);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={employees.map((employee, index) => ({
          id: index + 1,
          name: employee.name,
          email: employee.email,
          phoneNumber: employee.phoneNumber,
          salary: employee.salary,
          department: employee.department,
          actions: index + 1, // Assign a unique ID to each row
        }))}
        columns={columns.map(column => ({
          ...column,
          renderCell: (params) => {
            if (column.field === 'actions') {
              if (params.row.id === editUserId) {
                return (
                  <>
                    <Button variant="outlined" size="small" onClick={handleSaveClick}>Save</Button>
                    <Button variant="outlined" size="small" onClick={handleCloseClick}>Close</Button>
                  </>
                );
              } else {
                return (
                  <Button variant="outlined" size="small" onClick={() => handleEditClick(params.row.id, params.row.name, params.row.email, params.row.department)}>Edit</Button>
                );
              }
            }
            return params.value;
          }
        }))}
        slots={{
          toolbar: GridToolbar
        }}
        initialState={{
          pagination: { paginationModel: { pageSize: isTabletSize ? 5 : 10 } },
        }}
        pageSizeOptions={[5, 10, 25]}
      />

      <Dialog open={editUserId !== null}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
          />
          <TextField
            label="Department"
            fullWidth
            value={editedDepartment}
            onChange={(e) => setEditedDepartment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveClick}>Save</Button>
          <Button onClick={handleCloseClick}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ManageEmployees;
