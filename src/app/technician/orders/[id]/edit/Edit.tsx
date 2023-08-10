import { useParams } from 'next/navigation'
import React from 'react'

type Props = {}

const Edit = (props: Props) => {
  const params = useParams();
  const invoiceId = params?.id
  
  return (
    <div>
      {/* // TODO: we might make this a modal, pop up and the technician will only add the cost and that's it there's no need for a whole page currently */}
    </div>
  )
}

export default Edit