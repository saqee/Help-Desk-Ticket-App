import React from "react"
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./App.css"
import Header from "./components/Header"
import PrivateRoute from "./components/PrivateRoute"
import NewTicket from "./pages/NewTicket"
import Tickets from "./pages/Tickets"
import Ticket from "./pages/Ticket"
function App() {
  return (
    <div>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/new-ticket"
              element={
                <PrivateRoute>
                  <NewTicket />
                </PrivateRoute>
              }
            />
            <Route
              path="/view"
              element={
                <PrivateRoute>
                  <Tickets />
                </PrivateRoute>
              }
            />
            <Route
              path="/ticket/:ticketId"
              element={
                <PrivateRoute>
                  <Ticket />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </div>
  )
}

export default App
