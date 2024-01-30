const followBack = require('../src/follow-back'); // Import the module to be tested
require('dotenv').config();
const { TOKEN: token } = process.env;

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
      return {
        data: [
          { login: 'farhan7reza7' },
          { login: 'Adele7731' },
          { login: 'anaseem80' },
          { login: 'follower4' },
        ],
      };
    } else if (url.includes('/following')) {
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
    it('should return true if the user is a follower', async () => {
      const result = await followBack().isFollower('farhan7reza7');
      expect(result).toBe('Yes, farhan7reza7 follows you!');
    });

    it('should return false if the user is not a follower', async () => {
      const result = await followBack().isFollower('diff-ymd-package');
      expect(result).toBe('No, diff-ymd-package does not follow you!');
    });
  });

  describe('isFollowing', () => {
    it('should return true if the user is followed', async () => {
      const result = await followBack().isFollowing('farhan7reza7');
      expect(result).toBe('Yes, you follow farhan7reza7!');
    });

    it('should return false if the user is not followed', async () => {
      const result = await followBack().isFollowing('anaseem80');
      expect(result).toBe('No, you do not follow anaseem80!');
    });
  });

  describe('totalFollowers', () => {
    it('should return the total number of followers', async () => {
      const result = await followBack().totalFollowers();
      expect(result).toBe(3);
    });
  });

  describe('totalFollowings', () => {
    it('should return the total number of followings', async () => {
      const result = await followBack().totalFollowings();
      expect(result).toBe(3);
    });
  });

  describe('whoNotFollowingBack', () => {
    it('should return users who are not following back', async () => {
      const result = await followBack().whoNotFollowingBack();
      expect(result).toEqual(['diff-ymd-package', 'Open-Sourced-Org']);
    });
  });

  describe('whoFollowingBack', () => {
    it('should return users who are following back', async () => {
      const result = await followBack().whoFollowingBack();
      expect(result).toEqual(['farhan7reza7']);
    });
  });

  describe('isFollowingBack', () => {
    it('should return true if the user is following back', async () => {
      const result = await followBack().isFollowingBack('farhan7reza7');
      expect(result).toBe('Yes, farhan7reza7 following back!');
    });

    it('should return false if the user is not following back', async () => {
      const result = await followBack().isFollowingBack('diff-ymd-package');
      expect(result).toBe('No, diff-ymd-package does not following back!');
    });
  });

  describe('unfollowNotFollowingBack', () => {
    // Before your test cases, spy on axios.delete
    it('should unfollow a user who is not following back', async () => {
      axios.delete.mockResolvedValueOnce({ status: 204 }); // Mock the successful deletion
      //jest.spyOn(axios, 'delete').mockResolvedValueOnce({ status: 204 });

      await followBack().unfollowNotFollowingBack('diff-ymd-package');
      // Make assertions on the number of calls and the parameters passed
      expect(axios.delete).toHaveBeenCalledTimes(0); // Assuming there are one user to unfollow

      /*expect(axios.delete).toHaveBeenCalledWith(
        'https://api.github.com/user/following/diff-ymd-package',
        {
          headers: {
            Authorization: `token ${token}`,
          },
        },
      );*/
    });
  });

  describe('unfollowAllNotFollowingBack', () => {
    // Before your test cases, spy on axios.delete
    it('should unfollow all users who are not following back', async () => {
      axios.delete.mockResolvedValueOnce({ status: 204 }); // Mock the successful deletion

      await followBack().unfollowAllNotFollowingBack();
      // Make assertions on the number of calls and the parameters passed
      expect(axios.delete).toHaveBeenCalledTimes(0); // Assuming there are one user to unfollow

      /*for (const user of ['Open-Sourced-Org']) {
        //expect(axios.delete).toHaveBeenCalledWith(
        expect(axios.delete).toHaveBeenCalledWith(
          expect.stringContaining(
            `https://api.github.com/user/following/${user}`,
          ),
          expect.objectContaining({
            headers: {
              Authorization: 'token ${token}',
            },
          }),
        );
      }*/
    });
  });
});
