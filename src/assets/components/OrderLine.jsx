import { React, useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ENDPOINTS } from '../../services/api/endpoints';

const OrderLine = ({order}) => {
    const orderDate = new Date(order.orderPlaced); 
    const [event, setEvent] = useState ([])
    const [loading, setLoading] = useState(true);
    const { authenticatedFetch } = useAuth();

    let paid = "Pending"
    let statusClass = "status-pending" 

    if (order.isPaid) {
        paid = "Completed"
        statusClass = "status-completed"
    } else {
        paid = "Pending"
        statusClass = "status-pending"
    }

    const getEvent = async () => {
        try {
            setLoading(true);  
            const res = await authenticatedFetch(`${ENDPOINTS.EVENTS.GET}/${order.eventId}`)

            if (res.ok) {
                const data = await res.json() 
                console.log(data)
                setEvent(data)
            } 
        } catch (error) {
            console.error('Error fetching event:', error);
        } finally {
            setLoading(false);  
        }
    }
          
    useEffect(() => {
        getEvent()
    }, [order.eventId])

    const formattedDate = orderDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })

  return (
    <tr className="order-headers">
        <td className="tablet-line">{order.id}</td>
        <td className="mobile-line">{formattedDate}</td>
        <td className="mobile-line">{event.title}</td>
        <td className={`tablet-line ${statusClass}`}>{paid}</td>
        <td className="mobile-line">{order.quantity}</td>
        <td className="tablet-line">{order.pricePerTicket}</td>
        <td className="mobile-line">{order.totalPrice}</td>
        <td className="desktop-line">{order.customerId}</td>
        <td className="mobile-line">
            <Link to={`/orders/${order.id}`}>
                <button className="btn btn-medium btn-pink">View Details</button>
            </Link>
        </td>
    </tr>
  )
}

export default OrderLine