// Importing required modules

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
const IfFollow = require("./if-follow");

/**
 * Type for managing followers and followings on GitHub.
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

/**
 * Creates an instance of the IfFollow Type.
 *
 * @function
 * @param {string} yourUsername - Your GitHub username.
 * @param {string} yourToken - Your GitHub personal access token.
 * @returns {IfFollow} An object containing functions to interact with followers and followings.
 */
function ifFollow(username, yourToken) {
  const followController = new IfFollow(username, yourToken);
  return followController;
}

/**
 * Exports the ifFollow function.
 * @module
 * @default
 * @function ifFollow
 * @returns {IfFollow} An object containing functions to interact with followers and followings.
 */
module.exports = ifFollow;
  
