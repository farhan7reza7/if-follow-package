const followBack = require('../src/follow-back');
const axios = require('axios');

const { TOKEN: token, USER: user } = process.env;

jest.mock('axios');

describe('Follow Back Module', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('isFollower', () => {
    it('should return specific message if the user is a follower', async () => {
      axios.get.mockResolvedValueOnce((url, config) => {
        if (url.includes('/followers')) {
          return Promise.resolve({
            data: [{ login: 'farhan7reza7' }],
         });
      });

      const result = await followBack(user, token).isFollower('farhan7reza7');
      expect(result).toBe('Yes, farhan7reza7 follows you!');

      expect(axios.get).toHaveBeenCalledWith(
        'https://api.github.com/user/followers/farhan7reza7',
        expect.any(Object)
      );
    });

    it('should return specific message if the user is not a follower', async () => {
      axios.get.mockResolvedValueOnce((url, config) => {
        if (url.includes(`/followers`)) {
          return Promise.resolve({
            data: [{ login: 'follower1' }, { login: 'follower2' }],
         });
      });

      const result = await followBack(user, token).isFollower('farhan7reza7');
      expect(result).toBe('No, farhan7reza7 does not follow you!');

      expect(axios.get).toHaveBeenCalledWith(
        'https://api.github.com/user/followers/farhan7reza7',
        expect.any(Object)
      );
    });
  });

  describe('isFollowing', () => {
    it('should return specific message if the user is followed', async () => {
      axios.get.mockResolvedValueOnce((url, config) => {
        if (url.includes(`/following`)) {
          return Promise.resolve({
            data: [{ login: 'farhan7reza7' }, { login: 'follower1' }],
         });
      });
      
      const result = await followBack(user, token).isFollowing('farhan7reza7');
      expect(result).toBe('Yes, you follow farhan7reza7!');

      expect(axios.get).toHaveBeenCalledWith(
        'https://api.github.com/user/following/farhan7reza7',
        expect.any(Object)
      );
    });

    it('should return specific message if the user is not followed', async () => {
      axios.get.mockResolvedValueOnce((url, config) => {
        if (url.includes(`/following`)) {
          return Promise.resolve({
            data: [{ login: 'follower2' }, { login: 'follower3' }],
         });
      });
      
      const result = await followBack(user, token).isFollowing('farhan7reza7');
      expect(result).toBe('No, you do not follow farhan7reza7!');

      expect(axios.get).toHaveBeenCalledWith(
        'https://api.github.com/user/following/farhan7reza7',
        expect.any(Object)
      );
    });
  });

  describe('totalFollowers', () => {
    it('should return the total number of followers', async () => {
      axios.get.mockResolvedValueOnce((url, config) => {
        if (url.includes(`/followers`)) {
          return Promise.resolve({
            data: [
              { login: 'follower1' },
              { login: 'follower2' },
              { login: 'follower3' },
            ],           
         });
      });
      
      const result = await followBack(user, token).totalFollowers();
      expect(result).toBe(3);

      expect(axios.get).toHaveBeenCalledWith(
        `https://api.github.com/users/${user}/followers`,
        expect.any(Object)
      );
    });
  });

  describe('totalFollowings', () => {
    it('should return the total number of followings', async () => {
      axios.get.mockResolvedValueOnce((url, config) => {
        if (url.includes(`/following`)) {
          return Promise.resolve({
            data: [{ login: 'following1' }, { login: 'following2' }],
         });
      });     
      
      const result = await followBack(user, token).totalFollowings();
      expect(result).toBe(2);

      expect(axios.get).toHaveBeenCalledWith(
        `https://api.github.com/users/${user}/following`,
        expect.any(Object)
      );
    });
  });

  describe('whoNotFollowingBack', () => {
    it('should return users who are not following back', async () => {

      // Mock response for followers and followings
      axios.get.mockImplementationOnce((url, config) => {
        if (url.includes('/followers')) {
          return Promise.resolve({
            data: [{ login: 'follower1' }, { login: 'following2' }],
          });
        } else if (url.includes('/following')) {
          return Promise.resolve({
            data: [{ login: 'following1' }, { login: 'following2' }],
          });
        }
      });
      
      const result = await followBack(user, token).whoNotFollowingBack();
      expect(result).toEqual(['following1']);

      expect(axios.get).toHaveBeenCalledWith(
        `https://api.github.com/users/${user}/followers`,
        expect.any(Object)
      );
      expect(axios.get).toHaveBeenCalledWith(
        `https://api.github.com/users/${user}/following`,
        expect.any(Object)
      );
    });
  });

  describe('whoFollowingBack', () => {
    it('should return users who are following back', async () => {
      // Mock response for followers and followings
      axios.get.mockImplementationOnce((url, config) => {
        if (url.includes('/followers')) {
          return Promise.resolve({
            data: [{ login: 'follower1' }, { login: 'following2' }],
          });
        } else if (url.includes('/following')) {
          return Promise.resolve({
            data: [{ login: 'following1' }, { login: 'following2' }],
          });
        }
      });
      
      const result = await followBack(user, token).whoFollowingBack();
      expect(result).toEqual(['following2']);

      expect(axios.get).toHaveBeenCalledWith(
        `https://api.github.com/users/${user}/followers`,
        expect.any(Object)
      );
      expect(axios.get).toHaveBeenCalledWith(
        `https://api.github.com/users/${user}/following`,
        expect.any(Object)
      );
    });
  });

  describe('isFollowingBack', () => {
    it('should return specific message if the user is following back', async () => {

      // Mock response for followers and followings
      axios.get.mockImplementationOnce((url, config) => {
        if (url.includes('/followers')) {
          return Promise.resolve({
            data: [{ login: 'follower1' }, { login: 'follower2' }],
          });
        } else if (url.includes('/following')) {
          return Promise.resolve({
            data: [{ login: 'follower1' }, { login: 'following2' }],
          });
        }
      });
      
      const result = await followBack(user, token).isFollowingBack('follower1');
      expect(result).toBe('Yes, follower1 following back!');

      expect(axios.get).toHaveBeenCalledWith(
        `https://api.github.com/users/${user}/followers`,
        expect.any(Object)
      );
      expect(axios.get).toHaveBeenCalledWith(
        `https://api.github.com/users/${user}/following`,
        expect.any(Object)
      );
    });

    it('should return specific message if the user is not following back', async () => {
     // Mock response for followers and followings
      axios.get.mockImplementationOnce((url, config) => {
        if (url.includes('/followers')) {
          return Promise.resolve({
            data: [{ login: 'follower1' }, { login: 'follower3' }],
          });
        } else if (url.includes('/following')) {
          return Promise.resolve({
            data: [{ login: 'follower1' }, { login: 'following2' }],
          });
        }
      });
      
      const result = await followBack(user, token).isFollowingBack('follower3');
      expect(result).toBe('No, follower3 does not following back!');

      expect(axios.get).toHaveBeenCalledWith(
        `https://api.github.com/users/${user}/followers`,
        expect.any(Object)
      );
      expect(axios.get).toHaveBeenCalledWith(
        `https://api.github.com/users/${user}/following`,
        expect.any(Object)
      );
    });
  });

  describe('unfollowNotFollowingBack', () => {
    it('should unfollow a user who is not following back', async () => {
      // Mock response for followers and followings
      axios.get.mockImplementationOnce((url, config) => {
        if (url.includes('/followers')) {
          return Promise.resolve({
            data: [{ login: 'follower1' }, { login: 'follower3' }],
          });
        } else if (url.includes('/following')) {
          return Promise.resolve({
            data: [{ login: 'follower1' }, { login: 'following2' }],
          });
        }
      });
        
      axios.delete.mockResolvedValueOnce({ status: 204 });
  
      await followBack(user, token).unfollowNotFollowingBack('following2');
      expect(axios.delete).toHaveBeenCalledTimes(0);
      expect(axios.delete).toHaveBeenCalledWith(
        `https://api.github.com/user/following/follower2`,
        expect.any(Object)
      );
  
      expect(axios.get).toHaveBeenCalledWith(
        'https://api.github.com/users/${user}/followers',
        expect.any(Object)
      );
      expect(axios.get).toHaveBeenCalledWith(
        'https://api.github.com/users/${user}/following',
        expect.any(Object)
      );
    });
  
    it('should not unfollow if the user is following back', async () => {
  
      // Mock response for followers and followings
      axios.get.mockImplementationOnce((url, config) => {
        if (url.includes('/followers')) {
          return Promise.resolve({
            data: [{ login: 'follower1' }, { login: 'follower3' }],
          });
        } else if (url.includes('/following')) {
          return Promise.resolve({
            data: [{ login: 'follower1' }, { login: 'following2' }],
          });
        }
      });
        
      axios.delete.mockResolvedValueOnce({ status: 204 });
  
      await followBack(user, token).unfollowNotFollowingBack('follower1');
      expect(axios.delete).not.toHaveBeenCalled();
  
      expect(axios.get).toHaveBeenCalledWith(
        'https://api.github.com/users/${user}/followers',
        expect.any(Object)
      );
      expect(axios.get).toHaveBeenCalledWith(
        'https://api.github.com/users/${user}/following',
        expect.any(Object)
      );
    });
  });

  describe('unfollowAllNotFollowingBack', () => {
    it('should unfollow all users who are not following back', async () => {
      // Mock response for followers and followings
      axios.get.mockImplementationOnce((url, config) => {
        if (url.includes('/followers')) {
          return Promise.resolve({
            data: [{ login: 'follower1' }, { login: 'follower2' }],
          });
        } else if (url.includes('/following')) {
          return Promise.resolve({
            data: [{ login: 'following1' }, { login: 'following2' }],
          });
        }
      });
  
      axios.delete.mockResolvedValueOnce({ status: 204 });
  
      await followBack(user, token).unfollowAllNotFollowingBack();
  
      // Ensure axios.delete was called with the correct URLs for unfollowing
      expect(axios.delete).toHaveBeenCalledTimes(2); // Assuming there are two users to unfollow
      expect(axios.delete).toHaveBeenCalledWith(
        'https://api.github.com/user/following/following1',
        expect.any(Object)
      );
      expect(axios.delete).toHaveBeenCalledWith(
        'https://api.github.com/user/following/following2',
        expect.any(Object)
      );
  
      // Ensure axios.get was called with the correct URLs for followers and followings
      expect(axios.get).toHaveBeenCalledWith(
        `https://api.github.com/users/${user}/followers`,
        expect.any(Object)
      );
      expect(axios.get).toHaveBeenCalledWith(
        `https://api.github.com/users/${user}/following`,
        expect.any(Object)
      );
    });
  
    it('should not unfollow if all users are following back', async () => {
      // Mock response for followers and followings
      axios.get.mockImplementationOnce((url, config) => {
        if (url.includes('/followers')) {
          return Promise.resolve({
            data: [{ login: 'follower1' }, { login: 'follower2' }],
          });
        } else if (url.includes('/following')) {
          return Promise.resolve({
            data: [{ login: 'follower1' }, { login: 'follower2' }],
          });
        }
      });
  
      await followBack(user, token).unfollowAllNotFollowingBack();
  
      // Ensure axios.delete was not called since all users are following back
      expect(axios.delete).not.toHaveBeenCalled();
  
      // Ensure axios.get was called with the correct URLs for followers and followings
      expect(axios.get).toHaveBeenCalledWith(
        `https://api.github.com/users/${user}/followers`,
        expect.any(Object)
      );
      expect(axios.get).toHaveBeenCalledWith(
        `https://api.github.com/users/${user}/following`,
        expect.any(Object)
      );
    });
  });  
});
