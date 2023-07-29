import React from 'react'

interface TaxInvoiceOptions {
    billTo: string,
    customerName?: string,
    invoiceNumber: string,
    date: string,
    dueDate: string,
    item: string,
    description: string,
    quantity: number,
    price: number,

}


const TaxInvoice = (props: TaxInvoiceOptions ) => {
  return (
    <>
      <h1>Tax Invoice</h1>

      {/* //! right side */}

      <h4>Bill To</h4>
      <h4>Invoice Number</h4>
      <h4>Date</h4>
      <h4>Due Date</h4>
      <h4>Item</h4>
      <h4>Description</h4>
      <h4>Bar code</h4>

      {/* //! Left side */}
      {/* NKRY LOGO */}

      <h4>NKRY Address</h4>
       
      <h4>Tax registraiton number</h4>

      <h3>Total due</h3>

      <h4>Quantity</h4>
      <h4>Price</h4>
      <h4>VAT</h4>
      <h4>Amount</h4>
      <h4>Subtotal</h4>
      <h4>Total VAT</h4>
      <h4>Total</h4>
      
      {/* // ! Share section */}
      <p>share via whatsapp </p>
      <p>share via email</p>
    </>
  )
}

export default TaxInvoice