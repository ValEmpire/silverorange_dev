import { Request, Response } from 'express';

const getUnforkRepos = async (_: Request, res: Response) => {
  try {
    res.header('Cache-Control', 'no-store');

    res.status(200);

    // TODO: See README.md Task (A). Return repo data here. You’ve got this!

    res.json([]);
  } catch (err) {
    const msg = (err as Error).message;

    return res.status(400).json({
      error: msg,
    });
  }
};

export { getUnforkRepos };
