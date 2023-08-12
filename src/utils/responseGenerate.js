const createResponse = (data, message = null, error = false) => {
  return {
    data,
    message,
    error,
  };
};

module.exports = createResponse;
