import { useState, useEffect, useCallback } from 'react';
import { Repo } from './reposModel';
import { axios } from '../../axios';

export const useRepos = () => {
  const [repos, setRepos] = useState<Repo[]>([]);

  const [origRepos, setOrigRepos] = useState<Repo[]>([]);

  const [languages, setLanguages] = useState<string[]>([]);

  /**
   *
   * @returns return repos from axios get from github | error if found
   */
  const getRepos = async () => {
    try {
      const res = await axios.get('repos');

      const resRepos = res.data.repos;

      return resRepos;
    } catch (err) {
      return err;
    }
  };

  /**
   *
   * @param repositories Repo
   * @returns array of strings
   */
  const getAllLanguages = (repositories: Repo[]): string[] => {
    const res: string[] = [];

    // iterate all repositiries and get all language
    for (const repository of repositories) {
      const repoLanguage = repository.language;

      if (!res.includes(repoLanguage)) {
        res.push(repoLanguage);
      }
    }

    return res;
  };

  /**
   * this will handle all repos hooks
   */
  const handleRepos = useCallback(async () => {
    try {
      const resRepos = await getRepos();

      // this will sort repos to reverse chronological
      resRepos.sort(
        (a: Repo, b: Repo) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      // create two repos
      setRepos(resRepos);

      // this will make sure that we will not modify repos when filtering
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

  // handlerepos when component did mount
  useEffect(() => {
    handleRepos();
  }, [handleRepos]);

  return [repos, languages, handleFilter] as const;
};
