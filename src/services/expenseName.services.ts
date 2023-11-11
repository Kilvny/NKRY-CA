const apiUrl = 'https://localhost:7112/api'

export const getAllExpenseNamesFixed = async (token: string): Promise<string[]> => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    const requestOptions = {
      method: 'GET',
      headers: headers,
    };

    const response = await fetch(`${apiUrl}/expensenames/fixed`, requestOptions)
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

export const getAllExpenseNamesMonthly = async (token: string): Promise<string[]> => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };
      const requestOptions = {
        method: 'GET',
        headers: headers,
      };
  
      const response = await fetch(`${apiUrl}/expensenames/monthly`, requestOptions)
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


export const postExpenseName = async (expenseName :string, isMonthly: boolean = true, token: string ) : Promise<any> => {

    try {
        // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          };
          const data = {
            "name": expenseName,
            "monthly": isMonthly
          }

          const requestOptions = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
          };
          
          fetch(`${apiUrl}/expensenames`, requestOptions)
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
        console.log(`Error while posting Invoice ${error}`);
    }
}