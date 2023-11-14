import { InvoiceDTO } from '@/DTOs/Invoice';
import axios from 'axios';

const apiUrl = 'http://nkryca-001-site1.btempurl.com/api'

export const getAllInvoices = async () : Promise<any> => {
    try {
        const response = await axios.get(`${apiUrl}/Invoices`);
        const data = await response.data;
        return data;
    } catch (error) {
        console.log(`error while fetching Invoices ${error}`)
    }
}

export const getInvoice = async (invoiceNumber: string) : Promise<any> => {
    try {
        const response = await axios.get(`$(apiUrl)/Invoices?SearchQuery=${invoiceNumber}`); // TODO: handle this in the backend as well
        const data = await response.data;
        return data;
    } catch (error) {
        console.log(`error while fetching Invoice ${error}`)
        
    }
}

export const postInvoice = async (invoiceData:InvoiceDTO, token: string ) : Promise<any> => {
    try {
        // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          };
          console.log(apiUrl);
          const requestOptions = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(invoiceData),
          };
          
          fetch(`${apiUrl}/invoices`, requestOptions)
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json(); // Parse the response JSON
            })
            .then(data => {
              console.log(data); // Process the response data here
            })
            .catch(error => {
              console.error('Error:', error);
            });
    } catch (error) {
        console.log(`Error while posting Invoice ${error}`);
    }
}