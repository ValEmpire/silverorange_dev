export interface User {
  login: string;
  id: number;
  avatarUrl: string;
  gravatarId: string;
  url: string;
  htmlUrl: string;
  followersUrl: string;
  followingUrl: string;
  gistsUrl: string;
  starredUrl: string;
  subscriptionsUrl: string;
  organizationsUrl: string;
  reposUrl: string;
  eventsUrl: string;
  receivedEventsUrl: string;
  type: string;
  siteAdmin: boolean;
}

export interface Repo {
  id: number;
  name: string;
  fullName: string;
  owner: User;
  private: boolean;
  htmlUrl: string;
  description: string;
  fork: boolean;
  url: string;
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
  gitUrl: string;
  sshUrl: string;
  cloneUrl: string;
  svnUrl: string;
  homepage: string;
  size: number;
  stargazersCount: number;
  watchersCount: number;
  language: string;
  forksCount: number;
  forks: number;
  commitsUrl: string;
  defaultBranch: string;
}
