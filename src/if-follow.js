// Importing required modules

const axios = require('axios');

/**
  * Function to Retrieves all followers of the specified user.
  * @private
  * @returns {Promise<Array<string>>} An array of usernames of followers.
  */
const getAllFollowers = require("./private-followers");

/**
  * Function to Retrieves all users that the specified user is following.
  * @private
  * @returns {Promise<Array<string>>} An array of usernames of users being followed.
  */
const getAllFollowing = require("./private-followings");

/**
 * Class containing utilities for managing followers and followings on GitHub.
 *
 * @typedef {Object} IfFollow
 * @property {Function} isFollower - Checks if a user is following the authenticated user.
 * @property {Function} isFollowing - Checks if the authenticated user is following a given user.
 * @property {Function} totalFollowers - Retrieves the total number of followers for the authenticated user.
 * @property {Function} totalFollowings - Retrieves the total number of users that the authenticated user is following.
 * @property {Function} whoNotFollowingBack - Retrieves users that the authenticated user is not following back.
 * @property {Function} whoFollowingBack - Retrieves users that the authenticated user is following back.
 * @property {Function} isFollowingBack - Checks if a user is following the authenticated user back.
 * @property {Function} unfollowNotFollowingBack - Unfollows a user who is not following back.
 * @property {Function} unfollowAllNotFollowingBack - Unfollows all users who are not following back.
 */
class IfFollow {
       /**
        * Creates an instance of IfFollow.
        *
        * @constructor
        * @param {string} yourName - Your GitHub username
        * @param {string} yourToken - Your GitHub personal access token
        */
      constructor(yourName, yourToken) {
          this.yourName = yourName;
          this.yourToken = yourToken;
      }
    
    /**
     * Checks if a user is following the authenticated user.
     * @param {string} username - The username to check.
     * @returns {Promise<string>} A message indicating if the user follows or not.
     */
    async isFollower(username) {
      const followers = await getAllFollowers(this.yourName, this.yourToken);
      const message = followers.includes(username)
        ? `Yes, ${username} follows you!`
        : `No, ${username} does not follow you!`;
      return message;
    }

    /**
     * Checks if the authenticated user is following a given user.
     * @param {string} username - The username to check.
     * @returns {Promise<string>} A message indicating if the user is followed or not.
     */
    async isFollowing(username) {
      const following = await getAllFollowing(this.yourName, this.yourToken);
      const message = following.includes(username)
        ? `Yes, you follow ${username}!`
        : `No, you do not follow ${username}!`;
      return message;
    }

    /**
     * Retrieves the total number of followers for the authenticated user.
     * @returns {Promise<number>} The total number of followers.
     */
    async totalFollowers() {
      const followers = await getAllFollowers(this.yourName, this.yourToken);
      console.log(`Your total Followers: ${followers.length}`);
      return followers.length;
    }

    /**
     * Retrieves the total number of users that the authenticated user is following.
     * @returns {Promise<number>} The total number of followings.
     */
    async totalFollowings() {
      const following = await getAllFollowing(this.yourName, this.yourToken);
      console.log(`Your total Followings: ${following.length}`);
      return following.length;
    }

    /**
     * Retrieves users that the authenticated user is not following back.
     * @returns {Promise<Array<string>>} An array of usernames not followed back.
     */
    async whoNotFollowingBack() {
      const followers = await getAllFollowers(this.yourName, this.yourToken);
      const following = await getAllFollowing(this.yourName, this.yourToken);
      const notFollowingBack = following.filter(
        (user) => !followers.includes(user),
      );
     if (notFollowingBack) {
      return notFollowingBack;
     } else {
      return [];
     }
    }

    /**
     * Retrieves users that the authenticated user is following back.
     * @returns {Promise<Array<string>>} An array of usernames being followed back.
     */
    async whoFollowingBack() {
      const followers = await getAllFollowers(this.yourName, this.yourToken);
      const following = await getAllFollowing(this.yourName, this.yourToken);
      const followingBacks = following.filter((user) =>
        followers.includes(user),
      );
     if (followingBacks) {
      return followingBacks;
     } else {
      return [];
     }
    }

    /**
     * Checks if a user is following the authenticated user back.
     * @param {string} username - The username to check.
     * @returns {Promise<string>} A message indicating if the user is following back or not.
     */
    async isFollowingBack(username) {
      const followingBacks = await this.whoFollowingBack();
      const message = followingBacks.includes(username)
        ? `Yes, ${username} following back!`
        : `No, ${username} does not following back!`;
      return message;
    }

    /**
     * Unfollows a user who is not following back.
     *
     * @async
     * @param {string} username - The username of the user to unfollow if not following back.
     * @returns {Promise<void>} A promise that resolves once the user is unfollowed.
     */
    async unfollowNotFollowingBack(username) {
      // Get the list of users who are not following back
      const notFollowingBack = await this.whoNotFollowingBack();

      // Check if the specified user is in the list of users not following back
      if (notFollowingBack.includes(username)) {
        try {
          // Attempt to unfollow the user using GitHub API
          await axios.delete(
            `https://api.github.com/user/following/${username}`,
            {
              headers: {
                Authorization: `token ${this.yourToken}`, // Include the personal access token for authentication
              },
            },
          );
          console.log(`Unfollowed: ${username}`);
        } catch (error) {
          // Handle errors during unfollowing
          console.error(`Failed to unfollow: ${username}`);
        }
      } else {
        console.log(`Sorry, ${username} is not in not-following-back users`);
      }
    }

    /**
     * Unfollows all users who are not following back.
     *
     * @async
     * @returns {Promise<void>} A promise that resolves once all users are unfollowed.
     */
    async unfollowAllNotFollowingBack() {
      // Get the list of users who are not following back
      const notFollowingBack = await this.whoNotFollowingBack();

      // Iterate through each user and attempt to unfollow using GitHub API
      for (const user of notFollowingBack) {
        try {
          await axios.delete(`https://api.github.com/user/following/${user}`, {
            headers: {
              Authorization: `token ${this.yourToken}`, // Include the personal access token for authentication
            },
          });
          console.log(`Unfollowed: ${user}`);
        } catch (error) {
          // Handle errors during unfollowing
          console.error(`Failed to unfollow: ${user}`);
        }
        //await delay(1000); // Introduce a delay between API requests
      }
      console.log('Finished not following back users!');
    }
  };

module.exports = IfFollow;
