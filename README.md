if-follow-package
=================

> `if-follow-package` is a `JavaScript library` that provides APIs for `managing followers and followings on GitHub`.

**`if-follow-package` allows you the following:**
- `find users who are not following you back`

- `find users who are following you back`

- `unfollow users who are not following you back`

- `check if a user is following you`

- `check if you are following a user`

- `get the exact total number of followings`

- `get the exact total number of followers`

- `and other follow control features`

[![NPM Version][npm-image]][npm-url]
[![npm-build-published][npm-ci-image]][npm-ci-url]
[![github-build-published][github-image]][github-url]
[![CI][ci-image]][ci-url]
[![License][license-image]][licence-url]
[![LinkedIn](https://img.shields.io/badge/LinkedIn-farhanReza-blue)](https://www.linkedin.com/in/farhan7reza7/)

## Table of Contents

*   [Installation](#installation)
    *   [Install from npm registry](#install-from-npm-registrypreference)
    *   [Install from Github Packages registry](#install-from-github-packages-registryrequire-authentication)
    *   [Include in html page from CDN](#include-in-html-page-from-cdn)
*   [Usage](#usage)
*   [API References](#api-references)
*   [API Documentation](#api-documentation)
*   [Contributing](#contributing)
*   [Best Practices](#best-practices)
*   [License](#license)
*   [History](#history)

Installation
------------

### Install from `npm registry`(Preference)

```bash

npm install if-follow-package
```

### Install from `Github Packages registry`(require authentication)

```bash

npm install @farhan7reza7/if-follow-package
```
##### Steps to install from `Github Packages registry`:
[See steps here](https://github.com/farhan7reza7/if-follow-package/wiki/Github-Packages-registry-Steps)

### Include in html page from `CDN`

**`OR` for version `2.1.3` and `above`**

**Can include in page `using script tag` from CDN**

```html
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.7/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/if-follow-package@2.2.0/lib/index.min.js"></script>
```

[Get any supported version script tag](https://github.com/farhan7reza7/if-follow-package/wiki/Supported-versions-script-tags)

## Usage

### `Initialize:`

```javascript
//const ifFollow = require('@farhan7reza7/if-follow-package'); //or

const ifFollow = require('if-follow-package'); // can use any if authenticated

```

**`OR` for version `2.1.3` and `above`**

**Can include in html page `using script tag` from `CDN`**

```html
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.7/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/if-follow-package@2.2.0/lib/index.min.js"></script>
```

### `Create an instance:`

```javascript
const yourUsername = 'username';  // replace with your username
const yourToken = 'access-token' // replace with your access token

const followController = ifFollow(yourUsername, yourToken);
```
**Note:** For CDN based, only **ifFollow** function name creates an instance

[See an example of using CDN based](https://github.com/farhan7reza7/if-follow-package/wiki/CDN-based-example)

##### Steps to generate access-token:
[See steps here](https://github.com/farhan7reza7/if-follow-package/wiki/token%E2%80%90generation%E2%80%90steps.md)

##### Or if already know creating token
[generate here](https://github.com/settings/tokens/new)

 
### `Use Methods to manage follow:`
<!-- ----- -->

- ##### Get a list of users who are not following you back
```javascript
const notFollowingBackList = followController.whoNotFollowingBack();

```


- ##### Get a list of users who are following you back
```javascript
const followingBackList = followController.whoFollowingBack();

```


- ##### Check if a specific user is following you back
```javascript
const isFollowingBackMessage = followController.isFollowingBack('username');

```


- ##### Unfollow a user who is not following you back
```javascript
followController.unfollowNotFollowingBack('username');

```


- ##### Unfollow all users who are not following you back
```javascript
followController.unfollowAllNotFollowingBack();

```


- ##### Check if a user is following you
```javascript
const isFollowerMessage = followController.isFollower('username');

```


- ##### Check if you are following a user
```javascript
const isFollowingMessage = followController.isFollowing('username');

```


- ##### Get the total number of followers
```javascript
const totalFollowersMessage = followController.totalFollowers();

```


- ##### Get the total number of followings
```javascript
const totalFollowingsMessage = followController.totalFollowings();

```

### `Managed Outputs (example user outputs):`
<!--  ------------------------------  -->

##### `isFollower(username)`

```javascript

// Test case: user is a follower
const result1 = followController.isFollower('farhan7reza7');

result1.then((result) => {
    console.log(result);  // Output: "Yes, farhan7reza7 follows you!"
});

// Test case: user is not a follower
const result2 = followController.isFollower('diff-ymd-package');

result2.then((result) => {
  console.log(result);  // Output: "No, diff-ymd-package does not follow you!"
});

```

##### `isFollowing(username)`

```javascript

// Test case: user is followed
const result3 = followController.isFollowing('farhan7reza7');

result3.then((result) => {
  console.log(result); // Output: "Yes, you follow farhan7reza7!"
});

// Test case: user is not followed
const result4 = followController.isFollowing('anaseem80');

result4.then((result) => {
  console.log(result);  // Output: "No, you do not follow anaseem80!"
});

```

##### `totalFollowers()`

```javascript

const result5 = followController.totalFollowers();

result5.then((result) => {
  console.log(result);  // Output: "Your total Followers: 1657"
});

```

##### `totalFollowings()`

```javascript

const result6 = followController.totalFollowings();

result6.then((result) => {
  console.log(result);  // Output: "Your total Followings: 1067`
});

```

##### `whoNotFollowingBack()`

```javascript

const result7 = followController.whoNotFollowingBack();

result7.then((result) => {
  console.log(result); // Output: ["diff-ymd-package", "Open-Sourced-Org", "username4", "usernameN"]
}); 

```

##### `whoFollowingBack()`

```javascript

const result8 = followController.whoFollowingBack();

result8.then((result) => {
  console.log(result); // Output: ["farhan7reza7", "username2", "username3", "usernameN"]
}); 

```

##### `isFollowingBack(username)`

```javascript

// Test case: user is following back
const result9 = followController.isFollowingBack('farhan7reza7');

result9.then((result) => {
  console.log(result); // Output: "Yes, farhan7reza7 following back!"
});  

// Test case: user is not following back
const result10 = followController.isFollowingBack('diff-ymd-package');

result10.then((result) => {
  console.log(result); // Output: "No, diff-ymd-package does not following back!"
}); 

```

##### `unfollowNotFollowingBack(username)`

```javascript

// Test case: unfollow a user who is not following back
const result11 = followController.unfollowNotFollowingBack('diff-ymd-package');
                 //Console Output: "Unfollowed: diff-ymd-package"

// not needed to console, because internally log message, just only call
result11.then((result) => {
  console.log(result); // Output: "undefined"
}); 

```

##### `unfollowAllNotFollowingBack()`

```javascript

// Test case: unfollow all users who are not following back
const result12 = followController.unfollowAllNotFollowingBack();
                 /* Console Output: "Unfollowed: Open-Sourced-Org"
                                    "Unfollowed: username2"
                                    "Unfollowed: username3"
                                    "Unfollowed: usernameN"*/
     
// not return anything, and internally log message, just only call
result12.then((result) => {
  console.log(result); // Output: "undefined"
});       
 
```


## API References
**if-follow-package**
* [Classes](#api-documentation)
  *   [IfFollow](#iffollow)
      *   [Create an instance of IfFollow:](#create-an-instance-of-iffollow)
      *   [Methods:](#methods)
            *   [isFollower(username)](#isfollowerusername-1)
            *   [isFollowing(username)](#isfollowingusername-1)
            *   [totalFollowers()](#totalfollowers-1)
            *   [totalFollowings()](#totalfollowings-1)
            *   [whoNotFollowingBack()](#whonotfollowingback-1)
            *   [whoFollowingBack()](#whofollowingback-1)
            *   [isFollowingBack(username)](#isfollowingbackusername-1)
            *   [unfollowNotFollowingBack(username)](#unfollownotfollowingbackusername-1)
            *   [unfollowAllNotFollowingBack()](#unfollowallnotfollowingback-1)

API Documentation
-----------------

### `IfFollow`

Represents a class for managing followers and followings on GitHub.

#### Initialize:

```javascript

const ifFollow = require('if-follow-package');
```

##### ifFollow is a function which creates an instance of IfFollow

#### Create an instance of `IfFollow`:

```javascript

const followController = ifFollow(yourUsername, yourToken);
```

*   **`yourUsername`**: Your GitHub username.
    
*   **`yourToken`**: Your GitHub personal access token.
    
*   **`Returns:`** An object containing functions to interact with followers and followings on Github.
    

### `Methods:`

- #### `isFollower(username)`

Check if a user is following you.

```javascript

const isFollowerMessage = followController.isFollower('username');

```
   **`username`**: The username of the user you want to check.
    
   **`Returns:`** A message indicating if the user is following you.
    

- #### `isFollowing(username)`

Check if you are following a user.

```javascript

const isFollowingMessage = followController.isFollowing('username');

```

   **`username`**: The username of the user you want to check.
    
   **`Returns:`** A message indicating if you are following the user.
    

- #### `totalFollowers()`

Get the total number of followers.

```javascript

const totalFollowersMessage = followController.totalFollowers();
```

   **`Returns:`** A message with the total number of followers.

- #### `totalFollowings()`

Get the total number of followings.

```javascript

const totalFollowingsMessage = followController.totalFollowings();
```

   **`Returns:`** A message with the total number of followings.

- #### `whoNotFollowingBack()`

Get a list of users who are not following you back.

```javascript

const notFollowingBackList = followController.whoNotFollowingBack();
```

   **`Returns:`** An array of usernames who are not following you back.

- #### `whoFollowingBack()`

Get a list of users who are following you back.

```javascript

const followingBackList = followController.whoFollowingBack();
```

   **`Returns:`** An array of usernames who are following you back.

- #### `isFollowingBack(username)`

Check if a specific user is following you back.

```javascript

const isFollowingBackMessage = followController.isFollowingBack('username');
```

   **`username`**: The username of the user you want to check.
    
   **`Returns:`** A message indicating if the user is following you back.
    

- #### `unfollowNotFollowingBack(username)`

Unfollow a user who is not following you back.

```javascript

followController.unfollowNotFollowingBack('username');
```
   **`username`**: The username of the user you want to unfollow.

   **`Returns:`**  {Promise<void>} A promise that resolves once the user is unfollowed.

   **Special case:** It outputs message in console/terminal indicating which user unfollowed 

- #### `unfollowAllNotFollowingBack()`

Unfollow all users who are not following you back.

```javascript

followController.unfollowAllNotFollowingBack();
```
   **`Returns:`** {Promise<void>} A promise that resolves once all users are unfollowed.

   **Special case:** It outputs messages in console/terminal indicating which users unfollowed 

### `For more information:`
[See `if-follow-package Documentation`](https://farhan7reza7.github.io/if-follow-package/global.html)

Contributing
------------

If you find any issues or have suggestions for improvement, please open an issue or create a pull request on the GitHub repository.

[See CONTRIBUTING guidelines](CONTRIBUTING.md) for more information.

Best Practices:
---------------

### The code adheres to recommended practices for readability and maintainability, including:

*   Meaningful variable and function names for clarity.
*   Clear and concise comments to enhance understanding.
*   Proper indentation and formatting for visual organization.

[See mdn guidelines](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Writing_style_guide/Code_style_guide/JavaScript) for more information.

License
-------

This project is licensed under the MIT License - see the LICENSE file for details.

[See License](https://github.com/farhan7reza7/if-follow-package/blob/main/LICENSE)

History
-------

For more details about what has changed in each version of this project.  

[See CHANGELOG](CHANGELOG.md)

[npm-image]: https://img.shields.io/npm/v/if-follow-package
[npm-url]: https://www.npmjs.com/package/if-follow-package
[npm-ci-image]: https://github.com/farhan7reza7/if-follow-package/actions/workflows/npm-publish-npm-registry.yml/badge.svg
[npm-ci-url]: https://github.com/farhan7reza7/if-follow-package/actions/workflows/npm-publish-npm-registry.yml
[github-image]: https://github.com/farhan7reza7/if-follow-package/actions/workflows/npm-publish-github-packages.yml/badge.svg
[github-url]: https://github.com/farhan7reza7/if-follow-package/actions/workflows/npm-publish-github-packages.yml
[ci-image]: https://github.com/farhan7reza7/if-follow-package/actions/workflows/pages/pages-build-deployment/badge.svg?branch=main
[ci-url]: https://github.com/farhan7reza7/if-follow-package/actions/workflows/pages/pages-build-deployment
[license-image]: https://img.shields.io/github/license/farhan7reza7/if-follow-package
[licence-url]: https://opensource.org/licenses/MIT
