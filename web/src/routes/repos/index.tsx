import { Box, Button, Grid, Typography } from '@mui/material';
import { useRepos } from './useReposHook';
import { Link } from 'react-router-dom';

function ReposRoute() {
  const [repos, languages, handleFilter] = useRepos();

  console.log(repos);

  return (
    <Grid container={true}>
      <Grid item={true} md={12}>
        <Box>
          <Typography variant="h4">Silver Orange Unfork Repos</Typography>
        </Box>

        <Box display={'flex'}>
          <Typography variant="h6">Filter:</Typography>
          {languages.map((language) => (
            <Box key={language} ml={1} mr={1}>
              <Button
                variant="contained"
                size="small"
                onClick={() => handleFilter(language)}
              >
                {language}
              </Button>
            </Box>
          ))}
        </Box>

        {repos.map((repo) => (
          <Box key={repo.name} p={2}>
            <Box display="flex">
              <Typography variant="h6">Repository Name:</Typography>
              <Link
                to={`commit/?commitUrl=${repo.commits_url.replace(
                  '{/sha}',
                  ''
                )}`}
              >
                {repo.name}
              </Link>
            </Box>
            <Box display="flex">
              <Typography>Description:</Typography>
              <Typography>{repo.description ?? 'No description'}</Typography>
            </Box>
            <Box display="flex">
              <Typography>Language:</Typography>
              <Typography>{repo.language}</Typography>
            </Box>
            <Box display="flex">
              <Typography>Forks Count:</Typography>
              <Typography>{repo.forks_count}</Typography>
            </Box>
          </Box>
        ))}
      </Grid>
    </Grid>
  );
}

export default ReposRoute;
