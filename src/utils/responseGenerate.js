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
    token,
  };
};

module.exports = createResponse;
