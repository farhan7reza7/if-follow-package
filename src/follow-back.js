/*const axios = require('axios');

function followBack(yourUsername, yourToken) {
  async function getAllFollowers() {
    const followers = [];
    let page = 1;

    while (true) {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${yourUsername}/followers?page=${page}&per_page=100`,
          {
            auth: {
              username: yourUsername,
              password: yourToken,
            },
          },
        );

        const data = response.data;

        if (!data || (Array.isArray(data) && data.length === 0)) {
          break;
        }

        followers.push(...data.map((follower) => follower.login));
        page++;
      } catch (error) {
        console.error(`Error: ${error.message}`);
        break;
      }
    }

    return followers;
  }

  async function getAllFollowing() {
    const following = [];
    let page = 1;

    while (true) {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${yourUsername}/following?page=${page}&per_page=100`,
          {
            auth: {
              username: yourUsername,
              password: yourToken,
            },
          },
        );

        const data = response.data;

        if (!data || (Array.isArray(data) && data.length === 0)) {
          break;
        }

        following.push(...data.map((user) => user.login));
        page++;
      } catch (error) {
        console.error(`Error: ${error.message}`);
        break;
      }
    }

    return following;
  }

  return {
    async isfollower(username) {
      const followers = await getAllFollowers(username);
      let message;
      if (followers.includes(username)) {
        message = 'Yes, ' + username + ' follow you!';
        console.log(message);
      } else {
        message = 'No, ' + username + ' not follow you!';
        console.log(message);
      }
      return message;
    },

    async isFollowing(username) {
      const followings = await getAllFollowing(username);
      let message;
      if (followings.includes(username)) {
        message = 'Yes, you follow ' + username + '!';
        console.log(message);
      } else {
        message = 'No, you not follow ' + username + '!';
        console.log(message);
      }
      return message;
    },

    async totalFollowers() {
      const followers = await getAllFollowers();
      let total = followers.length;
      console.log(`Your total Followers: ${total}`);
      return total;
    },

    async totalFollowings() {
      const followings = await getAllFollowing();
      let total = followings.length;
      console.log(`Your total Followings: ${total}`);
      return total;
    },

    async whoNotFollowingBack() {
      const followers = await getAllFollowers();
      const following = await getAllFollowing();

      const notFollowingBack = following.filter(
        (user) => !followers.includes(user),
      );
      return notFollowingBack;
    },

    async whoFollowingBack() {
      const followers = await getAllFollowers();
      const following = await getAllFollowing();

      const followingBacks = following.filter((user) =>
        followers.includes(user),
      );
      return followingBacks;
    },

    async isFollowingBack(username) {
      const followingBacks = await this.whoFollowingBack();
      let message;
      if (followingBacks.includes(username)) {
        message = 'Yes ,' + username + ' following back!';
        console.log(message);
      } else {
        message = 'No, ' + username + ' not following back!';
        console.log(message);
      }
      return message;
    },

    async unfollowNotFollowingBack(username) {
      const notFollowingBack = this.whoNotFollowingBack();
      if (notFollowingBack.includes(username)) {
        try {
          await axios.delete(
            `https://api.github.com/user/following/${username}`,
            {
              headers: {
                Authorization: `token ${yourToken}`,
              },
            },
          );
          console.log(`Unfollowed: ${username}`);
        } catch (error) {
          console.error(`Failed to unfollow: ${username}`);
        }
      } else {
        console.log('Sorry, ' + username + ' is not a not-following-back user');
      }
    },

    async unfollowAllNotFollowingBack() {
      const notFollowingBack = this.whoNotFollowingBack();

      let counter = 1;
      for (const user of notFollowingBack) {
        try {
          await axios.delete(`https://api.github.com/user/following/${user}`, {
            headers: {
              Authorization: `token ${yourToken}`,
            },
          });
          console.log(`${counter} Unfollowed: ${user}`);
        } catch (error) {
          console.error(`Failed to unfollow: ${user}`);
        }
      }
      console.log(
        'Process finished!\n\nYour total Followers: ${this.totalFollowers()}\nYour total Followings: ${this.totalFollowings()}\n',
      );
    },
  };
}

module.exports = followBack;

*/

const axios = require('axios');

/**
 * Module for managing followers and followings on GitHub.
 * @param {string} yourUsername - Your GitHub username.
 * @param {string} yourToken - Your GitHub personal access token.
 * @returns {Object} An object containing functions to interact with followers and followings.
 */

function followBack(
  yourUsername = 'spirito7phil',
  yourToken = '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',
) {
  /**
   * Retrieves all followers of the specified user.
   * @private
   * @returns {Promise<Array<string>>} An array of usernames of followers.
   */
  async function getAllFollowers() {
    const followers = [];
    let page = 1;

    while (true) {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${yourUsername}/followers?page=${page}&per_page=100`,
          {
            auth: {
              username: yourUsername,
              password: yourToken,
            },
          },
        );

        const data = response.data;

        if (!data || (Array.isArray(data) && data.length === 0)) {
          break;
        }

        followers.push(...data.map((follower) => follower.login));
        page++;
      } catch (error) {
        //console.error(`Error: ${error.message}`);
        if (error.response) {
          // The request was made, but the server responded with an error
          console.error(
            `API Error: ${error.response.status} - ${error.response.data.message}`,
          );
        } else if (error.request) {
          // The request was made, but no response was received
          console.error('No response received from the server');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error(`Error: ${error.message}`);
        }

        return []; // Return an empty array or handle the error as appropriate for your application
        //break;
      }
    }

    return followers;
  }

  /**
   * Retrieves all users that the specified user is following.
   * @private
   * @returns {Promise<Array<string>>} An array of usernames of users being followed.
   */
  async function getAllFollowing() {
    const following = [];
    let page = 1;

    while (true) {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${yourUsername}/following?page=${page}&per_page=100`,
          {
            auth: {
              username: yourUsername,
              password: yourToken,
            },
          },
        );

        const data = response.data;

        if (!data || (Array.isArray(data) && data.length === 0)) {
          break;
        }

        following.push(...data.map((user) => user.login));
        page++;
      } catch (error) {
        //console.error(`Error: ${error.message}`);
        if (error.response) {
          // The request was made, but the server responded with an error
          console.error(
            `API Error: ${error.response.status} - ${error.response.data.message}`,
          );
        } else if (error.request) {
          // The request was made, but no response was received
          console.error('No response received from the server');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error(`Error: ${error.message}`);
        }

        return []; // Return an empty array or handle the error as appropriate for your application

        //break;
      }
    }

    return following;
  }

  return {
    /**
     * Checks if a user is a follower of the specified user.
     * @param {string} username - The username to check.
     * @returns {Promise<string>} A message indicating if the user follows or not.
     */
    async isFollower(username) {
      const followers = await getAllFollowers(username);
      let message;
      if (followers.includes(username)) {
        message = 'Yes, ' + username + ' follow you!';
        console.log(message);
      } else {
        message = 'No, ' + username + ' not follow you!';
        console.log(message);
      }
      return message;
    },

    /**
     * Checks if the specified user is being followed by the authenticated user.
     * @param {string} username - The username to check.
     * @returns {Promise<string>} A message indicating if the user is being followed or not.
     */
    async isFollowing(username) {
      const followings = await getAllFollowing(username);
      let message;
      if (followings.includes(username)) {
        message = 'Yes, you follow ' + username + '!';
        console.log(message);
      } else {
        message = 'No, you not follow ' + username + '!';
        console.log(message);
      }
      return message;
    },

    /**
     * Retrieves the total number of followers of the authenticated user.
     * @returns {Promise<number>} The total number of followers.
     */
    async totalFollowers() {
      const followers = await getAllFollowers();
      let total = followers.length;
      console.log(`Your total Followers: ${total}`);
      return total;
    },

    /**
     * Retrieves the total number of users that the authenticated user is following.
     * @returns {Promise<number>} The total number of followings.
     */
    async totalFollowings() {
      const followings = await getAllFollowing();
      let total = followings.length;
      console.log(`Your total Followings: ${total}`);
      return total;
    },

    /**
     * Retrieves users that the authenticated user is following but not being followed back.
     * @returns {Promise<Array<string>>} An array of usernames.
     */
    async whoNotFollowingBack() {
      const followers = await getAllFollowers();
      const following = await getAllFollowing();

      const notFollowingBack = following.filter(
        (user) => !followers.includes(user),
      );
      return notFollowingBack;
    },

    /**
     * Retrieves users that the authenticated user is following and are also being followed back.
     * @returns {Promise<Array<string>>} An array of usernames.
     */
    async whoFollowingBack() {
      const followers = await getAllFollowers();
      const following = await getAllFollowing();

      const followingBacks = following.filter((user) =>
        followers.includes(user),
      );
      return followingBacks;
    },

    /**
     * Checks if the specified user is following back the authenticated user.
     * @param {string} username - The username to check.
     * @returns {Promise<string>} A message indicating if the user is following back or not.
     */
    async isFollowingBack(username) {
      const followingBacks = await this.whoFollowingBack();
      let message;
      if (followingBacks.includes(username)) {
        message = 'Yes, ' + username + ' following back!';
        console.log(message);
      } else {
        message = 'No, ' + username + ' not following back!';
        console.log(message);
      }
      return message;
    },

    /**
     * Unfollows a user who is not following back the authenticated user.
     * @param {string} username - The username to unfollow.
     */
    async unfollowNotFollowingBack(username) {
      const notFollowingBack = await this.whoNotFollowingBack();
      if (notFollowingBack.includes(username)) {
        try {
          await axios.delete(
            `https://api.github.com/user/following/${username}`,
            {
              headers: {
                Authorization: `token ${yourToken}`,
              },
            },
          );
          console.log(`Unfollowed: ${username}`);
        } catch (error) {
          console.error(`Failed to unfollow: ${username}`);
        }
      } else {
        console.log('Sorry, ' + username + ' is not a not-following-back user');
      }
    },

    /**
     * Unfollows all users who are not following back the authenticated user.
     * @async
     * @returns {Promise<void>} A promise that resolves once all users have been unfollowed.
     */
    async unfollowAllNotFollowingBack() {
      const notFollowingBack = await this.whoNotFollowingBack();

      let counter = 1;
      for (const user of notFollowingBack) {
        try {
          await axios.delete(`https://api.github.com/user/following/${user}`, {
            headers: {
              Authorization: `token ${yourToken}`, // Assuming yourToken is defined somewhere in the scope
            },
          });
          console.log(`${counter} Unfollowed: ${user}`);
        } catch (error) {
          console.error(`Failed to unfollow: ${user}`);
        }
      }
      //console.log(
      //`Process finished!\n\nYour total Followers: ${await this.totalFollowers()}\nYour total Followings: ${await this.totalFollowings()}\n`,
      //);
    },
  };
}

module.exports = followBack;
