interface IfFollow {
  isFollower(username: string): Promise<boolean>;
  isFollowing(username: string): Promise<boolean>;
  totalFollowers(): Promise<number>;
  totalFollowings(): Promise<number>;
  whoNotFollowingBack(): Promise<string[]>;
  whoFollowingBack(): Promise<string[]>;
  isFollowingBack(username: string): Promise<boolean>;
  unfollowNotFollowingBack(username: string): Promise<void>;
  unfollowAllNotFollowingBack(): Promise<void>;
}

/**
 * Creates an instance of the IfFollow type.
 *
 * @param yourUsername - Your GitHub username.
 * @param yourToken - Your GitHub personal access token.
 * @returns {IfFollow} An object to manage followers and followings.
 */
declare function ifFollow(yourUsername: string, yourToken: string): IfFollow;

export = ifFollow;
