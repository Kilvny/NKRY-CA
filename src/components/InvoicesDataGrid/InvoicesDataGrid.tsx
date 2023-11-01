'use client'
import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import invoices from '../../../data/invoices.json'
import Link from 'next/link';
import { Button } from '@mui/material';
import Animations from '../common/Animations';

// Custom renderCell function for the 'id' field
const renderDetailsCell = (params: any) => {
    const invoiceId = params?.row?.invoiceNumber; // Access the 'id' property from the row data
    return (
      <Link href={`/customer-service/invoices/${encodeURIComponent(invoiceId)}`}>
        <ReceiptLongOutlinedIcon color='info' />
      </Link>
    );
  };

const renderEditCell = (params: GridRenderCellParams) => {
    const invoiceId = params?.row?.invoiceNumber
    return (
        <Link
        href={`/nkry-ca/customer-service/invoices/edit/${encodeURIComponent(invoiceId)}`}
        >
          <EditOutlinedIcon color='warning' />
        </Link>
    )
}

/**
 * * This is an example of how x-data-grid works
    @const rows: GridRowsProp = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
    ];

    @const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
    ];

 */

// Map the 'invoices' to 'rows' format
const rows: GridRowsProp = invoices.map((invoice) => ({
    id: invoice.id,
    billTo: invoice.billTo,
    customerName: invoice.customerName,
    invoiceNumber: invoice.invoiceNumber,
    date: invoice.date,
    dueDate: invoice.dueDate,
    item: invoice.item,
    description: invoice.description,
    quantity: invoice.quantity,
    price: invoice.price,
  }));
  
  // Create 'columns' based on the keys of the data object
const columns: GridColDef[]  = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'billTo', headerName: 'Bill To', width: 150 },
    { field: 'customerName', headerName: 'Customer', width: 150 },
    { field: 'invoiceNumber', headerName: 'Invoice Number', width: 150 },
    { field: 'price', headerName: 'Price', width: 100 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'dueDate', headerName: 'Due Date', width: 150 },
    { field: 'item', headerName: 'Item', width: 150 },
    { field: 'description', headerName: 'Description', width: 150 },
    { field: 'quantity', headerName: 'Quantity', width: 100 },
    { field: 'details', headerName: 'Tax Invoice', width: 100 },
    { field: 'edit', headerName: 'Edit', width: 80, renderCell: renderEditCell}
    

  ]

/** // Todo: regarding the profit calculation if it's calculated on the client side refer to:
 * @link https://mui.com/x/react-data-grid/column-definition/#value-getter
 * the cost will be added by the craftman
 * */
const adminColumns: GridColDef[]  = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'billTo', headerName: 'Bill To', width: 150 },
    { field: 'customerName', headerName: 'Customer', width: 150 },
    { field: 'invoiceNumber', headerName: 'Invoice Number', width: 150 },
    { field: 'price', headerName: 'Price', width: 100 },
    { field: 'cost', headerName: 'Cost', width: 100 },
    { field: 'profit', headerName: 'Profit', width: 100 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'dueDate', headerName: 'Due Date', width: 150 },
    { field: 'item', headerName: 'Item', width: 150 },
    { field: 'description', headerName: 'Description', width: 150 },
    { field: 'quantity', headerName: 'Quantity', width: 100 },
    { field: 'details', headerName: 'Tax Invoice', width: 100, renderCell: renderDetailsCell },
    { field: 'edit', headerName: 'Edit', width: 80, renderCell: renderEditCell}
    

  ]
  

  // Customize the columns to use the custom renderCell function for the 'id' field
const updatedColumns = columns.map((col) =>
    col.field === 'details' ? { ...col, renderCell: renderDetailsCell } : col
  );

export default function InvoicesDataGrid({ admin = false, isOrders=false, ordersRows = null, ordersColumns = [] }: { admin?: boolean, isOrders?: boolean, ordersRows?: any, ordersColumns?: GridColDef<any>[] }) {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate an asynchronous process that takes some time (you can replace it with your actual data fetching process)
    const delay = setTimeout(() => {
      setLoading(false);
    }, 3000); // Change the duration to match your component's rendering time

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(delay);
  }, []);

//   if (loading) {
//     return <Animations />; // Show loading animations while the component is being rendered
//   }

  const RenderDataGrid = () => {
    return (
        loading ? 
        (<Animations />) :
        (<DataGrid 
        rows={rows} 
        columns={admin? adminColumns : updatedColumns}
        slots={{
        toolbar: GridToolbar
        }}
        // loading
        />)
    )
  }
  

  const RenderDataGridForOrders = () => {
    return (
        loading ? 
        (<Animations />) :
        (<DataGrid 
        rows={ordersRows} 
        columns={ordersColumns}
        slots={{
        toolbar: GridToolbar
        }}
        // loading
        />)
    )
  }
  
  return (
    <div style={{ height: 500, width: '100%', padding: 20 }}>
      {
      isOrders 
      ? 
      <RenderDataGridForOrders />
      :
      <RenderDataGrid />
      }
    </div>
  );
}
