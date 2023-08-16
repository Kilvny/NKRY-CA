'use client'
import OrderReviewCard from '@/components/OrdersReviewCard/OrderReviewCard'
import { Button, TextField } from '@mui/material'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

type Props = {}

const Edit = (props: Props) => {
  const params = useParams();
  const invoiceId = params?.id
  const [newCost, setNewCost] = useState('');

    const handleCostChange = (event: any) => {
        setNewCost(event.target.value);
    };

    const handleSaveClick = () => {
        // You can implement your logic to save the new cost here
        console.log('New Cost:', newCost);
    };
  
  return (
    <div style={{ display: 'flex' ,justifyContent: 'center',alignItems: 'center' , flexDirection: 'column', margin: 'auto', height: "min-content" , width: "100%", marginBottom: '20px'}}>
      {/* // TODO: we might make this a modal, pop up and the technician will only add the cost and that's it there's no need for a whole page currently */}
      <OrderReviewCard invoiceNumber={invoiceId} />

      <br/>
      <div style={{display: 'flex', alignItems: 'center', marginBottom: 5}}>
            <TextField
                label="New Cost"
                type="number"
                value={newCost}
                onChange={handleCostChange}
                variant="outlined"
                sx={{ marginRight: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleSaveClick}>
                Save
            </Button>
        </div>
      
    </div>
  )
}

export default Edit