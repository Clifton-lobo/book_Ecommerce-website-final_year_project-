import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import UserOrderDetails from './UserOrderDetails'

const UserOrders = () => {

  const[openDetailsDialogue,setOpenDetailsDialogue]=useState(false)

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
              <Dialog open={openDetailsDialogue} onOpenChange={setOpenDetailsDialogue}>
              <Button onClick={()=>setOpenDetailsDialogue(true)}>View Details</Button>
              <UserOrderDetails/>
              </Dialog>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
   </Card>
  )
}

export default UserOrders
