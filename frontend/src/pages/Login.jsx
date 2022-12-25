import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { FaSignInAlt } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { login, reset } from "../features/auth/authSlice"
//import Spinner from "../components/Spinner"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  )
  const { email, password } = formData

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate("/")
    }
    dispatch(reset())
  }, [isError, isSuccess, isLoading, navigate, dispatch, message, user])

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const onSubmitForm = (e) => {
    e.preventDefault()
    const userData = {
      email,
      password,
    }
    dispatch(login(userData))
    navigate("/")
  }
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please sign in your account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmitForm}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter password"
              required
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block">Login</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login
