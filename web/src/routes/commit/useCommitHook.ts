import { useState, useMemo, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Commit } from './commitModel';
import { useLocation, useNavigate } from 'react-router-dom';

export const useCommit = () => {
  const [commit, setCommit] = useState<Commit>();

  const [readMe, setReadMe] = useState<string>('');

  const navigate = useNavigate();

  const { search } = useLocation();

  const query = useMemo(() => new URLSearchParams(search), [search]);

  const commitUrl = query.get('commitUrl');

  /**
   * this will fetch commit from github using axios and
   * fetch readme
   */
  const getCommit = useCallback(async () => {
    try {
      const commitRes = await axios.get(commitUrl ?? '');

      // get only the latest commit
      const recentCommit = commitRes.data[0];

      // get the author name
      const author = commitUrl?.split('/')[4];

      // get the repository name
      const repoName = commitUrl?.split('/')[5];

      const fullName = `${author}/${repoName}`;

      const readMeRes = await axios.get(
        `https://raw.githubusercontent.com/${fullName}/master/README.md`
      );

      const resCommit: Commit = {
        author: recentCommit.commit.author.name,
        commitDate: recentCommit.commit.author.date,
        message: recentCommit.commit.message,
      };

      setCommit(resCommit);

      setReadMe(readMeRes.data);
    } catch (err) {
      return err;
    }
  }, [commitUrl]);

  const handleCommit = useCallback(async () => {
    await getCommit();
  }, [getCommit]);

  // this will handle back button when click
  const handleBack = () => {
    navigate('/');
  };

  // handlescommit when user is component did mount
  useEffect(() => {
    handleCommit();
  }, [handleCommit]);

  return [commit, readMe, handleBack] as const;
};
