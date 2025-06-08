import { React, useState, useEffect }from 'react'
import { useAuth } from '../../contexts/AuthContext';
import OrderLine from '../components/OrderLine';
import { ENDPOINTS } from '../../services/api/endpoints';


const Orders = () => {

  const [orders, setOrders] = useState ([])
    const { authenticatedFetch } = useAuth();
  
    const getOrders = async () => {
      const res = await authenticatedFetch (ENDPOINTS.ORDERS.GET_ALL)
  
      if (res.ok) {
        const data = await res.json() 
        console.log(data)
        setOrders(data)
      }
    }
  
    useEffect(() => {
      getOrders()
    }, [])

  return (
    <div className="orders-page">
      <h2>Orders</h2>
      <table className="orders-table">
        <thead>
          <tr className="order-headers">
            <th className="tablet-line">Id</th>
            <th className="mobile-line">Order Date</th>
            <th className="mobile-line">Event</th>
            <th className="tablet-line">Payment Status</th>
            <th className="mobile-line">Qty</th>
            <th className="tablet-line">Price</th>
            <th className="mobile-line">Total</th>
            <th className="desktop-line">Customer Id</th>
            <th className="mobile-line">Order Details</th>
          </tr>
        </thead>
      <tbody>
        {
          orders.map(order => (
            <OrderLine key={order.id} order={order} />
          ))
        }
      </tbody>
        
        
      </table>
    </div>
  )
}

export default Orders