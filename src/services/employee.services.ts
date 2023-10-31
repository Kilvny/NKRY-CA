import { EmployeeDTO } from '@/DTO\'s/Employee';

const apiUrl = 'https://localhost:7112/api'

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