import { DeliveriesUpdateDTO } from "@/DTOs/DeliveriesUpdateDTO";
import { MonthlyFinanceDTO } from "@/DTOs/MonthlyFinance";

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

  
// {{baseUrl}}/api/employees/:employeeId/Finance?Year=2023&Month=10

export const getMonthlyFinance = async (employeeId: string, year: number, month: number, token: string): Promise<MonthlyFinanceDTO> => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };
      const requestOptions = {
        method: 'GET',
        headers: headers,
      };
  
      const response = await fetch(`${apiUrl}/employees/${employeeId}/Finance?Year=${year}&Month=${month}`, requestOptions)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json(); 
        return data 
  
    } catch (error) {
      console.log(error);
      return Promise.reject(error); 
    }
}

export const getCurrentMonthFinance = async (employeeId: string, token: string): Promise<MonthlyFinanceDTO> => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    const requestOptions = {
      method: 'GET',
      headers: headers,
    };

    const response = await fetch(`${apiUrl}/employees/${employeeId}/Finance`, requestOptions)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json(); 
      return data 

  } catch (error) {
    console.log(error);
    return Promise.reject(error); 
  }
}
