import axios from 'axios';

const apiUrl = process.env?.apiUrl

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