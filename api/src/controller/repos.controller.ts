import { Repo } from './../models/Repo';
import { Request, Response } from 'express';
import axios from 'axios';
import cachedRepos from '../../data/repos.json';
// import fs from 'fs';
// import path from 'path';

/**
 * The provided JSON file (in api/data/repos.json). Assume this file can change while the service is running.
 * I assume this means we will cach the repos so we dont have to fetch to github everytime
 */

let updatedRepos = false;

const getUnforkRepos = async (_: Request, res: Response) => {
  try {
    res.header('Cache-Control', 'no-store');
    // set header
    res.setHeader('Content-Type', 'application/json');

    // TODO: See README.md Task (A). Return repo data here. You’ve got this!

    // check if cached repos is udpated
    if (updatedRepos) {
      return res.status(200).json({
        repos: cachedRepos,
      });
    } else {
      const githubSrcUrl = 'https://api.github.com/users/silverorange/repos';

      // fetch all repos
      const response = await axios.get(githubSrcUrl);

      const allRepos = response.data;

      // get only unforked repos
      const allUnForkedRepos = allRepos.filter((repo: Repo) => !repo.fork);

      // update to true
      updatedRepos = true;

      // have a problem caching and writing to this file as the server restarts when
      // it detects changes in repos.json
      // fs.writeFileSync(
      //   path.join(__dirname, '../../data/repos.json'),
      //   JSON.stringify(allUnForkedRepos)
      // );

      return res.status(200).json({
        repos: allUnForkedRepos,
      });
    }
  } catch (err) {
    const msg = (err as Error).message;

    return res.status(400).json({
      error: msg,
    });
  }
};

export { getUnforkRepos };
