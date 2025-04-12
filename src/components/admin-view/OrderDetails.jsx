import CommonForm from '@/components/common/Form'
import { DialogContent } from '@/components/ui/dialog'
import { SelectSeparator } from '@/components/ui/select'
import React, { useState } from 'react'
import { Label } from '../ui/label'


const initialFormData ={
  status :'',

}

const OrderDetails = () => {
 
   const[formData,setFormData]=useState(initialFormData)

   function handleUpdateStatus(event){
    event.preventDefault();
    
   }
    
  return (
   <DialogContent className='sm:max-w-[600px]'>
     <div className='grid gap-5 mt-6'>
      <div className='grid gap-2'>
        <div className='flex items-center justify-between'>
            <p className='font-meduim'>Order Id</p>
            <Label >11235</Label>
        </div>
        <div className='flex items-center justify-between'>
            <p className='font-meduim'>Date</p>
            <Label >12/22/24</Label>
        </div>
        <div className='flex items-center justify-between'>
            <p className='font-meduim'>Order status</p>
            <Label >$500</Label>
        </div>
        <div className='flex items-center justify-between'>
            <p className='font-meduim'>Order status</p>
            <Label>In progress</Label>
        </div>
      </div>
      <SelectSeparator/>
      <div className='grid gap-5'>
          <div className='grid gap-2'>
            <div className='font-medium'>Order Details</div>
            <ul className='grid gap-3'>
                <li className='flex items-center justify-between'>
                    <span>Product One</span>
                    <span>$100</span>
                </li>
            </ul>
          </div>
      </div>
      <div className='grid '>
          <div className='grid '>
            <div className='font-medium'>Shipping Info</div> 
            <div className='grid text-muted-foreground'>
             <span>John Doe</span> 
             <span>Address</span>    
             <span>city</span>    
             <span>pincode</span>    
             <span>phone</span>    
             <span>notes</span>    
            </div>       
          </div>
      </div>
      <div>
        <CommonForm 
        formControls={[
           {  
              Label: "status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", Label: "pending" },
                  { id: "inProgress", Label: "inProgress" },
                  { id: "inShipping", Label: "Shipping" },
                  { id: "rejected", Label: "rejected" },
                  { id: "delivered", Label: "delivered" },
                ],
              },
        ]}
        formData={formData}
        setFormData={setFormData}
        buttonText={'Update Order status'}
        onSubmit={handleUpdateStatus}
        />
      </div>
     </div>
   </DialogContent>
  )
}

export default OrderDetails
