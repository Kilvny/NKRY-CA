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
import { getAllEmployees } from "@/services/employee.services";
import { EmployeeDTO } from "@/DTOs/Employee";
import TOKEN  from "../../../../token.json"
import { useSession } from "next-auth/react";

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

  const { data: session } = useSession()
  const router = useRouter();
  const [employees, setEmployees] = useState<EmployeeDTO[]>([]);
  [
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
  ]
  const token = session?.user?.email ?? TOKEN.token 
  useEffect(() => {
    async function fetchEmployees() {
      try {
        const employeeData = await getAllEmployees(token);
        setEmployees(employeeData);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    }

    fetchEmployees();
  }, [token]);

  const handleEditClick = (
    employeeId: any,
    name: string,
    email: string
    // department: string
  ) => {
    setEditUserId(employeeId);
    router.push(`/nkry-ca/manage-employee/${employeeId}`)
    setEditedName(name);
    setEditedEmail(email);
    // setEditedDepartment(department);
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
            params.row.firstName,
            params.row.email
            // params.row.gender
          )
        }
      >
        Edit
      </Button>
    );

    return params.value;
  };

  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 50 },
    { field: "ido", headerName: "ID",width: 50},
    { field: "firstName", headerName: "Name", width: 150 },
    { field: "nationality", headerName: "Nationality", width: 150 },
    { field: "phoneNumber", headerName: "Phone Number", width: 150 },
    { field: "job", headerName: "Job", width: 100 },
    { field: "address", headerName: "Address", width: 250 },
    { field: "passportNumber", headerName: "Passport Number", width: 150 },
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
            ido: index + 1, // Assign a unique ID to each row
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
    </div>
  );
};

export default ManageEmployees;


