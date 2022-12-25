import axios from "axios"

const createTicket = async (ticketData, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(
    "http://localhost:5002/api/tickets",
    ticketData,
    config
  )

  return response.data
}

const getTickets = async (token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get("http://localhost:5002/api/tickets", config)
  return response.data
}

const getTicket = async (id, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(
    `http://localhost:5002/api/tickets/${id}`,
    config
  )
  return response.data
}

const closeTicket = async (id, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(
    `http://localhost:5002/api/tickets/${id}`,
    { status: "closed" },
    config
  )
  return response.data
}
const ticketService = {
  createTicket,
  getTickets,
  getTicket,
  closeTicket,
}
export default ticketService
