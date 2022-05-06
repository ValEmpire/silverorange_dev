import { Repo } from './../models/Repo';
import { Request, Response } from 'express';
import axios from 'axios';

const getUnforkRepos = async (_: Request, res: Response) => {
  try {
    res.header('Cache-Control', 'no-store');

    // TODO: See README.md Task (A). Return repo data here. You’ve got this!

    const githubSrcUrl = 'https://api.github.com/users/silverorange/repos';

    // fetch all repos
    const response = await axios.get(githubSrcUrl);

    const allRepos = response.data;

    // get only unforked repos
    const allUnForkedRepos = allRepos.filter((repo: Repo) => !repo.fork);

    res.setHeader('Content-Type', 'application/json');

    return res.status(200).json({
      repos: allUnForkedRepos,
    });
  } catch (err) {
    const msg = (err as Error).message;

    return res.status(400).json({
      error: msg,
    });
  }
};

export { getUnforkRepos };
