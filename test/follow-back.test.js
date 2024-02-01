const followBack = require('../src/follow-back');
const axios = require('axios');

const { TOKEN: token, USER: user } = process.env;

jest.mock('axios');

describe('Follow Back Module', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('isFollower', () => {
    it('should return true if the user is a follower', async () => {
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'farhan7reza7' }],
      });

      const result = await followBack(user, token).isFollower('farhan7reza7');
      expect(result).toBe('Yes, farhan7reza7 follows you!');
    });

    it('should return false if the user is not a follower', async () => {
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'follower1' }, { login: 'follower2' }],
      });

      const result = await followBack(user, token).isFollower('farhan7reza7');
      expect(result).toBe('No, farhan7reza7 does not follow you!');
    });

    it('should return true for a different follower', async () => {
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'follower3' }, { login: 'follower4' }],
      });

      const result = await followBack(user, token).isFollower('follower3');
      expect(result).toBe(true);
    });

    it('should return false for a different non-follower', async () => {
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'follower5' }, { login: 'follower6' }],
      });

      const result = await followBack(user, token).isFollower('follower7');
      expect(result).toBe(false);
    });
  });

  describe('isFollowing', () => {
    it('should return true if the user is followed', async () => {
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'farhan7reza7' }, { login: 'follower1' }],
      });

      const result = await followBack(user, token).isFollowing('farhan7reza7');
      expect(result).toBe(true);
    });
    it('should return false if the user is not followed', async () => {
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'follower2' }, { login: 'follower3' }],
      });

      const result = await followBack(user, token).isFollowing('farhan7reza7');
      expect(result).toBe(false);
    });
  });

  describe('totalFollowers', () => {
    it('should return the total number of followers', async () => {
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'follower1' }, { login: 'follower2' }, { login: 'follower3' }],
      });

      const result = await followBack(user, token).totalFollowers();
      expect(result).toBe(3);
    });
  });

  describe('totalFollowings', () => {
    it('should return the total number of followings', async () => {
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'following1' }, { login: 'following2' }],
      });

      const result = await followBack(user, token).totalFollowings();
      expect(result).toBe(2);
    });
  });

  describe('whoNotFollowingBack', () => {
    it('should return users who are not following back', async () => {
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'follower1' }, { login: 'follower2' }],
      });
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'following1' }, { login: 'following2' }],
      });

      const result = await followBack(user, token).whoNotFollowingBack();
      expect(result).toEqual(['following1', 'following2']);
    });
  });

  describe('whoFollowingBack', () => {
    it('should return users who are following back', async () => {
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'follower1' }, { login: 'following2' }],
      });
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'following1' }, { login: 'following2' }],
      });

      const result = await followBack(user, token).whoFollowingBack();
      expect(result).toEqual(['following2']);
    });
  });

  describe('isFollowingBack', () => {
    it('should return true if the user is following back', async () => {
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'following1' }, { login: 'follower2' }],
      });
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'following1' }, { login: 'following2' }],
      });

      const result = await followBack(user, token).isFollowingBack('following1');
      expect(result).toBe(true);
    });

    it('should return false if the user is not following back', async () => {
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'follower1' }, { login: 'follower2' }],
      });
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'following1' }, { login: 'following2' }],
      });

      const result = await followBack(user, token).isFollowingBack('follower1');
      expect(result).toBe(false);
    });
  });

  describe('unfollowNotFollowingBack', () => {
    it('should unfollow a user who is not following back', async () => {
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'follower1' }, { login: 'following2' }],
      });
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'following1' }, { login: 'following2' }],
      });
      axios.delete.mockResolvedValueOnce({ status: 204 });

      await followBack(user, token).unfollowNotFollowingBack('follower1');
      expect(axios.delete).toHaveBeenCalledTimes(1);
      expect(axios.delete).toHaveBeenCalledWith(
        'https://api.github.com/user/following/follower1',
        expect.any(Object)
      );
    });

    it('should not unfollow if the user is following back', async () => {
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'follower1' }, { login: 'follower2' }],
      });
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'following1' }, { login: 'following2' }],
      });

      await followBack(user, token).unfollowNotFollowingBack('following2');
      expect(axios.delete).not.toHaveBeenCalled();
    });
  });

  describe('unfollowAllNotFollowingBack', () => {
    it('should unfollow all users who are not following back', async () => {
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'follower1' }, { login: 'follower2' }],
      });
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'following1' }, { login: 'following2' }],
      });
      axios.delete.mockResolvedValueOnce({ status: 204 });

      await followBack(user, token).unfollowAllNotFollowingBack();
      expect(axios.delete).toHaveBeenCalledTimes(2); // Assuming there are two users to unfollow
      expect(axios.delete).toHaveBeenCalledWith(
        'https://api.github.com/user/following/follower1',
        expect.any(Object)
      );
      expect(axios.delete).toHaveBeenCalledWith(
        'https://api.github.com/user/following/follower2',
        expect.any(Object)
      );
    });

    it('should not unfollow if all users are following back', async () => {
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'following1' }, { login: 'following2' }],
      });
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'following1' }, { login: 'following2' }],
      });

      await followBack(user, token).unfollowAllNotFollowingBack();
      expect(axios.delete).not.toHaveBeenCalled();
    });
  });
});
