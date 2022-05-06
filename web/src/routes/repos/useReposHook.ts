import { useState, useEffect, useCallback } from 'react';
import { Repo } from './reposModel';
import { axios } from '../../axios';

export const useRepos = () => {
  const [repos, setRepos] = useState<Repo[]>([]);

  const getRepos = async () => {
    try {
      const res = await axios.get('repos');

      const resRepos = res.data.repos;

      return resRepos;
    } catch (err) {
      return err;
    }
  };

  const handleRepos = useCallback(async () => {
    try {
      const resRepos = await getRepos();

      resRepos.sort(
        (a: Repo, b: Repo) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      setRepos(resRepos);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    handleRepos();
  }, [handleRepos]);

  return [repos];
};
