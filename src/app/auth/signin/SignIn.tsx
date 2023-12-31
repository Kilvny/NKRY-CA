'use client'
import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Box, Typography, TextField, Button, CircularProgress } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import scss from "./SignIn.module.scss"

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // loader to improve user-x while signing in 
  const router = useRouter();
  const pathName = usePathname()
  const searchParams = useSearchParams()?.get("callbackUrl");
  const callbackUrl = decodeURI(searchParams || "/");
  const {data: session} = useSession();
  
  const isEmailValid = () => {
    // Simple email validation check
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isPasswordValid = () => {
    // Password validation check (e.g., minimum length)
    return password.length >= 8;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isEmailValid()) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!isPasswordValid()) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      setError("");
      setIsLoading(true);
      const result = await signIn("credentials", {
        email,
        password,
        // callbackUrl: callbackUrl || "/",
        redirect: false,
      });
      if (result?.error) {
        setError(result.error);
        return;
      }
    //   if (result?.ok) {
      router.push(callbackUrl);
      // console.log(result);
        // router.push("/");
    //   }
    } catch (error) {
      setError("An error occurred during sign-in. Please try again later.");
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
     { session 
      ? 
      (<span>signed in as {email}. </span> )
      :
      (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: 400,
            padding: 2,
            boxShadow: 4,
          }}
        >
        {/* Logo */}
        <div className={scss.logo}>
          {/* Your logo image or text here */}
          <img
          src="https://i.ibb.co/Gvzb5m5/NKRY-logo-gold.jpg" 
          alt="Logo" 
          loading="lazy"
          className={scss.logoImage}
          />
          
          {/* Or, if it's a text-based logo */}
          {/* <Typography variant="h5" className={scss.shine}>NKRY CA</Typography> */}
        </div>
  
          <Typography variant="h4" gutterBottom>
            Sign In
          </Typography>
          {error && (
            <Typography color="error" gutterBottom>
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              type="text"
              variant="outlined"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              fullWidth
              error={!!error && !isEmailValid()}
              helperText={!!error && !isEmailValid() && "Please enter a valid email address."}
              label="Email"
              required
              autoFocus
              disabled={isLoading}
              autoComplete='off'
            />
            <TextField
              type="password"
              variant="outlined"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              fullWidth
              error={!!error && !isPasswordValid()}
              helperText={!!error && !isPasswordValid() && "Password must be at least 8 characters long."}
              label="Password"
              required
              disabled={isLoading}
              autoComplete="new-password"
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} /> : null}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
  
  
          {/* FOOTER */}
          <div className={scss.footer}>
            All rights reserved &copy; {new Date().getFullYear()} NKRY
          </div>
        </Box>
      )   
     }
    </Box>
  );
};
export default SignIn;
