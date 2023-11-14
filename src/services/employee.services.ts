import { EmployeeDTO } from '@/DTOs/Employee';
import { PersonalDetailsDTO } from '@/DTOs/PersonalDetailsDTO';

const apiUrl = 'http://nkryca-001-site1.btempurl.com/api'

export const getAllEmployees = async (token: string): Promise<EmployeeDTO[]> => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    const requestOptions = {
      method: 'GET',
      headers: headers,
    };

    const response = await fetch(`${apiUrl}/employees`, requestOptions)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json(); // Parse the response JSON
      return data // Parse the response JSON

  } catch (error) {
    console.log(error);
    return Promise.reject(error); // Return a rejected Promise to signify an error
  }


}

export const getEmployee = async (employeeId: string, token: string): Promise<EmployeeDTO> => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    const requestOptions = {
      method: 'GET',
      headers: headers,
    };

    const response = await fetch(`${apiUrl}/employees/${employeeId}`, requestOptions)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json(); // Parse the response JSON
      return data // Parse the response JSON

  } catch (error) {
    console.log(error);
    return Promise.reject(error); // Return a rejected Promise to signify an error
  }


}

export const postEmployee = async (data :EmployeeDTO, token: string ) : Promise<any> => {

    console.log(data, token);

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
            body: JSON.stringify(data),
          };
          
          fetch(`${apiUrl}/employees`, requestOptions)
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

export const deleteEmployee = async (employeeId: string, token: string ) : Promise<any> => {


  try {
      // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        };
        const requestOptions = {
          method: 'DELETE',
          headers: headers,
        };
        
        fetch(`${apiUrl}/employees/${employeeId}`, requestOptions)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response?.json(); // Parse the response JSON
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

export const putPersonalDetails = async (data :PersonalDetailsDTO, employeeId: string, token: string ) : Promise<any> => {


    try {
        // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          };
          console.log(apiUrl);
          const requestOptions = {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(data),
          };
          
          return fetch(`${apiUrl}/employees/${employeeId}/PersonalDetails`, requestOptions)
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }

              return response; // Parse the response JSON
            })
            .then(data => {
              console.log(data); // Process the response data here
              return data;
            })
            .catch(error => {
              console.error('Error:', error);
            });
    } catch (error) {
        console.log(`Error while posting Invoice ${error}`);
    }
}
