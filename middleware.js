// Error handling middleware
export const errorHandle = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
};

// 404 route handler middleware
export const routeHandler = (req, res) => {
  res.status(404).json({ error: 'Route not found' });
};
