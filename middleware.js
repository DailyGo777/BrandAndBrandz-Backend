import { rateLimit } from 'express-rate-limit'

// Error handling middleware
export const errorHandle = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
};

// 404 route handler middleware
export const routeHandler = (req, res) => {
  res.status(404).json({ error: 'Route not found' });
};

export const limiter = rateLimitrateLimit({
  windowMs: 1 * 60 * 1000,  // 1 minute window
  max: 5,                   // limit each IP to 5 requests per window
  message: {
    status: 429,
    error: "Too many requests, please try again later.",
  },
});