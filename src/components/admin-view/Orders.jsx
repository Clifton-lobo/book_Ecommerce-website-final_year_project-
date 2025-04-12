import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table'
import React, { useState } from 'react'
import { Dialog } from '../ui/dialog'
import OrderDetails from '@/components/admin-view/OrderDetails'

const AdminOrders = () => {

  const [openDialog,setOpenDialog]=useState(false);

  return (
   <Card>
    <CardHeader>
      <CardTitle>Order History</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Order Date</TableHead>
          <TableHead>Order status</TableHead>
          <TableHead>Order price</TableHead>
          <TableHead className='sr-only'><span>Details</span></TableHead>
        </TableRow>
        <TableBody>
          <TableRow>
            <TableCell> 1234566</TableCell>
            <TableCell> 27/25/2004</TableCell>
            <TableCell> in process</TableCell>  
            <TableCell> $10000</TableCell>
            <TableCell> 
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <Button onClick={()=>setOpenDialog(true)}>View Details</Button>
              <OrderDetails/>
              </Dialog>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
   </Card>
  )
}

export default AdminOrders
