export interface InvoiceDTO {
    billTo: string;
    order: {
      items: string;
      quantity: number;
      description: string;
      price: number;
      paidAmount: number;
      color: string;
      size: {
        height: number;
        width: number;
        depth: number;
      }
    };
  }