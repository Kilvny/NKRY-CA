import { Box, Grid, Paper } from "@mui/material"
import scss from "./Dashboard.module.scss"
import PersistentDrawerLeft from "@/components/Sidebar/Drawer/Drawer"
import DataRibbon from "@/components/Dashboard/DataRibbon/DataRibbon"
import TransactionsPerDay from "@/components/Dashboard/TransactionsPerDay/TransactionsPerDay"
import TransactionBottomRow from "@/components/Dashboard/TransactionBottomRow/TransactionBottomRow"

const Dashboard = () => {
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