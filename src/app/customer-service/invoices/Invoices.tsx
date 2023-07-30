import TaxInvoice from '@/components/TaxInvoice/TaxInvoice'
import React from 'react'

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
    <div>All Invoices

        <TaxInvoice {...props} />
    </div>
  )
}

export default Invoices