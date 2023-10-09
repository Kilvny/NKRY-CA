import axios from 'axios';
import { Awaitable, DefaultUser } from 'next-auth';

// Set a global default header for Axios

// Define a User type to represent user data
interface User extends DefaultUser {
    id: string;
    username: string;
    token: string;
  };
  
  // Function to handle user login
  export const login = async (username: string, password: string): Promise<User | null> => {
    try {
      // Disable SSL certificate validation (not recommended for production)
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      // Make a POST request to your authentication API
    //   TODO: Replace the url with apiUrl from enviroment variable
      const response = await fetch("https://localhost:7112/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "Email" : username, password }),
      });

      if (response.status == 200) {
          const token = await response.text();
          console.log(token)

          
        // const data = await response.json();

        // Store the user data and token in localStorage
        // await console.log(data)
        const user: User = {
          id: "",
          username: "data.username",
          token: token,
        };
        // localStorage.setItem("user", JSON.stringify(user));
        axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
        const _user = await axios.get(`https://localhost:7112/api/Users?SearchQuery=${username}`)
        const userResult = await _user.data;
        user.username = userResult.Email;
        user.id = userResult.Id;
        user.email = userResult.Email;
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
    return null;
  };
  