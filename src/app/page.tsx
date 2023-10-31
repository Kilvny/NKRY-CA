'use client'
import { SessionProvider, useSession } from "next-auth/react"
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Typography, Button } from '@mui/material';
import Link from "next/link";

import { Theme } from '@mui/material/styles';
import { useTheme, DefaultTheme } from "@mui/styles";
import { getCurrentUser } from "@/services/authentication.service";
import { token } from "../../token.json"

// declare module '@mui/styles/defaultTheme' {
//   interface DefaultTheme extends Theme {}
// }

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    // backgroundColor: '#f0f0f0',
    opacity: 0,
    animation: '$fadeIn 1s ease-in-out forwards',
  },
  title: {
    marginBottom: '20px',
    letterSpacing: '2px',
  },
  subtitle: {
    // marginBottom: theme.spacing(4),
    letterSpacing: '2px',
    marginTop: '-80px',
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    justifyContent: 'space-evenly',
    alignContent: 'center'
  },
  optionButton: {
    width: '100%',
    opacity: 0,
    animation: '$fadeIn 1s ease-in-out forwards',
    animationDelay: '0.5s',
    fontSize: '30px'
  },
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

const LandingPage = () => {
  const theme = useTheme()
  const classes = useStyles();
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userToken = token
  if (userToken) {
    localStorage.setItem("userToken", userToken);
    // console.log("User token saved to localStorage:", userToken);
  } else {
    console.log("User token is not available or empty.");
  }
    const delay = setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      return () => clearTimeout(delay);
  }, [])
  
  return (

    <>
    
    {
    isLoading ? <span>Loading...</span> 
    
    :
    (<div className={classes.container}>
      <Typography variant="h6" className={classes.subtitle}>
        Welcome <p role="img" aria-label="waving-hand" style={{display: 'inline'}}>&#x1F44B;</p>
      </Typography>
      <Typography variant="h1" className={classes.title}>
        NKRY
      </Typography>
      <div className={classes.options}>
        <Link href="/nkry-ca/manage-employee" style={{ textDecoration: 'none' }}>
          <Button variant="text" size='large' color="success" className={classes.optionButton}>
            Manage Workers, Expenses
          </Button>
        </Link>
        <Typography variant="h4" className="" textAlign='center' alignSelf='center'>
        |
      </Typography>
        <Link href="/nkry-ca" style={{ textDecoration: 'none' }}>
          <Button variant="text" size='large' color="success" className={classes.optionButton}>
            NKRY - CA
          </Button>
        </Link>
      </div>
    </div>)}
    
    </>
  );
};

export default LandingPage;
