const API_KEY = process.env.API_KEY || 'default-secure-key';

exports.validateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== API_KEY) {
    return res.status(403).json({ message: 'Forbidden: Invalid or missing API key.' });
  }

  next();
};
