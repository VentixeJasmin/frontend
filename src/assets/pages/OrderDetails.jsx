import { useAuth } from '../../contexts/AuthContext';
import React, { useEffect, useState } from 'react'
import { ENDPOINTS } from '../../services/api/endpoints';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState ([])
  const [event, setEvent] = useState ([])
  const [loading, setLoading] = useState(true);
  const { authenticatedFetch } = useAuth();

    let paid = "Pending"

    if (order.isPaid) {
        paid = "Completed"
    } else {
        paid = "Pending"
    }

  const getOrder = async () => {
    try {
      setLoading(true);  // Set loading to true
      const orderRes = await authenticatedFetch(`${ENDPOINTS.ORDERS.GET}/${id}`)
  
      if (orderRes.ok) {
        const orderData = await orderRes.json() 
        console.log(orderData)
        setOrder(orderData)
      } 
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);  // Set loading to false
    }
  }

  const getEvent = async () => {
    try {
        const eventRes = await fetch(`${ENDPOINTS.EVENTS.GET}/${order.eventId}`)

        if (eventRes.ok) {
            const eventData = await eventRes.json() 
            console.log(eventData)
            setEvent(eventData)
        } 
    } catch (error) {
        console.error('Error fetching event:', error);
    }
  }

  useEffect(() => {
    getOrder()
  }, [id])
  
  useEffect(() => {
    if (order && order.eventId) {
      getEvent(order.eventId)
    }
  }, [order])

  if (loading) return <div>Loading order details...</div>;
  if (!order) return <div>Order not found.</div>;

  const orderDate = new Date(order.orderPlaced); 
  const formattedDate = orderDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const formattedTime = orderDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })

  return (
    <div className="details-page">
      <div className="details-headline">
        <h2>Details for order #{order.id}</h2>
      </div>
      <div className="details-details">
        <p><span className="semi-bold">Order placed: </span>{formattedDate}, {formattedTime}</p>
        <p><span className="semi-bold">Item: </span>Ticket(s) for {event.title}</p>
        <p><span className="semi-bold">Quantity: </span>{order.quantity} </p>
        <p><span className="semi-bold">Price per ticket: </span>${event.price}</p>
        <p><span className="semi-bold">Total order price: </span>${order.totalPrice}</p>
        <p><span className="semi-bold">Payment status: </span>{paid}</p>
        <p><span className="semi-bold">Customer Id: </span>{order.customerId}</p>
      </div>
      <div className="center-div">
        <Link to="/orders">
            <button className="btn btn-large btn-pink">Go Back</button>
        </Link>
      </div>
    </div>
  )
}

export default OrderDetails