import axios from "axios"

const getNotes = async (ticketId, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(
    `http://localhost:5002/api/tickets/${ticketId}/notes`,
    config
  )
  console.log(response.data)
  return response.data
}

const createNotes = async ({ noteText, ticketId }, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }
  //console.log("note", { text: noteText })
  const response = await axios.post(
    `http://localhost:5002/api/tickets/${ticketId}/notes`,
    { text: noteText },
    config
  )
  console.log(response.data)
  return response.data
}

const noteService = {
  getNotes,
  createNotes,
}

export default noteService
