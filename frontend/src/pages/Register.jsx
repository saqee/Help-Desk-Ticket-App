import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { FaUser } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { register, reset } from "../features/auth/authSlice"
import { useEffect } from "react"
//import Spinner from "../components/Spinner"

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isLoading, message, isError, isSuccess } = useSelector(
    (state) => state.auth
  )
  const { name, email, password, password2 } = formData
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate("/")
    }
    dispatch(reset())
  }, [isError, isSuccess, isLoading, navigate])
  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const onSubmitForm = (e) => {
    e.preventDefault()
    if (password !== password2) {
      toast.error("password not match")
    } else {
      const userData = {
        name,
        email,
        password,
      }
      dispatch(register(userData))
      navigate("/")
    }
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register{user}
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmitForm}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Enter your name"
              required
            />
          </div>
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
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              placeholder="Confirm password"
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register
