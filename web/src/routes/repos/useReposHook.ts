import { useState, useEffect, useCallback } from 'react';
import { Repo } from './reposModel';
import { axios } from '../../axios';

export const useRepos = () => {
  const [repos, setRepos] = useState<Repo[]>([]);

  const [origRepos, setOrigRepos] = useState<Repo[]>([]);

  const [languages, setLanguages] = useState<string[]>([]);

  const getRepos = async () => {
    try {
      const res = await axios.get('repos');

      const resRepos = res.data.repos;

      return resRepos;
    } catch (err) {
      return err;
    }
  };

  const getAllLanguages = (repositories: Repo[]): string[] => {
    const res: string[] = [];

    for (const repository of repositories) {
      const repoLanguage = repository.language;

      if (!res.includes(repoLanguage)) {
        res.push(repoLanguage);
      }
    }

    return res;
  };

  const handleRepos = useCallback(async () => {
    try {
      const resRepos = await getRepos();

      resRepos.sort(
        (a: Repo, b: Repo) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      setRepos(resRepos);

      setOrigRepos(resRepos);

      const allReposLanguages = getAllLanguages(resRepos);

      setLanguages(allReposLanguages);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleFilter = (filter: string) => {
    const filterArr: Repo[] = [...origRepos];

    const filteredRepo = filterArr.filter((repo) => repo.language === filter);

    setRepos(filteredRepo);
  };

  useEffect(() => {
    handleRepos();
  }, [handleRepos]);

  return [repos, languages, handleFilter] as const;
};
