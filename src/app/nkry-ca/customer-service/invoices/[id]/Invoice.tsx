'use client'
import { useParams } from 'next/navigation';
import React from 'react'
import TaxInvoice from '@/components/TaxInvoice/TaxInvoice'



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

const Invoice = () => {

  const params = useParams();
  const invoiceId = params?.id;
  return (
    <div>
      Invoice Page <br />
      {invoiceId && <span>Invoice id is: {invoiceId}</span> }

      <br />

      <TaxInvoice {...props} />

    </div>
  )
}

export default Invoice