import { Router } from 'express';

import { getUnforkRepos } from '../controller/repos.controller';

export const repos = Router();

repos.get('/', getUnforkRepos);
