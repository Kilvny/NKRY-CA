'use client'
import React, { ChangeEvent, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import styles from './invoicesNew.module.scss'; // Import the SCSS module
import { HexColorPicker } from "react-colorful";
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'fit-content',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    
  };
  




const New = () => {
    const [color, setColor] = useState("#b32aa9");
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  

      // Payment status options
  const paymentStatusOptions = [
    { value: 'fully_paid', label: 'Fully Paid' },
    { value: 'partly_paid', label: 'Partly Paid' },
  ];

  // State to keep track of payment status
  const [paymentStatus, setPaymentStatus] = useState<string>('');
  const [paidAmount, setPaidAmount] = useState<string>('');
  const [remainingAmount, setRemainingAmount] = useState<string>('');

  // Handler for changing the payment status based on paid and remaining amount
  const handlePaymentStatusChange = (paidAmount : string, remainingAmount : string) => {
    if (Number(paidAmount) === 0) {
      setPaymentStatus(''); // If paid amount is 0, no status
    } else if (Number(remainingAmount) === 0) {
      setPaymentStatus('fully_paid'); // If remaining amount is 0, fully paid
    } else {
      setPaymentStatus('partly_paid'); // Otherwise, partly paid
    }
  };

  // Event handler for Paid Amount field change
  const handlePaidAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const paidAmount = e.target.value;
    const remainingAmount = ''; // Get the remaining amount from the state or input field
    handlePaymentStatusChange(paidAmount, remainingAmount);
  };

  // Event handler for Remaining Amount field change
  const handleRemainingAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const remainingAmount = e.target.value;
    const paidAmount = ''; // Get the paid amount from the state or input field
    handlePaymentStatusChange(paidAmount, remainingAmount);
  };


  return (
    <Box className={styles.container} sx={{ p: 2 , display: 'flex', flexWrap: 'wrap'}}>
      <h2 className={styles.mainTitle}>Create New Invoice</h2>
      {/* Customer name field */}
      <TextField
        label="Customer Name"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      {/* Customer city field */}
      <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
      <TextField
        label="Customer City"
        variant="outlined"
        margin="normal"
        sx={{width: "49%"}}
      />
      {/* Customer number field */}
      <TextField
        label="Customer Number"
        variant="outlined"
        margin="normal"
        sx={{width: "49%"}}

      />
      </Box>
      {/* Order details field */}
      <TextField
        label="Order Details"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        margin="normal"
      />
      {/* Sizes field (Height, width, depth) */}
      <Paper 
      className={styles.fieldContainer} 
      sx={{ p: 2, mb: 2, width: "100%", display: 'flex', alignContent: "space-between", 
      '@media (max-width: 768px)': 
      {
        flexDirection: 'column', // Stack fields vertically on small screens
      }
      }}>
        <Box className={styles.sizesContainer}
        sx={{ display: 'flex', gap: '10px', alignItems: "center",
        '@media (max-width: 768px)': {
            flexDirection: 'column', // Stack fields vertically on small screens
          }
        }}>
        <InputLabel>Sizes (H, W, D)</InputLabel>
          <TextField
            label="Height"
            variant="outlined"
            margin="none"
            size="small"

          />
          <TextField
            label="Width"
            variant="outlined"
            margin="none"
            size="small"

          />
          <TextField
            label="Depth"
            variant="outlined"
            margin="none"
            size="small"
            
            />
        </Box>
        {/* Color field */}
        <Box 
        sx={{ display: 'flex', gap: '10px', alignItems: 'center', ml: 3,
        '@media (max-width: 768px)': {
            flexDirection: 'column', // Stack color fields vertically on small screens
            alignItems: 'flex-start', // Align label to the left on small screens
            mt: 2, // Add some margin at the top for better spacing
          }
        }}>
        <InputLabel sx={{borderLeftColor: color}}>Color</InputLabel>
            <FormControl variant="outlined" size="small">
           
            <Button onClick={handleOpen} sx={{borderLeft: '40px solid', borderLeftColor: color }}>color</Button>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                Select Color
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <HexColorPicker color={color} onChange={setColor} />
                </Typography>
            </Box>
            </Modal>
            </FormControl>
            <TextField
            label="Custom Color"
            variant="outlined"
            size="small"
            />
        </Box>
      </Paper>
      {/* Other add-ons field */}
      <Box className={styles.otherAddonsContainer} sx={{ display: 'flex', gap: '10px', alignItems: 'center', width: "100%" }}>
        <TextField
          label="Text Add-on"
          variant="outlined"
          fullWidth
          margin="none"
        />
        <input
          accept="image/*"
          id="photo-attachment"
          type="file"
          style={{ display: 'none' }}
        />
        <label htmlFor="photo-attachment">
          <IconButton color="primary" component="span">
            <PhotoCameraIcon />
          </IconButton>
        </label>
      </Box>
      {/* Price field */}
      <TextField
        label="Price"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      {/* Paid amount field */}
      <TextField
        label="Paid Amount"
        variant="outlined"
        fullWidth
        margin="normal"
        // value={paidAmount} // Use the state value for paidAmount
        onChange={handlePaidAmountChange} // Attach the event handler
      />
      {/* Remaining amount field */}
      <TextField
        label="Remaining Amount"
        variant="outlined"
        fullWidth
        margin="normal"
        // value={remainingAmount} // Use the state value for remainingAmount
        onChange={handleRemainingAmountChange} // Attach the event handler
      />
      {/* Payment status */}
      <TextField
        label="Payment Status"
        variant="outlined"
        fullWidth
        margin="normal"
        value={paymentStatus}
        disabled // Disable this field since it will be automatically calculated
      />
      {/* Delivery Company */}
      <TextField
        label="Delivery Company"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      {/* Save button */}
      <Button color="success" variant="contained" size="large">
        Save
      </Button>
      {/* After that, the Tax invoice is generated and customer service is redirected to a screen where the Tax invoice is displayed. Also, the invoice appears on the invoices, and the craftsman can view it and add details such as the initial cost and stuff */}
      {/* Invoice status once it's created is NEW then if the craftsman added the initial cost it will be updated to Preparation, after that, the CS agent can change the status to "Out for delivery" "Received" */}
    </Box>
  );
};


export default New