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

  
