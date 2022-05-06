import { useState, useEffect } from 'react';
import { Repo } from './reposModel';
import { axios } from '../../axios';

export const useRepos = () => {
  const [repos, setRepos] = useState<Repo[]>([]);

  const getRepos = async () => {
    try {
      const res = await axios.get('repos');

      const resRepos = res.data;

      setRepos(resRepos);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRepos();
  }, []);

  return [repos];
};
