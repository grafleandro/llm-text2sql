export default function validateApiKey(req, res, next) {
    const apiKey = req.header('x-api-key');
    
    const expectedApiKey = process.env.X_API_KEY;
    
    if (!apiKey) {
      return res.status(401).json({ error: 'API key is required' });
    }
    
    if (apiKey !== expectedApiKey) {
      return res.status(403).json({ error: 'Invalid API key' });
    }
    
    next();
  }