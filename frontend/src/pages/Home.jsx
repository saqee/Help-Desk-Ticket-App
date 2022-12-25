import React from "react"
import { Link } from "react-router-dom"
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa"
const Home = () => {
  return (
    <>
      <section className="heading">
        <h1>What do you need help with</h1>
        <p>please choose an option</p>
        <Link to="/new-ticket" className="btn btn-reverse btn-block">
          <FaQuestionCircle />
          Create a Ticket
        </Link>
        <Link to="/view" className="btn btn-reverse btn-block">
          <FaTicketAlt />
          View
        </Link>
      </section>
    </>
  )
}

export default Home
