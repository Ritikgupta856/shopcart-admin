
import { useContext } from 'react'
import Heading from '../Heading'
import { AppContext } from '@/src/Context/AppContext'

const Orders = () => {
  const {orders} = useContext(AppContext)
  return (
    <div className='py-8 px-10'>
      <Heading title={`Orders (${orders ? orders.length : 0})`} description="Manage Orders"/>
    </div>
  )
}

export default Orders
