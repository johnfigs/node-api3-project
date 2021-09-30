const Users = require('./../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`it is a ${req.method} request to ${req.originalUrl}`)
  next()
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try {
    const foundUser = await Users.getById(req.params.id)
    if (foundUser) {
      req.user = foundUser
      next()
    } else {
      next({ status: 404, message: 'user not found'})
    }
  } catch(error) {
    next(error)
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { name } = req.body
  if (!name || typeof name !== 'string' || !name.trim()) {
    next({ status: 400, message: 'missing required name field'})
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { text } = req.body
  if (!text || typeof text !=='string' || !text.trim()) {
    next({ status: 400, message: 'missing required text field '})
  } else {
    next()
  }
}

function errorHandling(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
  })
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost, 
  errorHandling
}