export default (req, res, next) => {
	try {
    const token = req.headers.authorization.split(" ")[1]
    const user = jwt.verify(token, process.env.APP_KEY)
    req.user = user
    next()
  } catch (err) {
  	res.status(401).send({ message: 'Authentication failed!' })
  }
}