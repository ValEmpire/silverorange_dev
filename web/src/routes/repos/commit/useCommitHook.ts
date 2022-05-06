import { useState, useEffect, useCallback } from 'react';
import { axios } from '../../../axios';
import { Commit } from './commitModel';
import { useLocation } from 'react-router-dom';
import { useRepos } from '../useReposHook';

export const useCommit = () => {
  const [commit, setCommit] = useState<Commit>();

  const [repos] = useRepos();

  const location = useLocation();

  const getCommit = useCallback(async () => {
    try {
      const repoId = +location.pathname;

      const clickedRepo = repos.find((repo) => repo.id === repoId) ?? {
        commits_url: '',
      };

      const res = await axios(clickedRepo.commits_url);

      const recentCommit = res.data[0];

      const resCommit: Commit = {
        author: recentCommit.commit.author.name,
        commit_date: recentCommit.commit.author.date,
        message: recentCommit.commit.message,
      };

      setCommit(resCommit);
    } catch (err) {
      return err;
    }
  }, [location.pathname, repos]);

  const handleCommit = useCallback(async () => {
    await getCommit();
  }, [getCommit]);

  useEffect(() => {
    handleCommit();
  }, [handleCommit]);

  return [commit];
};
