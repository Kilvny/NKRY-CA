import React from 'react';
import InvoicesDataGrid from '@/components/InvoicesDataGrid/InvoicesDataGrid';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Box, Button, Typography } from '@mui/material';


const Invoices = () => {
  return (
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
          href='/workers-manager/customer-service/invoices/new'
          >
          <AddOutlinedIcon /> New Invoice
          </Button>
        </Box>
        {/* Show all Invoices/ Normal actions to CS users */}
          <InvoicesDataGrid admin={true} />
    </div>
  )
}

export default Invoices