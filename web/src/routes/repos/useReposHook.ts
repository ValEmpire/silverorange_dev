import { useState, useEffect } from 'react';
import { Repo } from './reposModel';
import axios from 'axios';

export const useRepos = () => {
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {}, []);

  return [repos];
};
