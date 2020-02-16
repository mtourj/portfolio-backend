module.exports = (req, res, next) => {
  if(!req.headers.apikey) {
    console.log(req.headers);
    return res.status(401).json({message: 'Unauthorized: apikey not found in headers'})
  } else if (req.headers.apikey !== process.env.CLIENT_KEY) {
    return res.status(401).json({message: 'Unauthorized: apikey invalid'});
  }

  next();
}