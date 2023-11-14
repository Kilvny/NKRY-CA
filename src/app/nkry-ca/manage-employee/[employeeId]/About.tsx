'use client'
import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Breadcrumbs,
  Typography,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  Paper,
  Box,
  MenuItemProps,
} from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import WarningIcon from '@mui/icons-material/Warning';
import { IconButton, TextField } from '@mui/material';

import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import MenuItem from '@/components/MenuItem';
import { MenuItemOptions } from '@/components/MenuItem/MenuItem';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import TOKEN from "../../../../../token.json"
import { deleteEmployee, getEmployee } from '@/services/employee.services';
import { EmployeeDTO } from '@/DTOs/Employee';
import { getCurrentMonthFinance, updateDeliveriesOfEmployee } from '@/services/employeeFinance.services';
import { MonthlyFinanceDTO } from '@/DTOs/MonthlyFinance';
import { DeliveriesUpdateDTO } from '@/DTOs/DeliveriesUpdateDTO';
import { ExpenseDTO } from '@/DTOs/Expense';
import { esES } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import 'dayjs/locale/ar';
import { PersonalDetailsDTO } from '@/DTOs/PersonalDetailsDTO';
import { useSession } from 'next-auth/react';




const menuItemOptions: MenuItemOptions = {
  option1: {
    text: 'إضافة تاريخ إنتهاء الإقامة',
    url: 'Iqama'
  },
  option2: {
    text: 'إضافة تاريخ إستحقاق تذاكر الطيران',
    url: 'flight'
  },
  option3: {
    text: 'إضافة موعد صرف المستحقات',
    url: 'dues'
  },
  option4: {
    text: 'إضافة تفاصيل مالية',
    url: 'finance'
  }

}

export default function About() {
  const [employee, setEmployee] = useState<EmployeeDTO>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState<boolean>(false);
  const [currMonthFinance, setCurrMonthFinance] = useState<MonthlyFinanceDTO>()
  const [openEditDeliveriesDialog, setOpenEditDeliveriesDialog] = useState<boolean>(false);
  const [clickFlag, setClickFlag] = useState(false)
  const [newDeliveries, setnewDeliveries] = useState(0)
  const [expensesData, setExpensesData] = useState<ExpenseDTO[] | any>([])
  const [visaExpDate, setVisaExpDate] = useState<string | undefined>("")
  const [flightTicketsDueDate, setFlightTicketsDueDate] = useState<string | undefined>("")
  const [duePaymentsDueDate, setDuePaymentsDueDate] = useState<string | undefined>("")


  const { data: session } = useSession()
  const router = useRouter();
  const params = useParams();
  const employeeId: string = params?.employeeId ? params?.employeeId.toString() : ""

  

  const token = session?.user?.email ?? TOKEN.token
  useEffect(() => {
    async function fetchEmployee() {
      try {
        const employeeData = await getEmployee(employeeId, token);
        const _currMonthFinance: MonthlyFinanceDTO = await getCurrentMonthFinance(employeeId, token);
        setCurrMonthFinance(_currMonthFinance)
        console.log(_currMonthFinance);
        setExpensesData(_currMonthFinance?.monthlyExpenses?.sort((a: any, b: any) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()))
        setEmployee(employeeData);
        setVisaExpDate(employeeData?.personalDetails?.visaExpiryDate?.toString())
        setFlightTicketsDueDate(employeeData?.personalDetails?.flightTicketsDueDate?.toString())
        setDuePaymentsDueDate(employeeData?.personalDetails?.duesPayDate?.toString())
        
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    }

    fetchEmployee();
  }, [token, employeeId, isLoading]);

  const employeeData = { // mock data // personal details data
    "الإسم": (employee?.firstName + " " + employee?.lastName),
    "رقم الهاتف": employee?.phoneNumber,
    "المدة المتبقية في الإقامة": getRemainingMonthsAndDays(visaExpDate),
    "موعد صرف مستحقات الأجازة": getRemainingMonthsAndDays(duePaymentsDueDate),
    "استحاق تذاكر السفر": getRemainingMonthsAndDays(flightTicketsDueDate)
  }



  menuItemOptions.option1.url = `/add-details`
  menuItemOptions.option2.url = `/add-details`
  menuItemOptions.option3.url = `/add-details`


  const totalMonthlyExpenses = expensesData
    ? expensesData
        .filter((e: ExpenseDTO) => e.isFixed == false) 
        .reduce((total: number, e: ExpenseDTO) => total + e.amount, 0)
    : 0;

  const totalFixedExpenses = calculateTotalFixed();

  function calculateTotalFixed(): number {
    return employee?.fixedExpnenses
    ? employee?.fixedExpnenses
        .filter((e: ExpenseDTO) => e.isFixed == true) 
        .reduce((total: number, e: ExpenseDTO) => total + e.amount, 0)
    : 0;
  }

  const handleAddExpense = (e: any) => {
    e.preventDefault()
    router.push(`/nkry-ca/manage-employee/${employeeId}/add-finance`)
  }
  const handleAddExpenseFixed = (e: any) => {
    e.preventDefault()
    router.push(`/nkry-ca/manage-employee/${employeeId}/add-finance-fixed`)
  }

  const handleOpenConfirmationDialog = () => {
    setOpenConfirmationDialog(true);
  };

  const handleCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
  };

  const handleDelete = (e: any) => {
    e.preventDefault();
    handleOpenConfirmationDialog();
  };

  const handleConfirmDelete = () => {
    setIsLoading(true);
    deleteEmployee(employeeId, token)
      .then((result) => {
        setIsLoading(false);
        router.push(`/nkry-ca/manage-employee`);
      })
      .catch((err) => {
        setIsLoading(false);
        alert(err);
      })
      .finally(() => {
        handleCloseConfirmationDialog();
      });
    };

  const handleOpenEditDeliveriesDialog = () => {
    setOpenEditDeliveriesDialog(true);
  };

  const handleCloseEditDeliveriesDialog = () => {
    setOpenEditDeliveriesDialog(false);
  };

  const handleEditDeliveriesDialogSave = () => {
    if (newDeliveries == 0 || newDeliveries == undefined) {
      return;
    } 
    setIsLoading(true)

    let _newDeliveries = newDeliveries + (currMonthFinance?.deliveriesMade ?? 0);
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth() + 1; // Note: Months are zero-indexed, so we add 1
    let currentYear = currentDate.getFullYear();

    let data: DeliveriesUpdateDTO = {
      deliveriesMade: _newDeliveries,
      dueMonth: currentMonth, 
      dueYear: currentYear,
      employeeId: employeeId,
    }
      updateDeliveriesOfEmployee(data, employeeId, token).then(
        () => {
          setIsLoading(false)
          handleCloseEditDeliveriesDialog();
        }
      ).catch(err => {
        console.log(err);
        setIsLoading(false)

      })
  };


  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "row", alignContent: "center" }}
      >
        <Button href="/nkry-ca/manage-employee" variant="text" color="info">
          <KeyboardDoubleArrowLeftIcon /> Back to all employees
        </Button>
      </Box>
      <section>
        <Container sx={{ py: 5 }}>
          <Grid container>
            <Grid item xs={12}>
              {/* <Breadcrumbs className="bg-light rounded-3 p-3 mb-4">
              <Typography>
                <a href="#">Home</a>
              </Typography>
              <Typography>
                <a href="#">User</a>
              </Typography>
              <Typography color="textPrimary">User Profile</Typography>
            </Breadcrumbs> */}
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={{ marginBottom: 4 }}>
                <CardContent
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CardMedia
                    component="img"
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    style={{ width: "150px", borderRadius: "50%" }}
                    sx={{ mb: 2 }}
                  />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mb: 1 }}
                  >
                    {employee?.firstName + " " + employee?.lastName} - {employee?.job}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mb: 0.5 }}
                  >
                    {employee?.address}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mb: 4 }}
                  >
                    {employee?.phoneNumber}
                  </Typography>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mb: 2 }}
                  >

                    <Button variant="outlined" color="warning">
                      EDIT
                    </Button>
                    <Button
                      onClick={handleDelete}
                      disabled={isLoading}
                      variant="contained"
                      color="error"
                      sx={{ ml: 1, mr: 1 }}>
                      DELETE
                    </Button>
                    <Dialog
                      open={openConfirmationDialog}
                      onClose={handleCloseConfirmationDialog}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <Box display="flex" alignContent="center" alignItems="center">
                        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}
                        </DialogTitle>
                        <WarningIcon sx={{ color: '#FFA500', mr: 1, ml: "-10px", }} />
                      </Box>

                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Are you sure you want to delete this employee?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button disabled={isLoading} onClick={handleCloseConfirmationDialog} color="primary">
                          Cancel
                        </Button>
                        <Button disabled={isLoading}  onClick={handleConfirmDelete} color="error" autoFocus>
                          Confirm
                        </Button>
                      </DialogActions>
                    </Dialog>


                    <MenuItem
                      option1={menuItemOptions.option1}
                      option2={menuItemOptions.option2}
                      option3={menuItemOptions.option3}
                      option4={menuItemOptions.option4}
                    ></MenuItem>
                  </Box>
                </CardContent>
              </Card>

              <Card>
                {/* TODO: replace the content in hear within the last 3 month total salaries, and current base salary and current delivery rate */}
                <CardContent sx={{ p: 0 }}>
                  <List sx={{ borderRadius: 3 }}>
                    <ListItem sx={{ justifyContent: "space-between", p: 3 }}>
                      {/* <FacebookIcon color="warning" /> */}
                      <ListItemText primary="Base Salary - الراتب الأساسي" /> SAR {employee?.fixedFinance?.baseSalary} 
                    </ListItem>
                    <ListItem sx={{ justifyContent: "space-between", p: 3 }}>
                      {/* <GitHubIcon sx={{ color: "#333333" }} /> */}
                      <ListItemText primary="Delivery Rate"/>
                       SAR {employee?.fixedFinance?.deliveryRate} 
                    </ListItem>
                    <ListItem sx={{ justifyContent: "space-between", p: 3 }}>
                      {/* <TwitterIcon sx={{ color: "#55acee" }} /> */}
                      <ListItemText primary="@mdbootstrap" />
                    </ListItem>
                    <ListItem sx={{ justifyContent: "space-between", p: 3 }}>
                      {/* <InstagramIcon sx={{ color: "#ac2bac" }} /> */}
                      <ListItemText primary="mdbootstrap" />
                    </ListItem>
                    <ListItem sx={{ justifyContent: "space-between", p: 3 }}>
                      {/* <FacebookIcon sx={{ color: "#3b5998" }} /> */}
                      <ListItemText primary="mdbootstrap" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              <Card sx={{ textAlign: "right" }}>
                <CardContent>
                  {Object.entries(employeeData).map(([key, value]) => {
                    return (
                      <div key={key}>
                        <Grid container>
                          <Grid item xs={3}>
                            <Typography variant="body1" color="textSecondary">
                              {value}
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <Typography variant="body1">{key}</Typography>
                          </Grid>
                        </Grid>
                        <hr />
                      </div>
                    );
                  })}

                  {/* Other profile details */}
                </CardContent>
              </Card>

              {/* Car Details */}
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} md={6}>
                  <Card className="mb-4">
                    <CardContent>
                      <Typography variant="body2" color="textSecondary">
                        Car Details
                      </Typography>
                      {/* Project status details */}
                      <Box>
                        <Typography variant="body2" color="textSecondary">
                          {employee?.car?.company + " - " + employee?.car?.model + " - " + employee?.car?.manfactureYear}
                        </Typography>
                        <p>{employee?.car?.plateNumber ?? " "}</p>
                      </Box>
                    </CardContent>
                  </Card>

                  {/* monthly target section */}
                  <Card sx={{ marginTop: "10px", position: "relative" }} className="mb-4">
                    <CardContent>
                      <Typography variant="body2" color="textSecondary">
                        Monthly Target - بيانات الشهر الحالي
                      </Typography>
                      <br></br>
                      {/* Project status details */}
                      <Box>
                        <Typography variant="body2" color="textSecondary">
                          Deliveries count: {currMonthFinance?.deliveriesMade}
                        </Typography>
                        <p>Total Salary: {currMonthFinance?.totalSalary} SAR</p>
                      </Box>
                    </CardContent>
                    
                    {/* Edit button */}
                    <Button
                      variant="contained"
                      color="info"
                      size="small"
                      style={{ position: "absolute", top: "10px", right: "10px" }}
                      onClick={handleOpenEditDeliveriesDialog}
                      disabled={isLoading}
                    >
                      Edit
                    </Button>
                  </Card>
                    <Dialog open={openEditDeliveriesDialog} onClose={handleCloseEditDeliveriesDialog}>
                    <DialogTitle>Edit - إضافة توصيلات جديدة</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Enter the amount of new deliveries, the current is {currMonthFinance?.deliveriesMade}
                      </DialogContentText>
                      <TextField
                        label="Deliveries"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        placeholder="ادخل عدد التوصيلات الجديدة فقط"
                        value={newDeliveries ?? 0}
                        type='number'
                        onChange={(e) => setnewDeliveries(parseInt(e.target.value))}
                      />
                      <p> {( (currMonthFinance?.deliveriesMade ?? 0) + newDeliveries )} :  المجموع بعد الإضافة  </p>
                      <p> {( (currMonthFinance?.deliveriesMade ?? 0) )} :  الحالي  </p>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseEditDeliveriesDialog} color="warning">
                        Cancel
                      </Button>
                      <Button onClick={handleEditDeliveriesDialogSave} color="primary" disabled={isLoading}>
                        Save
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Grid>

                {/* Expenses */}


                {/* <Grid container spacing={2} sx={{ mt: 2 }}> */}
                <Grid item xs={12} md={6}>
                  <Card className="mb-4">
                    <CardContent>

                      {/* monthly expenses */}
                      <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center", alignContent: 'center', p: 1 }}>
                        <Typography variant="body2" color="textSecondary">
                          Expenses - المصروفات الشهرية
                        </Typography>
                        <Button
                          id="demo-customized-button"
                          // aria-controls={open ? 'demo-customized-menu' : undefined}
                          aria-haspopup="true"
                          // aria-expanded={open ? 'true' : undefined}
                          variant="contained"
                          // disableElevation
                          onClick={handleAddExpense}
                        // endIcon={<KeyboardArrowDownIcon />}
                        >
                          إضافة مصروفات شهرية
                        </Button>
                      </Box>
                      <ul style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {
                          // todo: sort by date the sooner the first
                          expensesData?.map((e: ExpenseDTO, i: any) => {

                            return (
                              <li key={i}>
                                <Box key={i}>
                                  <Typography variant="body2" color="textSecondary">
                                    Expense: {e.name + ' '} Date: {dayjs(e?.dueDate).format('YYYY-MM-DD')} Amount: {e.amount}
                                  </Typography>
                                  {/* <p>KSF 2406</p> */}
                                </Box>
                              </li>
                            )
                          })
                        }
                      </ul>

                      {/* fixed finance */}
                      <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center", alignContent: 'center', p: 1 }}>
                        <Typography variant="body2" color="textSecondary">
                          Expenses - المصروفات
                        </Typography>
                        <Button
                          id="demo-customized-button"
                          // aria-controls={open ? 'demo-customized-menu' : undefined}
                          aria-haspopup="true"
                          // aria-expanded={open ? 'true' : undefined}
                          variant="contained"
                          // disableElevation
                          onClick={handleAddExpenseFixed}
                        // endIcon={<KeyboardArrowDownIcon />}
                        >
                          إضافة مصروفات
                        </Button>
                      </Box>
                      <ul style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {
                          // todo: sort by date the sooner the first
                          employee?.fixedExpnenses?.map((e: ExpenseDTO, i: any) => {

                            return (
                              <li key={i}>
                                <Box key={i}>
                                  <Typography variant="body2" color="textSecondary">
                                    Expense: {e.name + ' '} Due Date: {dayjs(e.dueDate).format('YYYY-MM-DD')} Amount: {e.amount}
                                  </Typography>
                                  {/* <p>KSF 2406</p> */}
                                </Box>
                              </li>
                            )
                          })
                        }
                      </ul>

                      <Typography>Total Monthly Expenses: {totalMonthlyExpenses} &#65020;	</Typography>
                      <Typography>Total Fixed Expenses: {totalFixedExpenses} &#65020;	</Typography>
                    </CardContent>
                  </Card>
                </Grid>


              </Grid>
            </Grid>
          </Grid>
        </Container>
      </section>
    </>
  );
}


const getTimeDifference = (targetDate: Date, currentDate: Date): number => {
  return (targetDate.getTime() - currentDate.getTime())
}

const getRemainingMonthsAndDays = (targetDate: string | undefined) => {
  if (targetDate?.trim() === '') {
    return "Not set - لم يتم التحديد"
  }
  const _targetDate = new Date(targetDate ?? "")
  const currentDate = new Date()

  const timeDifferenceInMs = getTimeDifference(_targetDate, currentDate)

  const remainingDays = Math.ceil(timeDifferenceInMs / (1000 * 60 * 60 * 24))

  const remainingYears = Math.floor(remainingDays / 365);
  const remainingMonths = Math.floor((remainingDays % 365) / 30);
  const remainingDaysInMonth = remainingDays - (remainingYears * 365) - (remainingMonths * 30);

  return `${remainingYears} Years, and ${remainingMonths} Months and ${remainingDaysInMonth} Days.`
}