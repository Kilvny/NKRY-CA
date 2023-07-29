'use client'
import React from 'react'
import { useSession, signIn, signOut, SessionProvider } from 'next-auth/react'
import { Button } from '@mui/material';
import { redirect } from 'next/navigation';

const Login = () => {
    const { data: session } = useSession();

    if (session) {
        return (
            <div>
                signed in as {session?.user?.email}
                <Button color="error" variant="contained" onClick={() => signOut()}>Sign out</Button>
                <p>user: {session?.user?.name}</p>
            </div>
        )
    } else {
        redirect('/signin')
        return (<>
            please sign in
            <Button color="primary" variant="contained" onClick={() => signIn()}>Sign In</Button>
        </>)
    }
}

export default Login