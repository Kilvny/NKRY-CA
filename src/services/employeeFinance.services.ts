import { DeliveriesUpdateDTO } from "@/DTOs/DeliveriesUpdateDTO";

const apiUrl = 'https://localhost:7112/api'

export const updateDeliveriesOfEmployee = async (data: DeliveriesUpdateDTO, employeeId: string, token: string): Promise<any> => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };
      const requestOptions = {
          method: 'PUT',
          headers: headers,
          body: JSON.stringify(data),
        };
      await fetch(`${apiUrl}/employees/${employeeId}/Finance`, requestOptions)
      .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response?.json(); 
        })
        .then(data => {
          console.log(data); 
        })
        .catch(error => {
          console.error('Error:', error);
        });
  
    } catch (error) {
      console.log(error);
      return Promise.reject(error); 
    }
  }