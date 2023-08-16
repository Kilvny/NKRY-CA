"use client";
import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";
import {
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const employees = [
  {
    id: "1",
    name: "Metro",
    email: "sada@as.net",
    phoneNumber: "0219479466",
    salary: "4760",
    department: "Accounting",
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@example.com",
    phoneNumber: "1234567890",
    salary: "5500",
    department: "HR",
  },
  // Add more employee data
];

const ManageEmployees = () => {
  const isTabletSize = useMediaQuery("(max-width:768px)");
  const [editUserId, setEditUserId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedDepartment, setEditedDepartment] = useState("");
  const [employees, setEmployees] = useState([
    {
      id: "1",
      username: "Metro",
      email: "sada@as.net",
      phone: "0219479466",
      salary: "4760",
      gender: "Accounting",
    },
    {
      id: "2",
      username: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      salary: "5500",
      gender: "HR",
    },
    // Add more employee data
  ]);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((json) => setEmployees(json?.users));
  }, []); // Empty dependency array to ensure the effect runs only once on mount

  const handleEditClick = (
    userId: any,
    name: string,
    email: string,
    department: string
  ) => {
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

  const renderEditCell = (params: any) => {
    return (
      <Button
        variant="outlined"
        size="small"
        onClick={() =>
          handleEditClick(
            params.row.id,
            params.row.username,
            params.row.email,
            params.row.gender
          )
        }
      >
        Edit
      </Button>
    );

    return params.value;
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "username", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "phone", headerName: "Phone Number", width: 150 },
    { field: "password", headerName: "password", width: 100 },
    { field: "gender", headerName: "gender", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: renderEditCell,
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={employees.map((employee, index) => ({
          ...employee,
          //   actions: index + 1, // Assign a unique ID to each row
        }))}
        columns={columns}
        slots={{
          toolbar: GridToolbar,
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
};

export default ManageEmployees;
