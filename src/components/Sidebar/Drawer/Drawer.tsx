'use client'
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useMediaQuery } from '@mui/material';
import { tabletSize } from '@/lib/mediaSizes';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/dist/client/components/navigation';

const drawerWidth = 240;

export const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(0),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));



export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft( {open, handleDrawerClose, ref} : {open: boolean, handleDrawerClose: React.ReactEventHandler, ref?: React.MutableRefObject<null>} ) {
  const theme = useTheme();
  const mobileCheck = useMediaQuery(tabletSize)
  const pathname = usePathname();
  const isOnNKRY_CA = pathname?.startsWith('/nkry-ca');

  const routes: string[] = ['analytics', 'invoices', 'manage-employee', 'settings', '']
  const routeTranslations: string[] = ['Analytics', 'Invoices', 'Manage Employees', 'Settings', 'Sign Out']
  const routeIcons: React.JSX.Element[] = [
    <InsertChartIcon key={0} color='primary'/>,
    <ListAltIcon key={1} color='primary'/>,
    <ManageAccountsIcon key={2} color='primary'/>,
    <AdminPanelSettingsIcon key={3} color='primary'/>,
    <LogoutOutlinedIcon key={4} color='error' />
  ]

  let signOutClicked: boolean = false;

  const handleOnClickIcon = (e:any, text: string ) => {
    if (text === "Sign Out") {
      signOutClicked = !signOutClicked; // raise a flag that signout was clicked
      
      setTimeout(() => {
        signOut()
      }, 3000);

    }
    handleDrawerClose(e)
  }
  
  React.useEffect(()=> {
    localStorage.removeItem("userToken")
  }, [signOutClicked])

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 1,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          top: open ? (mobileCheck ? 64 : 57) : 0,
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
      // ref={ref}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {routeTranslations.map((text, index) => {
          let nkrycaUrl = index === 2 ? "/nkry-ca/" : "/nkry-ca/dashboard/"
          if (index === 1) {
            nkrycaUrl = "/nkry-ca/customer-service/"
          }
          return (<ListItem
            key={text}
            disablePadding
            onClick={(e) => {
              handleOnClickIcon(e, text);
            }}
          >
            <Link
              href={`${
                isOnNKRY_CA
                  ? nkrycaUrl + encodeURIComponent(routes[index])
                  : "/workers-manager/dashboard/" + encodeURIComponent(routes[index])
              }`}
              style={{
                textDecoration: "none",
                color: theme.palette.text.secondary,
              }}
            >
              <ListItemButton>
                <ListItemIcon>{routeIcons[index]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </Link>
          </ListItem>)
        })}
      </List>
      <Divider />
    </Drawer>
  );
}