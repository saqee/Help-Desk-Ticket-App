import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import noteService from "./noteService.js"
const initialState = {
  notes: [],
  isError: false,
  isLoading: false,
  message: "",
}
export const getNotes = createAsyncThunk(
  "notes/getNotes",
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await noteService.getNotes(ticketId, token)
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

export const createNotes = createAsyncThunk(
  "notes/create",
  async ({ noteText, ticketId }, thunkAPI) => {
    console.log(noteText)
    try {
      const token = thunkAPI.getState().auth.user.token
      return await noteService.createNotes({ noteText, ticketId }, token)
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
const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    reset: (sate) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        // NOTE: reset notes to null on pending so we can show a Spinner while
        // fetching notes
        state.notes = null
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        // NOTE: even if there are no notes for the ticket we get an empty
        // array, so we can use this to detect if we have notes or are fetching
        // notes. Payload will be an array of notes or an empty array, either
        // means we have finished fetching the notes.
        state.notes = action.payload
      })
      .addCase(createNotes.fulfilled, (state, action) => {
        state.notes.push(action.payload)
      })
  },
})

export const { reset } = noteSlice.actions
export default noteSlice.reducer
