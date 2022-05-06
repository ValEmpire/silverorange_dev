import { Request, Response } from 'express';
import axios from 'axios';

const getUnforkRepos = async (_: Request, res: Response) => {
  try {
    res.header('Cache-Control', 'no-store');

    // TODO: See README.md Task (A). Return repo data here. You’ve got this!

    const githubSrcUrl = 'https://api.github.com/users/silverorange/repos';

    const response = await axios.get(githubSrcUrl);

    const repos = response.data;

    return res.status(200).json({
      repos,
    });
  } catch (err) {
    const msg = (err as Error).message;

    return res.status(400).json({
      error: msg,
    });
  }
};

export { getUnforkRepos };
