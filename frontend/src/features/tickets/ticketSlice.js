import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import ticketService from "./ticketService.js"

const initialState = {
  tickets: null,
  ticket: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

export const createTicket = createAsyncThunk(
  "ticket/create",
  async (ticket, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.createTicket(ticket, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getTickets = createAsyncThunk(
  "ticket/getTickets",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.getTickets(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getTicket = createAsyncThunk(
  "ticket/getTicket",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.getTicket(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const closeTicket = createAsyncThunk(
  "ticket/closeTicket",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.closeTicket(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const ticketsSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createTicket.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(createTicket.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tickets = action.payload
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.ticket = action.payload
      })
      .addCase(closeTicket.fulfilled, (state, action) => {
        state.tickets.map((ticket) =>
          ticket._id === action.payload._id
            ? (ticket.status = "closed")
            : ticket
        )
      })
      .addCase(getTickets.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export const { reset } = ticketsSlice.actions

export default ticketsSlice.reducer
