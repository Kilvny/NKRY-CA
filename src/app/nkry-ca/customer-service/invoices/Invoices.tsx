import InvoicesDataGrid from '@/components/InvoicesDataGrid/InvoicesDataGrid'
import TaxInvoice from '@/components/TaxInvoice/TaxInvoice'
import Animations from '@/components/common/Animations'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import { Box, Button, Typography } from '@mui/material'
import React, { Suspense } from 'react'

const Invoices = () => {
    const props = {
        billTo: "John Doe",
        customerName: "ABC Company",
        invoiceNumber: "INV-001",
        date: "2023-07-01",
        dueDate: "2023-08-01",
        item: "Product A",
        description: "High-quality widget",
        quantity: 10,
        price: 25.99,
      }
  return (
    // * Here it will view all the invoices to update/ view/ delete an invoice
    <div>
        <Box 
        sx={{display: 'flex',
        alignContent: 'space-between', 
        alignItems: 'center', 
        flexDirection: 'row',
        pl: 2,
        pt: 2,
        width: '100%',    
        }}
        >
          <Typography >All Invoices</Typography>
          <Button
          variant='outlined'
          color='success'
          sx={{m:1, p:1}}
          size='small'
          href='/nkry-ca/customer-service/invoices/new'
          >
          <AddOutlinedIcon /> New Invoice
          </Button>
        </Box>
        {/* Show all Invoices/ Normal actions to CS users */}
          <InvoicesDataGrid />
    </div>
  )
}

export default Invoices