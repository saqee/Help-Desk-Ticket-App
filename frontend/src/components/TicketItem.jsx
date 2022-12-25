import { Link } from "react-router-dom"

function TicketItem({ ticket }) {
  console.log(ticket)
  return (
    <div className="ticket">
      {ticket[1].map((ticket1) => (
        <>
          <div>{new Date(ticket1.createdAt).toLocaleString("en-US")}</div>
          <div>{ticket1.product}</div>
          <div className={`status status-${ticket1.status}`}>
            {ticket1.status}
          </div>
          <Link
            to={`/ticket/${ticket1._id}`}
            className="btn btn-reverse btn-sm"
          >
            View
          </Link>
        </>
      ))}
    </div>
  )
}

export default TicketItem
