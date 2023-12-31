import axios from 'axios';
import { Awaitable, DefaultUser } from 'next-auth';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env


// Set a global default header for Axios

// Define a User type to represent user data
interface User extends DefaultUser {
    id: string;
    username: string;
    token?: string;
    sub?: string;
  };

const apiUrl = process.env.API_URL || 'https://nkryca-001-site1.btempurl.com/api';
let user: User = {
  id: "",
  username: "data.username",
  token: ""
};
  
  // Function to handle user login
  export const login = async (username: string, password: string): Promise<User | null> => {
    try {
      // Disable SSL certificate validation (not recommended for production)
      // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      // Make a POST request to your authentication API
    //   TODO: Replace the url with apiUrl from enviroment variable
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "Email" : username, password }),
      });
      console.log(response);

      if (response.status == 200) {
          const token = await response.text();
          console.log("Token is... : ", token)
          
          // Store token securely using environment variables
          process.env.USER_TOKEN = token;
          // Create a JSON object with the token
          const data = { token };
          
          // Convert the JSON object to a string
          const jsonData = JSON.stringify(data);
          
          // Define the file path
          const filePath = './token.json';
          
          // Write the JSON data to the file
          // fs.writeFileSync(filePath, jsonData);
          
          // console.log("Token has been written to token.json");
        // const data = await response.json();

        // Store the user data and token in localStorage
        // await console.log(data)
         user = {
          id: "",
          username: "data.username",
          token: token,
        };
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };
        const requestOptions = {
          method: 'GET',
          headers: headers,
          host: 'nkry-ca.vercel.app', 
        };
        // localStorage.setItem("user", JSON.stringify(user));
        // axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
        // const _user = await fetch(`${apiUrl}/Users?SearchQuery=${username}`, requestOptions).then(res => res.json());
        // const userResult = await _user;
        // user.username = userResult;
        // user.id = userResult;
        user.email = token;
        user.sub = token;
        return user;
      } else {
        console.log("login was not successful");
        return null; // Login failed
      }
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  };
  
  // Function to handle user logout
  export const logout = () => {
    // Remove user data and token from localStorage
    // localStorage.removeItem('user');
  };
  
  // Function to get the current user from localStorage
  export const getCurrentUser = (): User | null => {
    // const userJson = localStorage.getItem('user');
    // return userJson ? JSON.parse(userJson) : null;
    return user;
  };
  