import ApiResponse from '../utils/api-response.js';

export const healthcheckController = (req, res) => {
  try {
    return res.status(200).json(new ApiResponse(200, { message: 'API is running' }));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, { message: 'Failed to get healthcheck' }));
  }
};
