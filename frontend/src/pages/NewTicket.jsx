import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { createTicket, reset } from "../features/tickets/ticketSlice.js"
import Spinner from "../components/Spinner"
const NewTicket = () => {
  const { user } = useSelector((state) => state.auth)

  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.ticket
  )

  const [name] = useState(user.name)
  const [email] = useState(user.email)
  const [product, setProduct] = useState("iphone")
  const [description, setDescription] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    /* if (isSuccess) {
      navigate("/tickets")
    } */
  }, [isError, isSuccess, dispatch, navigate, message])

  const onSubmitData = (e) => {
    e.preventDefault()
    const data = {}
    dispatch(createTicket({ product, description }))
  }

  return (
    <>
      {/*   <BackButton /> */}
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input type="text" className="form-control" value={email} disabled />
        </div>
        <form onSubmit={onSubmitData}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="iPhone">iPhone</option>
              <option value="Macbook Pro">Macbook Pro</option>
              <option value="iMac">iMac</option>
              <option value="iPad">iPad</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description of the issue</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewTicket
