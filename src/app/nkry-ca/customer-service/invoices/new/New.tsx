'use client'
import React, { ChangeEvent, useEffect, useState } from 'react';
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
import { InvoiceDTO } from '@/DTOs/Invoice';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useSession } from 'next-auth/react';
import { postInvoice } from '@/services/invoices.service';
import { token as TOKEN } from "../../../../../../token.json";



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
  
    const [billTo, setBillTo] = useState('');
    const [items, setItems] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    // State to keep track of payment status
    const [paymentStatus, setPaymentStatus] = useState<number>(0);
    const [paidAmount, setPaidAmount] = useState<number>(0);
    const [remainingAmount, setRemainingAmount] = useState<number>(0);

    const [height, setHeight] = useState<number>(0);
    const [width, setWidth] = useState<number>(0);
    const [depth, setDepth] = useState<number>(0);

    const [token, setToken] = useState<string | null>("");

    useEffect(() => {
      const userToken = TOKEN
      if (userToken) {
        localStorage.setItem("userToken", userToken);
        // console.log("User token saved to localStorage:", userToken);
      } 
      let token: string | null = localStorage.getItem("userToken");
      setToken(token);
    }, [color, billTo, items, quantity, description, price, remainingAmount, paymentStatus, paidAmount, token])

     const data: InvoiceDTO = {
      billTo: billTo,
      order: {
        items: items,
        quantity: quantity,
        description: description,
        price: price,
        paidAmount: paidAmount,
        color: color,
        size: {
          height: height,
          width: width,
          depth: depth
        }
      }
    }
  
    const handleBillToChange = (e: ChangeEvent<HTMLInputElement>) => {
      setBillTo(e.target.value);
    };
    
    const handleItemsChange = (e: ChangeEvent<HTMLInputElement>) => {
      setItems(e.target.value);
    };
    
    const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
      setQuantity(parseFloat(e.target.value));
    };

    const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
      setDescription(e.target.value);
    };
    
    const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
      setPrice(parseFloat(e.target.value));
    };
    const handleHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
      setHeight(parseFloat(e.target.value));
    };
    const handleWidthChange = (e: ChangeEvent<HTMLInputElement>) => {
      setWidth(parseFloat(e.target.value));
    };
    const handleDepthChange = (e: ChangeEvent<HTMLInputElement>) => {
      setDepth(parseFloat(e.target.value));
    };

    const handleColorChange = (newColor: string) => {
      console.log('Color changed to:', newColor);
      setColor(newColor);
    };
    

  const handleSave = async () => {
    console.log(data);
    try {
      // Send the formData to the API
      // Check if the token exists
      if (!token) {
        // Handle the case where there's no token (e.g., redirect to login)
        console.error('No token found.');
        return;
      }

      const postedInvoice = postInvoice(data, token);

      // Handle the response as needed (e.g., show a success message)
      console.log('Response:', postedInvoice);

      // Clear the form if needed
      // setBillTo("")
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error('Error:', error);
    }
  };
    // // uploda image 
    
    // const [image, setImage] = React.useState(null);
    // const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    //   const fileInput = document?.getElementById('profilePictureInput');
    //   const previewImage = document?.getElementById('previewImage');

        
    //         // const file = e?.target?.files[0];
    //         // const reader = new FileReader();
    //         // previewImage?.addEventListener('change', function () {
    //         //   const file = fileInput?.files[0];
    //         //   const reader = new FileReader();
  
    //         //   reader.onload = function (e) {
    //         //       previewImage.src = e.target.result;
    //         //       previewImage.style.display = 'block';
    //         //   }
  
    //           // reader.readAsDataURL(file);
    //       });

            
        // setImage(e?.target?.files[0]);
    // };

      // Payment status options
  
  
  const paymentStatusOptions = [
    { value: 'fully_paid', label: 'Fully Paid' },
    { value: 'partly_paid', label: 'Partly Paid' },
  ];



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
    setPaidAmount(parseFloat(paidAmount))
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
        name="billTo"
        label="Customer Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={billTo}
        onChange={handleBillToChange}
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
        name="items"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        value={items}
        onChange={handleItemsChange}
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
            value={height}
            onChange={handleHeightChange}

          />
          <TextField
            label="Width"
            variant="outlined"
            margin="none"
            size="small"
            value={width}
            onChange={handleWidthChange}

          />
          <TextField
            label="Depth"
            variant="outlined"
            margin="none"
            size="small"
            value={depth}
            onChange={handleDepthChange}
            
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
                <HexColorPicker color={color} onChange={handleColorChange} />
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
          name="description"
          variant="outlined"
          fullWidth
          margin="none"
          value={description}
          onChange={handleDescriptionChange}
        />
        <TextField
          label="Quantity"
          name="quantity"
          variant="outlined"
          fullWidth
          margin="none"
          value={quantity}
          onChange={handleQuantityChange}
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
        <img id="previewImage" src="#" alt="Preview" 
        style={{ display: 'none',  width: '300px', height: '300px' }}
        />
      </Box>
      {/* Price field */}
      <TextField
        label="Price"
        name="price"
        variant="outlined"
        fullWidth
        margin="normal"
        value={price}
        onChange={handlePriceChange}
      />
      {/* Paid amount field */}
      <TextField
        label="Paid Amount"
        name="paidAmount"
        variant="outlined"
        fullWidth
        margin="normal"
        // value={paidAmount} // Use the state value for paidAmount
        value={paidAmount} // Use the state value for paidAmount
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
      <Button color="success" variant="contained" size="large" onClick={handleSave}>
        Save
      </Button>
      {/* After that, the Tax invoice is generated and customer service is redirected to a screen where the Tax invoice is displayed. Also, the invoice appears on the invoices, and the craftsman can view it and add details such as the initial cost and stuff */}
      {/* Invoice status once it's created is NEW then if the craftsman added the initial cost it will be updated to Preparation, after that, the CS agent can change the status to "Out for delivery" "Received" */}
    </Box>
  );
};


export default New