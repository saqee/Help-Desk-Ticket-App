import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
export const UseStatus = () => {
  const [loogedIn, setLoggedIn] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)
  const { user } = useSelector((state) => state.auth)
  useEffect(() => {
    if (user) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
    setCheckingStatus(false)
  }, [loogedIn, user])
  return { loogedIn, checkingStatus }
}
