'use client'
import { SessionProvider, useSession } from "next-auth/react"
// import styles from './page.module.css'
import Dashboard from './dashboard/Dashboard'
import Loading from '@/components/common/loading'
import { Suspense } from 'react'
import Login from "@/components/Login/Login"

export default function Home() {
    const { data: session } = useSession()
// TODO: move the adimn dashboard to a new admin route  
    return (
        <main className="x">
                {/* <SessionProvider> */}
                    <Suspense fallback={<Loading />}>
                        { session ? <Dashboard /> : ""}
                        <Login />
                    </Suspense>
                {/* </SessionProvider> */}
        </main>
    )
}
