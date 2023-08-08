import { Grid } from '@mui/material'
import React from 'react'
import DataCard from '../DataCard/DataCard'
import scss from "./DataRibbon.module.scss"

export type Props = {}

const DataRibbon = (props: Props) => {
  return (
        <Grid container gap={2} className={scss.dataRibbon}>
            <Grid>
                <DataCard title="Last month total income" description='Total Income this month' value='93,582 SAR'/>
            </Grid>
            <Grid>
                <DataCard title="Total Invoices" description='Total Invoices since creation' value='460'/>
            </Grid>
            <Grid>
                <DataCard title="New Orders" description='This is the total number of orders that have the status of New' value='7'/>
            </Grid>
            <Grid>
                <DataCard title="Avg. Order Value" description='This is the avarage number of orders that you have' value='3920.20 SAR'/>
            </Grid>
          </Grid>
           )
}

export default DataRibbon