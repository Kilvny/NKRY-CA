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

const New = () => {
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
    <Box sx={{ p: 2 }}>
      <h2>Create New Invoice</h2>
      {/* Customer name field */}
      <TextField
        label="Customer Name"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      {/* Customer city field */}
      <TextField
        label="Customer City"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      {/* Customer number field */}
      <TextField
        label="Customer Number"
        variant="outlined"
        fullWidth
        margin="normal"
      />
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
      <Paper sx={{ p: 2, mb: 2 }}>
        <InputLabel>Sizes (H, W, D)</InputLabel>
        <Box sx={{ display: 'flex', gap: '10px' }}>
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
      </Paper>
      {/* Color field */}
      <InputLabel>Color</InputLabel>
      <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <FormControl variant="outlined" size="small">
          <Select
            label="Color Palette"
            value={''} // Replace with the actual selected color value
            onChange={(e) => {
              // Handle color change here
            }}
          >
            <MenuItem value="">Select Color</MenuItem>
            <MenuItem value="color1">Color 1</MenuItem>
            <MenuItem value="color2">Color 2</MenuItem>
            {/* Add more color options as needed */}
          </Select>
        </FormControl>
        <TextField
          label="Custom Color"
          variant="outlined"
          size="small"
        />
      </Box>
      {/* Other add-ons field */}
      <InputLabel>Other Add-ons</InputLabel>
      <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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