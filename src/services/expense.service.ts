import { ExpenseDTO } from "@/DTOs/Expense";

const apiUrl = 'https://localhost:7112/api'

export const postExpense = async (expense: ExpenseDTO, employeeId: string, token: string): Promise<ExpenseDTO | any> => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(expense),
      };
    await fetch(`${apiUrl}/employees/${employeeId}/Finance/Expenses`, requestOptions)
    .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); 
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

export const postExpenseFixed = async (expense: ExpenseDTO, employeeId: string, token: string): Promise<ExpenseDTO | any> => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };
      const requestOptions = {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(expense),
        };
      await fetch(`${apiUrl}/employees/${employeeId}/Finance/Expenses/Fixed`, requestOptions)
      .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json(); 
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



export const getMonthlyExpensesOfEmployee = async (employeeId: string, year: number, month: number, token: string): Promise<ExpenseDTO[]> => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };
      const requestOptions = {
        method: 'GET',
        headers: headers,
      };
  
      const response = await fetch(`${apiUrl}/employees/${employeeId}/Finance/Expenses?Year=${year}&Month=${month}`, requestOptions)
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
