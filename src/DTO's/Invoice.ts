export interface InvoiceDTO {
    billTo: string;
    order: {
      items: string;
      quantity: number;
      description: string;
      price: number;
      paidAmount: number;
    };
  }