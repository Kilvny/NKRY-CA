'use client'

import { Box, IconButton, PaletteMode, ThemeProvider } from '@mui/material'
import { Theme, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
// import './globals.css'
import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import { Inter } from 'next/font/google'
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import React, { Suspense, useEffect } from 'react'
import Loading from '@/components/common/loading'
import Header from '@/components/Header/Header'
import lightTheme from '@/pages/theme/lightTheme'
import darkTheme from '@/pages/theme/darkTheme'
import Cookies from 'js-cookie';
import Footer from '@/components/Footer/Footer'
import { usePathname } from 'next/navigation'


const inter = Inter({ subsets: ['latin'] })

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });



const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    
    
    const pathname = usePathname();
    const isOnNKRY_CA = pathname?.startsWith('/nkry-ca');


    const getInitialThemeMode = () => {
        // Get the theme mode from local storage or default to 'light' if not found.
        let storedTheme: string | null = 'light';
        try {
            storedTheme = localStorage?.getItem('theme');
        } catch (error) {
            console.log(error);
        }
        return storedTheme;
    };

    const [mode, setMode] = React.useState<PaletteMode | undefined>("light");
    useEffect(() => {
        const getInitialThemeMode = () => {
            // Get the theme mode from local storage or default to 'light' if not found.
            let storedTheme: PaletteMode | undefined = 'light';
            try {
                storedTheme = (localStorage.getItem('theme') == 'light'? "light": 'dark') ?? "light";
            } catch (error) {
                console.log(error);
            }
            return storedTheme;
        };

        // Set the initial theme mode from local storage
        setMode(getInitialThemeMode());
    }, []); // The empty dependency array ensures this runs once on mount

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                // Toggle the theme mode and store it in local storage.
                const newMode = mode === "light" ? "dark" : "light";
                try {
                    localStorage?.setItem("theme", newMode);
                } catch (error) {
                    console.log(error);
                }
                setMode(newMode);
            },
        }),
        [mode],
    );
    // const storedTheme = Cookies.get<'light' | 'dark'>('theme') || 'dark'; // Get the stored theme from cookies, dark if not found
    // const [mode, setMode] = React.useState<'light' | 'dark'>('dark'); // default is storedTheme
    // const colorMode = React.useMemo(
    //     () => ({
    //         toggleColorMode: () => {
    //           // setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));

    //           // Toggle the theme mode and store it in local storage.
    //           const newMode = mode === "light" ? "dark" : "light";
    //           try {
    //               localStorage?.setItem("theme", newMode);
    //           } catch (error) {
    //             console.log(error);
    //           }
    //           setMode(newMode);
    //           // const newMode = mode === 'light' ? 'dark' : 'light';
    //           // // save the new theme to cookies
    //           // Cookies.set('theme', newMode);
    //           // setMode(newMode)
    //         },
    //     }),
    //     [mode],
    // );

    // ! passing this as creating a mode on the fly was resulting in a default dark - light modes from MUI 
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode],
    );
    
    // ! solution is to use the createTheme method with actual themes we created 
    const darkThemeChosen = React.useMemo(
        () =>
            createTheme({
                ...darkTheme
            }),
            [mode]
    )
    const lightThemeChosen = React.useMemo(
        () =>
            createTheme({
                ...lightTheme
            }),
            [mode]
    )

    return (
      <ColorModeContext.Provider value={colorMode}>
        {/* // ! instead of normal theme passed  */}
        <ThemeProvider
          theme={mode === "dark" ? darkThemeChosen : lightThemeChosen}
        >
          <SessionProvider>
            <CssBaseline />
            <html lang="en" style={{ height: "100%" }}>
              <body className={inter.className} style={{ height: "100%" }}>
                <CssBaseline />
                <Suspense fallback={<Loading />}>
                  {isOnNKRY_CA ? (
                    <Header theme={theme} colorMode={colorMode} />
                  ) : (
                    <DarkLightModeToggler
                      theme={theme}
                      colorMode={colorMode}
                      mobile={false}
                    />
                  )}
                </Suspense>
                {children}
                {isOnNKRY_CA ? <Footer /> : ""}
              </body>
            </html>
          </SessionProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
}


export const DarkLightModeToggler = ({ theme, colorMode, mobile }: {
    theme: Theme,
    colorMode: {
        toggleColorMode: () => void;
    },
    mobile: Boolean
}) => {
    return <>
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'transparent',
                color: 'text.primary',
                borderRadius: 1,
                p: 1,
            }}
        >
            {/* when on mobile show text beside toggler */}
            {mobile && (
                <>
                    {theme.palette.mode} mode
                </>
            )}
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </Box>
    </>
}

