import Address from '@/components/User-view/Address'
import library from '../../assets/library.jpg'
import { useDispatch, useSelector } from 'react-redux'
import CartContent from '@/components/User-view/CartContent'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { createNewOrder } from '@/store/user/OrderSlice/OrderSlice'

const Checkout = () => {

  const {cartItems} =useSelector(state=>state.shopCart)
  const {user} =useSelector(state=>state.auth)
  const{approvalURL}=useSelector(state=>state.userOrder)
  const[isPaymentStart,setIsPaymentStart]=useState(false)
  const [currentSelectedAddress,setCurrentSelectedAddress]=useState(null)
 const dispatch =useDispatch()
  
  const totalCartAmount =  cartItems &&  cartItems.items && cartItems.items.length > 0 
  ? cartItems.items.reduce( (sum,currentItem)=>
    sum + 
    (currentItem?.price)*currentItem?.quantity,0
  ) : 0 ;
 
  function HandleInitiatePaypalPayment(){
    const orderData={
      userId :user?.id,
      cartItems :cartItems.items.map(singleCartItem=>({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price: singleCartItem?.price,
        quantity:  singleCartItem?.quantity,
      })),
      addressInfo :{
        addressId: currentSelectedAddress?.address,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus :'pending',
      paymentMethod :'paypal',
      paymentStatus :'pending',
      totalAmount :totalCartAmount,
      orderDate : new Date(),
      orderUpdateDate :new Date(),
      paymentId :'',
      payerId:''
    }
    console.log(orderData)

   dispatch(createNewOrder(orderData)).then((data)=>{
    console.log(data,'clifton ')
      if(data?.payload?.success){
          setIsPaymentStart(true)
      }else{
        setIsPaymentStart(false)
      }
  })
     
  }

  if(approvalURL){
    window.location.href=approvalURL
  }
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
         <img src={library} 
         className='h-full w-full object-cover object-center' 
         />
      </div>
      <div className='grid grid-cols-1 flex-1 sm:grid-cols-2 gap-3 mt-5 p-5'>
         <Address setCurrentSelectedAddress={setCurrentSelectedAddress}/>
         <div className='flex flex-col gap-4'>
          {
            cartItems && cartItems.items && cartItems.items.length  > 0 ?
            cartItems.items.map(Item =>
              <CartContent
              cartItems={Item}
              />
            ) :
            null
          }
            <div className="bg-white p-2">
                    <div className="flex justify-betweens">
                      <span className="font-bold">Total</span>
                      <span className="font-bold bg-slate-200 p-2 rounded">${totalCartAmount}</span>
                    </div>
            </div>
          <div>
                  <Button onClick={HandleInitiatePaypalPayment} className="w-full ">CheckOut</Button>
          </div>
         </div>
      </div>
    </div>
  )
}  

export default Checkout
