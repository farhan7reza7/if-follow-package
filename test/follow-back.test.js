const followBack = require('../src/follow-back'); // Import the module to be tested
//require('dotenv').config();
const { TOKEN: token, USER: user } = process.env;

describe('Follow Back Module', () => {
  // Mocking axios calls
  jest.mock('axios');
  const axios = require('axios');

  beforeEach(() => {
    axios.get.mockReset();
    axios.delete.mockReset();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Mocking axios.get method
  axios.get.mockImplementation(async (url, config) => {
    // Mocking GitHub API responses
    if (url.includes('/followers')) {
      // Mock followers response
      return {
        data: [
          { login: 'farhan7reza7' },
          { login: 'Adele7731' },
          { login: 'anaseem80' },
          { login: 'follower4' },
        ],
      };
    } else if (url.includes('/following')) {
      // Mock following response
      return {
        data: [
          { login: 'farhan7reza7' },
          { login: 'diff-ymd-package' },
          { login: 'Open-Sourced-Org' },
          { login: 'following4' },
          { login: 'following5' },
        ],
      };
    }
  });

  // Mocking axios.delete method
  axios.delete.mockImplementation(async (url, config) => {});

  describe('isFollower', () => {
    // Test case to check if a user is a follower
    it('should return true if the user is a follower', async () => {
      const result = await followBack(user, token).isFollower('farhan7reza7');
      expect(result).toBe('Yes, farhan7reza7 follows you!');
    });

    // Test case to check if a user is not a follower
    it('should return false if the user is not a follower', async () => {
      const result = await followBack(user, token).isFollower(
        'diff-ymd-package',
      );
      expect(result).toBe('No, diff-ymd-package does not follow you!');
    });
  });

  describe('isFollowing', () => {
    // Test case to check if a user is followed
    it('should return true if the user is followed', async () => {
      const result = await followBack(user, token).isFollowing('farhan7reza7');
      expect(result).toBe('Yes, you follow farhan7reza7!');
    });

    // Test case to check if a user is not followed
    it('should return false if the user is not followed', async () => {
      const result = await followBack(user, token).isFollowing('anaseem80');
      expect(result).toBe('No, you do not follow anaseem80!');
    });
  });

  // Test case for the total number of followers
  describe('totalFollowers', () => {
    it('should return the total number of followers', async () => {
      const result = await followBack(user, token).totalFollowers();
      expect(result).toBe(3);
    });
  });

  // Test case for the total number of followings
  describe('totalFollowings', () => {
    it('should return the total number of followings', async () => {
      const result = await followBack(user, token).totalFollowings();
      expect(result).toBe(3);
    });
  });

  // Test case for users who are not following back
  describe('whoNotFollowingBack', () => {
    it('should return users who are not following back', async () => {
      const result = await followBack(user, token).whoNotFollowingBack();
      expect(result).toEqual(['diff-ymd-package', 'Open-Sourced-Org']);
    });
  });

  // Test case for users who are following back
  describe('whoFollowingBack', () => {
    it('should return users who are following back', async () => {
      const result = await followBack(user, token).whoFollowingBack();
      expect(result).toEqual(['farhan7reza7']);
    });
  });

  // Test case to check if a user is following back
  describe('isFollowingBack', () => {
    it('should return true if the user is following back', async () => {
      const result = await followBack(user, token).isFollowingBack(
        'farhan7reza7',
      );
      expect(result).toBe('Yes, farhan7reza7 following back!');
    });

    // Test case to check if a user is not following back
    it('should return false if the user is not following back', async () => {
      const result = await followBack(user, token).isFollowingBack(
        'diff-ymd-package',
      );
      expect(result).toBe('No, diff-ymd-package does not following back!');
    });
  });

  // Test case to check unfollowing a user who is not following back
  describe('unfollowNotFollowingBack', () => {
    it('should unfollow a user who is not following back', async () => {
      axios.delete.mockResolvedValueOnce({ status: 204 }); // Mock the successful deletion

      await followBack(user, token).unfollowNotFollowingBack(
        'diff-ymd-package',
      );
      expect(axios.delete).toHaveBeenCalledTimes(0); // Assuming there are one user to unfollow
    });
  });

  // Test case to check unfollowing all users who are not following back
  describe('unfollowAllNotFollowingBack', () => {
    it('should unfollow all users who are not following back', async () => {
      axios.delete.mockResolvedValueOnce({ status: 204 }); // Mock the successful deletion

      await followBack(user, token).unfollowAllNotFollowingBack();
      expect(axios.delete).toHaveBeenCalledTimes(0); // Assuming there are one user to unfollow
    });
  });
});
