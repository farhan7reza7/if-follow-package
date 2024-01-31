const followBack = require('../src/follow-back');
const axios = require('axios');

jest.mock('axios');

describe('Follow Back Module', () => {
  const token = process.env.TOKEN;
  const user = process.env.USER;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('isFollower', () => {
    it('should return true if the user is a follower', async () => {
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'farhan7reza7' }],
      });

      const result = await followBack(token, user).isFollower('farhan7reza7');
      expect(result).toBe('Yes, farhan7reza7 follows you!');
    });

    it('should return false if the user is not a follower', async () => {
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'follower1' }, { login: 'follower2' }],
      });

      const result = await followBack(token, user).isFollower('diff-ymd-package');
      expect(result).toBe('No, diff-ymd-package does not follow you!');
    });
  });

  describe('isFollowing', () => {
    it('should return true if the user is followed', async () => {
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'farhan7reza7' }],
      });

      const result = await followBack(token, user).isFollowing('farhan7reza7');
      expect(result).toBe('Yes, you follow farhan7reza7!');
    });

    it('should return false if the user is not followed', async () => {
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'following1' }, { login: 'following2' }],
      });

      const result = await followBack(token, user).isFollowing('anaseem80');
      expect(result).toBe('No, you do not follow anaseem80!');
    });
  });

// Test case for totalFollowers
describe('totalFollowers', () => {
  it('should return the total number of followers', async () => {
    axios.get.mockResolvedValueOnce({
      data: [{ login: 'follower1' }, { login: 'follower2' }, { login: 'follower3' }],
    });

    const result = await followBack(token, user).totalFollowers();
    expect(result).toBe(3);
  });
});

// Test case for totalFollowings
describe('totalFollowings', () => {
  it('should return the total number of followings', async () => {
    axios.get.mockResolvedValueOnce({
      data: [{ login: 'following1' }, { login: 'following2' }, { login: 'following3' }],
    });

    const result = await followBack(token, user).totalFollowings();
    expect(result).toBe(3);
  });
});

// Test case for whoNotFollowingBack
describe('whoNotFollowingBack', () => {
  it('should return users who are not following back', async () => {
    axios.get.mockResolvedValueOnce({
      data: [{ login: 'diff-ymd-package' }, { login: 'Open-Sourced-Org' }],
    });

    const result = await followBack(token, user).whoNotFollowingBack();
    expect(result).toEqual(['diff-ymd-package', 'Open-Sourced-Org']);
  });
});

// Test case for whoFollowingBack
describe('whoFollowingBack', () => {
  it('should return users who are following back', async () => {
    axios.get.mockResolvedValueOnce({
      data: [{ login: 'farhan7reza7' }, { login: 'follower2' }, { login: 'follower3' }],
    });

    const result = await followBack(token, user).whoFollowingBack();
    expect(result).toEqual(['farhan7reza7']);
  });
});

// Test case for isFollowingBack
describe('isFollowingBack', () => {
  it('should return true if the user is following back', async () => {
    axios.get.mockResolvedValueOnce({
      data: [{ login: 'farhan7reza7' }],
    });

    const result = await followBack(token, user).isFollowingBack('farhan7reza7');
    expect(result).toBe('Yes, farhan7reza7 following back!');
  });

  it('should return false if the user is not following back', async () => {
    axios.get.mockResolvedValueOnce({
      data: [],
    });

    const result = await followBack(token, user).isFollowingBack('diff-ymd-package');
    expect(result).toBe('No, diff-ymd-package does not following back!');
  });
});

// Test case for unfollowNotFollowingBack
describe('unfollowNotFollowingBack', () => {
  it('should unfollow a user who is not following back', async () => {
    axios.delete.mockResolvedValueOnce({ status: 204 });

    await followBack(token, user).unfollowNotFollowingBack('diff-ymd-package');
    expect(axios.delete).toHaveBeenCalledWith(expect.stringContaining('/diff-ymd-package'));
  });
});

// Test case for unfollowAllNotFollowingBack
describe('unfollowAllNotFollowingBack', () => {
  it('should unfollow all users who are not following back', async () => {
    axios.get.mockResolvedValueOnce({
      data: [{ login: 'diff-ymd-package' }, { login: 'Open-Sourced-Org' }],
    });
    axios.delete.mockResolvedValueOnce({ status: 204 });

    await followBack(token, user).unfollowAllNotFollowingBack();
    expect(axios.delete).toHaveBeenCalledTimes(2); // Assuming there are two users to unfollow
  });

  /*
  const followBack = require('../src/follow-back'); // Import the module to be tested
//require('dotenv').config();
//const { TOKEN: token, USER: user} = process.env;

const token = process.env.TOKEN;
const user = process.env.USER;

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
      const result = await followBack(token, user).isFollower('farhan7reza7');
      expect(result).toBe('Yes, farhan7reza7 follows you!');
    });

    // Test case to check if a user is not a follower
    it('should return false if the user is not a follower', async () => {
      const result = await followBack(token, user).isFollower('diff-ymd-package');
      expect(result).toBe('No, diff-ymd-package does not follow you!');
    });
  });

  describe('isFollowing', () => {
    // Test case to check if a user is followed
    it('should return true if the user is followed', async () => {
      const result = await followBack(token, user).isFollowing('farhan7reza7');
      expect(result).toBe('Yes, you follow farhan7reza7!');
    });

    // Test case to check if a user is not followed
    it('should return false if the user is not followed', async () => {
      const result = await followBack(token, user).isFollowing('anaseem80');
      expect(result).toBe('No, you do not follow anaseem80!');
    });
  });

  // Test case for the total number of followers
  describe('totalFollowers', () => {
    it('should return the total number of followers', async () => {
      const result = await followBack(token, user).totalFollowers();
      expect(result).toBe(3);
    });
  });

  // Test case for the total number of followings
  describe('totalFollowings', () => {
    it('should return the total number of followings', async () => {
      const result = await followBack(token, user).totalFollowings();
      expect(result).toBe(3);
    });
  });

  // Test case for users who are not following back
  describe('whoNotFollowingBack', () => {
    it('should return users who are not following back', async () => {
      const result = await followBack(token, user).whoNotFollowingBack();
      expect(result).toEqual(['diff-ymd-package', 'Open-Sourced-Org']);
    });
  });

  // Test case for users who are following back
  describe('whoFollowingBack', () => {
    it('should return users who are following back', async () => {
      const result = await followBack(token, user).whoFollowingBack();
      expect(result).toEqual(['farhan7reza7']);
    });
  });

  // Test case to check if a user is following back
  describe('isFollowingBack', () => {
    it('should return true if the user is following back', async () => {
      const result = await followBack(token, user).isFollowingBack('farhan7reza7');
      expect(result).toBe('Yes, farhan7reza7 following back!');
    });

    // Test case to check if a user is not following back
    it('should return false if the user is not following back', async () => {
      const result = await followBack(token, user).isFollowingBack('diff-ymd-package');
      expect(result).toBe('No, diff-ymd-package does not following back!');
    });
  });

  // Test case to check unfollowing a user who is not following back
  describe('unfollowNotFollowingBack', () => {
    it('should unfollow a user who is not following back', async () => {
      axios.delete.mockResolvedValueOnce({ status: 204 }); // Mock the successful deletion

      await followBack(token, user).unfollowNotFollowingBack('diff-ymd-package');
      expect(axios.delete).toHaveBeenCalledTimes(0); // Assuming there are one user to unfollow
    });
  });

  // Test case to check unfollowing all users who are not following back
  describe('unfollowAllNotFollowingBack', () => {
    it('should unfollow all users who are not following back', async () => {
      axios.delete.mockResolvedValueOnce({ status: 204 }); // Mock the successful deletion

      await followBack(token, user).unfollowAllNotFollowingBack();
      expect(axios.delete).toHaveBeenCalledTimes(0); // Assuming there are one user to unfollow
    });
  });
});

  */
});
