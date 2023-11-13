import React from 'react'
import { IconButton, Paper, Tooltip, Typography } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import scss from "./Datacard.module.scss";

export type DataCardProps = {
    title: string,
    value: string,
    description: string
}

const DataCard = ({title, value, description}: DataCardProps) => {
  return (
    <Paper className={scss.dataCard}>
      <div className={scss.header}>
        <Typography variant='h6' color='lightslategray'>
          {title}
        </Typography>
        <Tooltip
        title={
            <Typography fontSize={16} >
                {`${description} which is ${value}`}
            </Typography>
        }
        >
        <IconButton>
          <InfoOutlinedIcon />
        </IconButton>
        </Tooltip>
      </div>

      <Typography variant='h6'>{value}</Typography>
    </Paper>
  )
}

export default DataCard