'use client'
import { SessionProvider, useSession } from "next-auth/react"
// import styles from './page.module.css'
import Dashboard from './dashboard/Dashboard'
import Loading from '@/components/common/loading'
import { Suspense } from 'react'
import Login from "@/components/Login/Login"
import Script from "next/script"
import Footer from "@/components/Footer/Footer"

export default function Home() {
    const { data: session } = useSession()
// TODO: move the adimn dashboard to a new admin route  
    return (
        <main className="x" >
            {/* // TODO: The use of such a page would be to display Redirecting... then redirect the user based on the user role */}
                {/* <SessionProvider> */}
                    <Suspense fallback={<Loading />}>
                        { session ? <Dashboard /> : ""}
                        {/* <Login /> */}
                    </Suspense>
                {/* </SessionProvider> */}
        </main>
    )
}
