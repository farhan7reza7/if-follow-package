// Importing required modules
const axios = require('axios');

const handleAxiosError = require("./error-handler");

/**
   * Retrieves all users that the specified user is following.
   * @private
   * @returns {Promise<Array<string>>} An array of usernames of users being followed.
   */
  async function getAllFollowing() {
    const following = [];
    let page = 1;

    // Fetch following in paginated manner
    while (true) {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${yourUsername}/following`,
          {
            params: { page, per_page: 100 },
            auth: {
              username: yourUsername,
              password: yourToken,
            },
          },
        );

        const data = response.data;

        // Break if no more following or data
        if (!data || data.length === 0) {
          break;
        }

        // Extract and store usernames of following
        following.push(...data.map(({ login }) => login));
        page++;
        //await delay(1000); // Introduce a delay between API requests
      } catch (error) {
        // Handle Axios errors
        handleAxiosError(error);
        return [];
      }
    }

    return following;
  }

module.exports = getAllFollowing;
