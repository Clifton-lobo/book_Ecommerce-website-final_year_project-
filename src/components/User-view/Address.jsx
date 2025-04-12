import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import CommonForm from '../common/Form';
import { addressFormControls } from '@/Config/Config';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress, deleteAddress, editAddress, fetchAllAddress } from '../../store/user/AddressSlice';
import AddressCard from './AddressCard';
import { useToast } from '@/hooks/use-toast';

const initialAddressFormData = {
  address: '',
  city: '',
  phone: '',
  pincode: '',
  notes: '',
};

const Address = ({setCurrentSelectedAddress}) => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const { toast } = useToast();

  function handleManageAddress(event) {
    event.preventDefault();

    if (addressList.length >= 3 && !currentEditedId) {
      toast({
        title: 'You can add a maximum of 3 addresses',
        variant: 'destructive',
      });
      return;
    }

    if (currentEditedId) {
      // Editing an existing address
      dispatch(
        editAddress({
          userId: user?.id,
          addressId: currentEditedId,
          formData, // Pass form data correctly
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllAddress(user?.id));
          setCurrentEditedId(null);
          setFormData(initialAddressFormData);
          toast({ title: 'Address updated successfully', variant: 'success' });
        }
      });
    } else {
      // Adding a new address
      dispatch(
        addAddress({
          ...formData,
          userId: user?.id,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllAddress(user?.id));
          setFormData(initialAddressFormData);
          toast({ title: 'Address added successfully', variant: 'success' });
        }
      });
    }
  }

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchAllAddress(user?.id));
    }
  }, [dispatch, user?.id]);

  function isFormValid() {
    return Object.values(formData).every((value) => value.trim() !== '');
  }

  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddress(user?.id));
        toast({ title: 'Address deleted successfully', variant: 'success' });
      }
    });
  }

  function handleEditAddress(getCurrentAddress) {
    setCurrentEditedId(getCurrentAddress?._id);
    setFormData({
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      phone: getCurrentAddress?.phone,
      pincode: getCurrentAddress?.pincode,
      notes: getCurrentAddress?.notes,
    });
  }

  return (
    <Card>  
      {/* Address List */}
      <div className='mb-5 p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-5'>
        { addressList && addressList.length > 0 
          ? addressList.map(addressItem => (
              <AddressCard 
                key={addressItem._id}
                handleDeleteAddress={handleDeleteAddress}
                handleEditAddress={handleEditAddress}
                addressInfo={addressItem} 
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            )) 
          : <p className="text-gray-500 text-center">No addresses available.</p>
        }
      </div> 
      
      {/* Add/Edit Address Section */}
      <CardHeader>
        <CardTitle>
          {currentEditedId ? 'Edit Address' : 'Add Address'}
        </CardTitle>
      </CardHeader>   
      
      <CardContent className='space-y-4'>
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId ? 'Update' : 'Add'}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
