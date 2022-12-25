import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getTickets } from "../features/tickets/ticketSlice.js"
import Spinner from "../components/Spinner"

import TicketItem from "../components/TicketItem"

const Tickets = () => {
  const { tickets } = useSelector((state) => state.ticket)

  const dispatch = useDispatch()

  // NOTE: only need one useEffect here

  useEffect(() => {
    dispatch(getTickets())
  }, [dispatch])

  // NOTE: no need for loading state, we can check for absence of tickets
  // If we don't have tickets we are loading, if we do have tickets we just
  // need to update the tickets with latest tickets in the background
  if (!tickets) {
    return <Spinner />
  }

  return (
    <>
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {Object.entries(tickets)?.map((ticket) => (
          <TicketItem ticket={ticket} />
        ))}
      </div>
    </>
  )
}

export default Tickets
