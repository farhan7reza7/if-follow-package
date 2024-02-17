/**
   * Handles errors from Axios requests.
   * @param {Error} error - The error object.
   */
  function handleAxiosError(error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // The request was made, but the server responded with an error
        console.error(
          `API Error: ${error.response.status} - ${error.response.data.message || 'No error message available'}`,
        );
      } else if (error.request) {
        // The request was made, but no response was received
        console.error('No response received from the server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error(
          `Error: ${error.message || 'No error message available'}`,
        );
      }
    } else {
      //console.error(`Non-Axios Error: ${error.message || "No error message available"}`);
      console.log('Non-Axios Error');
    }
  }

module.exports = handleAxiosError;
