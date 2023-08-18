'use client'
import { Box, Grid, Paper } from "@mui/material"
import scss from "./Dashboard.module.scss"
import PersistentDrawerLeft from "@/components/Sidebar/Drawer/Drawer"
import DataRibbon from "@/components/Dashboard/DataRibbon/DataRibbon"
import TransactionsPerDay from "@/components/Dashboard/TransactionsPerDay/TransactionsPerDay"
import TransactionBottomRow from "@/components/Dashboard/TransactionBottomRow/TransactionBottomRow"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const Dashboard = () => {
    const { data: session } = useSession()
    const router = useRouter()

    if (session?.user?.role === 'user'){
        router.push("/nkry-ca/customer-service")
        return
    }
    return (
        <Box sx={{ p: '1rem 80px', m: '0 1rem 3rem'}}>
          <Grid gap={4} marginTop={2}>
          {/* dataribbon */}
          <DataRibbon />
          {/* charts */}
          <TransactionsPerDay />
          </Grid>
          {/* piecharts */}
          <TransactionBottomRow />
        </Box>
    )
}

export default Dashboard