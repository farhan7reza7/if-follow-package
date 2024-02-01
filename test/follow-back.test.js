const followBack = require('../src/follow-back');
const axios = require('axios');

const { TOKEN: token, USER: user } = process.env;

jest.mock('axios');

describe('Follow Back Module', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('isFollower', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
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
      expect(result).toBe('Yes, follower3 follows you!');
    });
  
    it('should return false for a different non-follower', async () => {
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'follower5' }, { login: 'follower6' }],
      });
  
      const result = await followBack(user, token).isFollower('follower7');
      expect(result).toBe('No, follower7 does not follow you!');
    });
  
    afterAll(() => {
      jest.clearAllMocks();
    });
  });
  
  
  describe('isFollowing', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return true if the user is followed', async () => {
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'farhan7reza7' }, { login: 'follower1' }],
      });
  
      const result = await followBack(user, token).isFollowing('farhan7reza7');
      expect(result).toBe('Yes, you follow farhan7reza7!');
    });
  
    it('should return false if the user is not followed', async () => {
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'follower2' }, { login: 'follower3' }],
      });
  
      const result = await followBack(user, token).isFollowing('farhan7reza7');
      expect(result).toBe('No, you do not follow farhan7reza7!');
    });
  
    afterAll(() => {
      jest.clearAllMocks();
    });
  });

  describe('totalFollowers', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return the total number of followers', async () => {
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'follower1' }, { login: 'follower2' }, { login: 'follower3' }],
      });
  
      const result = await followBack(user, token).totalFollowers();
      expect(result).toBe(3);
    });
  
    afterAll(() => {
      jest.clearAllMocks();
    });
  });
  
  describe('totalFollowings', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return the total number of followings', async () => {
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'following1' }, { login: 'following2' }],
      });
  
      const result = await followBack(user, token).totalFollowings();
      expect(result).toBe(2);
    });
  
    afterAll(() => {
      jest.clearAllMocks();
    });
  });
  
  describe('whoNotFollowingBack', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return users who are not following back', async () => {
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'follower1' }, { login: 'follower2' }],
      });
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'following1' }, { login: 'following2' }],
      });
  
      const result = await followBack(user, token).whoNotFollowingBack();
      expect(result).toEqual(['follower1', 'follower2']);
    });
  
    afterAll(() => {
      jest.clearAllMocks();
    });
  });
  
  describe('whoFollowingBack', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return users who are following back', async () => {
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'follower1' }, { login: 'follower2' }],
      });
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'following1' }, { login: 'following2' }],
      });
  
      const result = await followBack(user, token).whoFollowingBack();
      expect(result).toEqual(['follower1', 'follower2']);
    });
  
    afterAll(() => {
      jest.clearAllMocks();
    });
  });
  
  describe('isFollowingBack', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return true if the user is following back', async () => {
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'follower1' }, { login: 'follower2' }],
      });
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'following1' }, { login: 'following2' }],
      });
  
      const result = await followBack(user, token).isFollowingBack('follower1');
      expect(result).toBe('Yes, follower1 following back!');
    });
  
    it('should return false if the user is not following back', async () => {
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'follower1' }, { login: 'follower2' }],
      });
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'following1' }, { login: 'following2' }],
      });
  
      const result = await followBack(user, token).isFollowingBack('follower3');
      expect(result).toBe('No, follower3 does not following back!');
    });
  
    afterAll(() => {
      jest.clearAllMocks();
    });
  });
  
  describe('unfollowNotFollowingBack', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should unfollow a user who is not following back', async () => {
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'follower1' }, { login: 'follower2' }],
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
  
      await followBack(user, token).unfollowNotFollowingBack('follower2');
      expect(axios.delete).not.toHaveBeenCalled();
    });
  
    afterAll(() => {
      jest.clearAllMocks();
    });
  });
  
  describe('unfollowAllNotFollowingBack', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
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
        data: [{ login: 'follower1' }, { login: 'follower2' }],
      });
      axios.get.mockResolvedValueOnce({
        data: [{ login: 'following1' }, { login: 'following2' }],
      });
  
      await followBack(user, token).unfollowAllNotFollowingBack();
      expect(axios.delete).not.toHaveBeenCalled();
    });
  
    afterAll(() => {
      jest.clearAllMocks();
    });
  });  
});
