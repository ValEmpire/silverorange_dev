import { Request, Response } from 'express';

const getUnforkRepos = async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  res.json([]);
};

export { getUnforkRepos };
