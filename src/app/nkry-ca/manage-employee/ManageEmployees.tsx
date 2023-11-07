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
  Typography,
} from "@mui/material";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import { useParams, useRouter } from "next/navigation";

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

  const router = useRouter();
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
    employeeId: any,
    name: string,
    email: string,
    department: string
  ) => {
    setEditUserId(employeeId);
    router.push(`/nkry-ca/manage-employee/${employeeId}`)
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
          <Typography >All Employees</Typography>
          <Button
          variant='outlined'
          color='success'
          sx={{m:1, p:1}}
          size='small'
          href='/nkry-ca/manage-employee/new'
          >
          <AddOutlinedIcon /> New Employee
          </Button>
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
{/* // todo: remove
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
      </Dialog> */}
    </div>
  );
};

export default ManageEmployees;


/* @DATA Example
[
    {
        "id": "b446ecc7-7a16-4802-a768-08dbda200d71",
        "firstName": "Abdo",
        "lastName": "Fatty",
        "job": "Driver",
        "nationality": "India",
        "address": "New Orleans 5st. Est da15",
        "phoneNumber": "09876543210",
        "photo": null,
        "employeeIdNumber": null,
        "passportNumber": "A 2103 1231230",
        "monthlyFinance": [],
        "carId": null,
        "car": null,
        "personalDetails": null,
        "fixedFinance": null,
        "fixedExpnenses": []
    },
    {
        "id": "7ceb2128-5aa5-4839-6b63-08dbdbb04fcd",
        "firstName": "<string>",
        "lastName": "<string>",
        "job": "<string>",
        "nationality": "<string>",
        "address": "<string>",
        "phoneNumber": "<string>",
        "photo": "<string>",
        "employeeIdNumber": "<string>",
        "passportNumber": "<string>",
        "monthlyFinance": [
            {
                "id": "142443a1-6d09-4d91-7d25-08dbdd7e36fb",
                "deliveriesMade": 1,
                "totalSalary": null,
                "dueMonth": 11,
                "dueYear": 2023,
                "monthlyExpnenses": [
                    {
                        "id": "cb54a305-b009-475d-83ef-08dbdd8533c8",
                        "name": "Khasm 3adam endbat",
                        "dueDate": "2023-11-04T00:00:00",
                        "amount": 150.00,
                        "employeeFinanceId": "142443a1-6d09-4d91-7d25-08dbdd7e36fb"
                    }
                ],
                "employeeId": "7ceb2128-5aa5-4839-6b63-08dbdbb04fcd"
            },
            {
                "id": "146684f3-92b8-401a-7d26-08dbdd7e36fb",
                "deliveriesMade": 1,
                "totalSalary": 0.00,
                "dueMonth": 11,
                "dueYear": 2023,
                "monthlyExpnenses": [],
                "employeeId": "7ceb2128-5aa5-4839-6b63-08dbdbb04fcd"
            }
        ],
        "carId": "fdace062-d0b8-451c-7ae5-08dbdbb04f9a",
        "car": {
            "id": "fdace062-d0b8-451c-7ae5-08dbdbb04f9a",
            "company": "<string>",
            "model": "<string>",
            "manfactureYear": 2022,
            "plateNumber": "<string>"
        },
        "personalDetails": null,
        "fixedFinance": null,
        "fixedExpnenses": []
    }
]
*/ 