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
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
// import { Facebook, GitHub, Twitter, Instagram } from '@mui/icons-material';




export default function About() {
    const employeeData = {
        "الإسم": "Johnatan Smith",
        "رقم الهاتف": "0503498748",
        "المدة المتبقية في الإقامة": getRemainingMonthsAndDays('2024-12-31'),
        "موعد صرف مستحقات الأجازة": getRemainingMonthsAndDays('2026-01-01'),
        "استحاق تذاكر السفر": getRemainingMonthsAndDays('2024-06-01')
    }

  return (
    <section>
      <Container sx={{ py: 5 }}>
        <Grid container>
          <Grid item xs={12}>
            <Breadcrumbs className="bg-light rounded-3 p-3 mb-4">
              <Typography>
                <a href="#">Home</a>
              </Typography>
              <Typography>
                <a href="#">User</a>
              </Typography>
              <Typography color="textPrimary">User Profile</Typography>
            </Breadcrumbs>
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
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <Button variant="outlined" color="warning">
                    EDIT
                  </Button>
                  <Button variant="contained" color="error" sx={{ ml: 1 }}>
                    DELETE
                  </Button>
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardContent sx={{ p: 0 }}>
                <List sx={{ borderRadius: 3 }}>
                  <ListItem sx={{ justifyContent: "space-between", p: 3 }}>
                    <FacebookIcon color="warning" />
                    <ListItemText primary="https://mdbootstrap.com" />
                  </ListItem>
                  <ListItem sx={{ justifyContent: "space-between", p: 3 }}>
                    <GitHubIcon sx={{ color: "#333333" }} />
                    <ListItemText primary="mdbootstrap" />
                  </ListItem>
                  <ListItem sx={{ justifyContent: "space-between", p: 3 }}>
                    <TwitterIcon sx={{ color: "#55acee" }} />
                    <ListItemText primary="@mdbootstrap" />
                  </ListItem>
                  <ListItem sx={{ justifyContent: "space-between", p: 3 }}>
                    <InstagramIcon sx={{ color: "#ac2bac" }} />
                    <ListItemText primary="mdbootstrap" />
                  </ListItem>
                  <ListItem sx={{ justifyContent: "space-between", p: 3 }}>
                    <FacebookIcon sx={{ color: "#3b5998" }} />
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
                    <>
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
                    </>
                  );
                })}

                {/* Other profile details */}
              </CardContent>
            </Card>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} md={6}>
                <Card className="mb-4">
                  <CardContent>
                    <Typography variant="body2" color="textSecondary">
                      Car Details
                    </Typography>
                    {/* Project status details */}
                    <Typography variant="body2" color="textSecondary">
                      Toyota H1 - 2021
                      <p>KSF 2406</p>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card className="mb-4">
                  <CardContent>
                    <Typography variant="body2" color="textSecondary">
                      Monthly Target
                    </Typography>
                    {/* Project status details */}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </section>
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