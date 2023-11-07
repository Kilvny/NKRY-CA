'use client'
import React from 'react';
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
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import MenuItem from '@/components/MenuItem';
import { MenuItemOptions } from '@/components/MenuItem/MenuItem';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
// import { Facebook, GitHub, Twitter, Instagram } from '@mui/icons-material';


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
  const router = useRouter();
  const params = useParams();
  const employeeId = params?.employeeId


    const employeeData = { // mock data
        "الإسم": "Johnatan Smith",
        "رقم الهاتف": "0503498748",
        "المدة المتبقية في الإقامة": getRemainingMonthsAndDays('2024-12-31'),
        "موعد صرف مستحقات الأجازة": getRemainingMonthsAndDays('2026-01-01'),
        "استحاق تذاكر السفر": getRemainingMonthsAndDays('2024-06-01')
    }

    const expensesData = [
      { expense: "تجديد اقامة", date: "2015-12-06", amount: "1500 SAR" },
      { expense: "تجديد تأمين", date: "2018-12-06", amount: "3550 SAR" },
    ];

    // const params = useParams();
    // const employeeId = params?.employeeId
    
    menuItemOptions.option1.url = `/add-details`
    menuItemOptions.option2.url = `/add-details`
    menuItemOptions.option3.url = `/add-details`

    const handleAddExpense = (e: any) => {
      e.preventDefault()
      router.push(`/nkry-ca/manage-employee/${employeeId}/add-finance`)
    }
    const handleAddExpenseFixed = (e: any) => {
      e.preventDefault()
      router.push(`/nkry-ca/manage-employee/${employeeId}/add-finance-fixed`)
    }
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
                    EMBLOYEE NAME - Driver
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mb: 0.5 }}
                  >
                    Bay Area, San Francisco, CA
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mb: 4 }}
                  >
                    +96650577968
                  </Typography>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mb: 2 }}
                  >
                    <Button variant="outlined" color="warning">
                      EDIT
                    </Button>
                    <Button variant="contained" color="error" sx={{ ml: 1, mr: 1 }}>
                      DELETE
                    </Button>

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
                      <ListItemText primary="Base Salary - الراتب الأساسي" /> 3800 SAR
                    </ListItem>
                    <ListItem sx={{ justifyContent: "space-between", p: 3 }}>
                      {/* <GitHubIcon sx={{ color: "#333333" }} /> */}
                      <ListItemText primary="Delivery Rate" /> ا25 ريال للطلب  
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
                          Toyota H1 - 2021
                        </Typography>
                        <p>KSF 2406</p>
                      </Box>
                    </CardContent>
                  </Card>

                  {/* monthly target section */}
                  <Card sx={{marginTop: "10px"}} className="mb-4">
                    <CardContent>
                      <Typography variant="body2" color="textSecondary">
                        Monthly Target
                      </Typography>
                      {/* Project status details */}
                      <Box>
                        <Typography variant="body2" color="textSecondary">
                          Deliveries count : 15
                        </Typography>
                        <p>Total 2406 SAR</p>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                  {/* Expenses */}

                  
              {/* <Grid container spacing={2} sx={{ mt: 2 }}> */}
                <Grid item xs={12} md={6}>
                  <Card className="mb-4">
                    <CardContent>

                      {/* monthly expenses */}
                    <Box sx={{display: 'flex', justifyContent: "space-between", alignItems: "center", alignContent: 'center', p: 1}}>
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
                      <ul>
                      {
                        // todo: sort by date the sooner the first
                        expensesData.map( (e, i)=> {

                          return (
                                <li key={i}>
                            <Box key={i}>
                            <Typography variant="body2" color="textSecondary">
                                Expense: {e.expense + ' '} Date: {e.date} Amount: {e.amount}
                            </Typography>
                            {/* <p>KSF 2406</p> */}
                          </Box>
                                </li>
                          )
                        })
                      }
                        </ul>

                        {/* fixed finance */}
                        <Box sx={{display: 'flex', justifyContent: "space-between", alignItems: "center", alignContent: 'center', p: 1}}>
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
                      <ul>
                      {
                        // todo: sort by date the sooner the first
                        expensesData.map( (e, i)=> {

                          return (
                                <li key={i}>
                            <Box key={i}>
                            <Typography variant="body2" color="textSecondary">
                                Expense: {e.expense + ' '} Date: {e.date} Amount: {e.amount}
                            </Typography>
                            {/* <p>KSF 2406</p> */}
                          </Box>
                                </li>
                          )
                        })
                      }
                        </ul>

                        <Typography>Total Expenses: 5050.00 ريال</Typography>
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


const getTimeDifference = (targetDate: Date, currentDate: Date) : number => {
    return (targetDate.getTime() - currentDate.getTime())
} 

const getRemainingMonthsAndDays = (targetDate: string) => {
    const _targetDate = new Date(targetDate)
    const currentDate = new Date()
    
    const timeDifferenceInMs = getTimeDifference(_targetDate, currentDate)
    
    const remainingDays = Math.ceil(timeDifferenceInMs / (1000 * 60 * 60 * 24))

    const remainingYears = Math.floor(remainingDays / 365);
    const remainingMonths = Math.floor((remainingDays % 365) / 30);
    const remainingDaysInMonth = remainingDays - (remainingYears * 365) - (remainingMonths * 30);
    
    return `${remainingYears} Years, and ${remainingMonths} Months and ${remainingDaysInMonth} Days.`
}