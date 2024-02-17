// Importing required modules

const axios = require('axios');

/**
   * Function to Handles errors from Axios requests.
   * @param {Error} error - The error object.
   */
const handleAxiosError = require("./error-handler");

/**
   * Retrieves all followers of the specified user.
   * @private
   * @returns {Promise<Array<string>>} An array of usernames of followers.
   */
  async function getAllFollowers(yourUsername, yourToken) {
    const followers = [];
    let page = 1;

    // Fetch followers in paginated manner
    while (true) {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${yourUsername}/followers`,
          {
            params: { page, per_page: 100 },
            auth: {
              username: yourUsername,
              password: yourToken,
            },
          },
        );

        const data = response.data;

        // Break if no more followers or data
        if (!data || data.length === 0) {
          break;
        }

        // Extract and store usernames of followers
        followers.push(...data.map(({ login }) => login));
        page++;
        //await delay(1000); // Introduce a delay between API requests
      } catch (error) {
        // Handle Axios errors
        handleAxiosError(error);
        return [];
      }
    }

    return followers;
  }

module.exports = getAllFollowers;
