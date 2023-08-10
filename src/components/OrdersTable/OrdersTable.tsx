'use client'
import { GridColDef, GridRowsProp } from '@mui/x-data-grid'
import Link from 'next/link';
import React from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import InvoicesDataGrid from '@/components/InvoicesDataGrid/InvoicesDataGrid';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Box, Button, Typography } from '@mui/material';



type Props = {
    title: string,
    orders: object[],
}

const renderCostCell = (params: any) => {
    const orderIdFromInoviceNumber = params?.row?.invoiceNumber; // Access the 'id' property from the row data
    return (
      <Link href={`/technician/orders/edit/${encodeURIComponent(orderIdFromInoviceNumber)}`}>
        <EditOutlinedIcon color='info' />
      </Link>
    );
  };

const columns: GridColDef[]  = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'invoiceNumber', headerName: 'Invoice Number', width: 150 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'item', headerName: 'Item', width: 150 },
    { field: 'description', headerName: 'Description', width: 150 },
    { field: 'quantity', headerName: 'Quantity', width: 100 },
    { field: 'color', headerName: 'Color', width: 100 },
    { field: 'cost', headerName: 'Add Cost', width: 80, renderCell: renderCostCell}
    

  ]

const OrdersTable = ({ title, orders }: Props) => {
        
    const rows: GridRowsProp = orders.map((invoice: any) => ({
        id: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        date: invoice.date,
        item: invoice.item,
        description: invoice.description, // TODO: change this to add-ons
        quantity: invoice.quantity,
        color: '#f01',
        // cost: renderCostCell
    }))
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
          <Typography >{title}</Typography>
        </Box>
        {/* Show all Invoices/ Normal actions to CS users */}
          <InvoicesDataGrid admin={true} isOrders={true} ordersRows={rows} ordersColumns={columns}/>
    </div>  )
}

export default OrdersTable