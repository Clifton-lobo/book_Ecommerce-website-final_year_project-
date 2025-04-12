import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'

const AddressCard = ({addressInfo,handleDeleteAddress,handleEditAddress,setCurrentSelectedAddress}) => {
  return (
    <Card onClick={setCurrentSelectedAddress ? 
      ()=>setCurrentSelectedAddress(addressInfo)
       : null}>
      <CardContent className='grid gap-1 mt-1 font-medium'>
        <label>address :{addressInfo?.address}</label>
        <label>city :{addressInfo?.city}</label>
        <label>phone :{addressInfo?.phone}</label>
        <label>pincode :{addressInfo?.pincode}</label>
        <label>notes :{addressInfo?.notes}</label>
      </CardContent>
      <CardFooter className='flex justify-between '>
        <Button onClick={()=>handleEditAddress(addressInfo)}>Edit</Button>
        <Button onClick={()=>handleDeleteAddress(addressInfo)}>Delete</Button>
      </CardFooter>
    </Card>
  )
}

export default AddressCard
