'use client'
import React from 'react'
import { Typography, Box, Grid, IconButton, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import ReceiptIcon from '@mui/icons-material/Receipt';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { makeStyles } from '@mui/styles';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { PDFViewer, Document, Page, Text } from '@react-pdf/renderer';
import PdfIcon from '@mui/icons-material/PictureAsPdf';
import Link from 'next/link';



interface TaxInvoiceOptions {
  billTo: string;
  customerName?: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  item: string;
  description: string;
  quantity: number;
  price: number;
}

const TaxInvoice: React.FC<TaxInvoiceOptions> = (props) => {
  const { billTo, customerName, invoiceNumber, date, dueDate, item, description, quantity, price } = props;

  const vatRate = 0.15; // Example VAT rate, you can adjust this as needed.

  const calculateSubtotal = () => {
    return quantity * price;
  };

  const calculateTotalVAT = () => {
    return calculateSubtotal() * vatRate;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTotalVAT();
  };

  const handleShareViaWhatsApp = () => {
    // Implement share via WhatsApp functionality
  };

  const handleShareViaEmail = () => {
    // Implement share via email functionality
  };

  const handlePrintAsPDF = () => {
    const content = document.getElementById('invoice-content');
    const logoImage = 'https://i.ibb.co/HTY8svw/nkry-logo.jpg'; // Replace with your actual logo image path
  
    if (content) {
      // Create a new window to display the PDF
      const newWindow = window.open('', '_blank');
  
      // Define print styles to retain the layout and styling
      const printStyles = `
        <style>
          @page {
            size: A4 portrait;
            margin: 20mm;
          }
          body {
            font-size: 22px !important;
          }
          /* Add additional print styles here as needed */
          .invoice-content {
            margin-top: 40px;
          }
          .logo-container {
            position: absolute;
            top: 20px;
            right: 20px;
          }
          .logo {
            width: 200px;
            height: auto;
          }
          /* Add more styles for the rest of the content here */
        </style>
      `;
  
      // Render the content and logo as a PDF
      newWindow &&
        newWindow.document.write(`
          <html>
            <head>
              <title>Tax Invoice - PDF</title>
              ${printStyles}
            </head>
            <body>
              <!-- Logo -->
              <div class="logo-container">
                <img class="logo" src="${logoImage}" alt="Logo" />
              </div>
              <!-- Content -->
              <div class="invoice-content">
                ${content.innerHTML}
              </div>
            </body>
          </html>
        `
        );
      newWindow && newWindow.document.close();
      newWindow && newWindow.print();
    }
  }

  
  const useStyles = makeStyles((theme: any) => ({
    root: {
      padding: theme.spacing(2),
      backgroundColor: theme.palette.background.default,
    },
    logo: {
      width: 500, // Adjust the logo image size as needed
      height: 100,
      objectFit: 'cover',
    },
    titleContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: theme.spacing(2),
    },
    tableContainer: {
      marginTop: theme.spacing(4),
      width: "100%"
    },
    barcodeContainer: {
      marginTop: theme.spacing(4),
      display: 'flex',
      justifyContent: 'flex-end',
    },
    barcode: {
      width: 200, // Adjust the barcode image size as needed
      height: 200,
    //   objectFit: 'cover',
    },
    // table 
    table: {
        marginTop: theme.spacing(2),
        borderCollapse: 'collapse',
        '& th, td': {
          padding: theme.spacing(1),
          border: '1px solid black',
        },
        '& th': {
          background: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        },
      },
    shareButton: {
        display: 'flex',
        alignItems: 'center',
        '& > *:not(:last-child)': {
          marginRight: theme.spacing(1),
        } 
      }
  }));

  const classes = useStyles();
  


  return (
    <>
      <Box sx={{display: 'flex', flexDirection: 'row', alignContent: 'center'}}>
        <Button 
        href='/nkry-ca/customer-service/invoices'
        variant='text'
        color='info'
        ><KeyboardDoubleArrowLeftIcon / > All invoices
        </Button>

      </Box>
      <img style={{
              position: 'absolute',
              top: '120px',
              right: '60px',
              width: '100px',
              height: '100px'
          }} src="https://i.ibb.co/HTY8svw/nkry-logo.jpg" alt="Logo" />
    <Box className={classes.root} id="invoice-content">
      <Box className={classes.titleContainer}>
        <Typography variant="h4">فاتورة ضريبية</Typography>
        <Typography variant="h5">Tax Invoice</Typography>
        {/* Replace the 'src' attribute with your logo image path */}
      </Box>

      <Grid container spacing={2}>
        {/* Left side */}
        <Grid item xs={6}>
          {/* NKRY LOGO */}
          <Typography variant="h6" sx={{color: '#222222'}}>شركة مجهد مجاهد المطيري</Typography>
          <Typography variant="h6" sx={{color: '#222222'}}>NKRY</Typography>
          <Typography variant="body1">الرياض - حي بدر <br/ > المملكة العربية السعودية</Typography>
          <Typography variant="h6" sx={{mt:1}}>رقم التسجيل الضريبي</Typography>
          <Typography variant="h7" sx={{color: 'gray'}}>Tax Registration Number</Typography>
          <Typography variant="body1">310273137700003</Typography>
          <Typography variant="h5" sx={{mt:1}}>الرصيد المستحق</Typography>
          <Typography variant="body1" sx={{color: 'gray'}}>Total Due</Typography>
          <Typography variant="h4">.ر.س SAR {calculateTotal()}</Typography>
        </Grid>

        {/* Right side */}
        <Grid item xs={6}>
          <Typography variant="h6">العميل</Typography>
          <Typography variant="body1" sx={{color: 'gray'}}>Bill To: {billTo}</Typography>
          {/* {customerName && <Typography variant="h6">Customer Name: {customerName}</Typography>} */}
          <Typography variant="h6">رقم الفاتورة</Typography>
          <Typography variant="body1" sx={{color: 'gray'}}>Invoice Number: {invoiceNumber}</Typography>
          <Typography variant="h6">التاريخ</Typography>
          <Typography variant="body1" sx={{color: 'gray'}}>Date: {date}</Typography>
          <Typography variant="h6">تاريخ الاستحقاق</Typography>
          <Typography variant="body1" sx={{color: 'gray'}}>Due Date: {dueDate}</Typography>
        </Grid>
      </Grid>

      {/* Table */}
      <TableContainer className={classes.tableContainer}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>VAT <span style={{ color: 'gray' }}>{vatRate * 100}%</span> </TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{item}</TableCell>
              <TableCell>{description}</TableCell>
              <TableCell>{quantity}</TableCell>
              <TableCell>{price}</TableCell>
              <TableCell>{calculateTotalVAT()}</TableCell>
              <TableCell>{calculateSubtotal()}</TableCell>
            </TableRow>
            {/* Add more rows for additional items if needed */}
          </TableBody>
        </Table>
        <Box sx={{display: 'flex', alignItems: 'space-between'}}>
        <Table>
            <TableBody>
            <TableRow>
                <TableCell>Subtotal - المجموع الفرعي</TableCell>
                <TableCell>{calculateSubtotal()}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Total VAT - إجمالي ضريبة القيمة المضافة</TableCell>
                <TableCell>{calculateTotalVAT()}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Total - الإجمالي</TableCell>
                <TableCell>{calculateTotal()}</TableCell>
            </TableRow>
            </TableBody>
        </Table>
            {/* Bottom section */}
        <Box className={classes.barcodeContainer}>
            {/* Replace the 'src' attribute with your barcode image path */}
            <img className={classes.barcode} src="https://qrcode.meetheed.com/images/qrbig.png" alt="Barcode" />
        </Box>
        </Box>
      </TableContainer>


      

    </Box>
      {/* Share section */}
    {/*  //  TODO: https://mui.com/material-ui/react-speed-dial/  */}
      <Box className={classes.shareButton}>
        <IconButton onClick={handleShareViaWhatsApp}>
          <WhatsAppIcon />
          <Typography variant="body1" sx={{ml: 1}}>Share via WhatsApp</Typography>
        </IconButton>

        <IconButton onClick={handleShareViaEmail}>
          <ShareIcon />
          <Typography variant="body1" sx={{ml: 1}}>Share via Email</Typography>
        </IconButton>

        {/* Print as PDF */}
        <IconButton onClick={handlePrintAsPDF}>
          <ReceiptIcon />
          <Typography variant="body1" sx={{ml: 1}}>Print as PDF</Typography>
        </IconButton>

      </Box>
      </>
  );
};

export default TaxInvoice;