import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import PaymentIcon from '@mui/icons-material/Payment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'; // dots icon
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FlightIcon from '@mui/icons-material/Flight';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export interface MenuItemOptions {
    option1: {
        text: string,
        url: string
    },
    option2: {
        text: string,
        url: string
    },
    option3: {
        text: string,
        url: string
    },
    option4: {
        text: string,
        url: string
    },
    option5?: {
        text: string,
        url: string
    }
}

export default function CustomizedMenus(props : MenuItemOptions) {
  const {option1 , option2 , option3 , option4, option5 } = props
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (url: string) => {
    setAnchorEl(null);
    // SyntheticBaseEvent  is passed when opening the menu & close it but not choosing an item
    if(typeof url === 'string') {
        console.log(url); // TODO: handle navigation 
    }
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        إضافة تفاصيل الموظف
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleClose(option1?.url)} disableRipple>
          <EditIcon />
          {option1?.text}
        </MenuItem>
        <MenuItem onClick={() => handleClose(option2?.url)} disableRipple>
          <FlightIcon />
          {option2?.text}
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={() => handleClose(option3?.url)} disableRipple>
          <ArchiveIcon />
          {option3?.text}
        </MenuItem>
        <MenuItem onClick={() => handleClose(option4?.url)} disableRipple>
          <PaymentIcon />
          {option4?.text}
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
