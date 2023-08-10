import OrdersTable from '@/components/OrdersTable/OrdersTable'
import React from 'react'
import data from "../../../data/orders.json"

type Props = {}

const Orders = (props: Props) => {
  return (
    <div>
      <OrdersTable title={"New Orders"} orders={data.new}/>
      <OrdersTable title={"All Orders"} orders={data.orders}/>
    </div>
  )
}

export default Orders