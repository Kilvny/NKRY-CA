'use client'
import { SessionProvider, useSession } from "next-auth/react"
// import styles from './page.module.css'
import Dashboard from './dashboard/Dashboard'
import Loading from '@/components/common/loading'
import { Suspense } from 'react'
import Header from '@/components/Header/Header'
import Sidebar from '@/components/Sidebar/Sidebar'
import Login from "@/components/Login/Login"

export default function Home() {
    const { data: session } = useSession()

    return (
        <main className="x">
                {/* <SessionProvider> */}
                    <Suspense fallback={<Loading />}>
                        <Sidebar />
                        { session ? <Dashboard /> : ""}
                        <Login />
                    </Suspense>
                {/* </SessionProvider> */}
        </main>
    )
}
