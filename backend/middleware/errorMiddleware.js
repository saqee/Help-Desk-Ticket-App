export const errorHandler = (err, req, res, next) => {
  const status1 = res.statusCode ? res.statusCode : 500
  res.status(status1)

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  })
}
