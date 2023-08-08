import Grid from "@mui/material/Grid";
import React from "react";
import DataChart from "@/components/DataChart";
import Paper from "@mui/material/Paper";
import { doughnutChartData } from "@/components/mockData";
import scss from "./TransactionsBottomRow.module.scss";

const TransactionBottomRow = () => {
  return (
    <Grid container className={scss.bottomRow}>
      <Grid>
        <Paper className={scss.dataCard}>
          <p>Transactions per user type</p>
          <DataChart type={"bubble"} data={doughnutChartData} />
        </Paper>
      </Grid>
      <Grid>
        <Paper className={scss.dataCard}>
          <p>Type of order</p>
          <DataChart type={"pie"} data={doughnutChartData} />
        </Paper>
      </Grid>
      <Grid>
        <Paper className={scss.dataCard}>
          <p>Invoices</p>
          <DataChart type={"doughnut"} data={doughnutChartData} />
        </Paper>
      </Grid>

    </Grid>
  );
};

export default TransactionBottomRow;