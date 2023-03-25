const createResponse = (
  data,
  message = null,
  error = false,
  status = false,
  token = null
) => {
  return {
    data,
    message,
    error,
    status,
    token,
  };
};

module.exports = createResponse;
