import { Box, Grid, Typography } from '@mui/material';
import { useRepos } from './useReposHook';

function ReposRoute() {
  const [repos] = useRepos();

  console.log(repos);

  return (
    <Grid container={true}>
      <Grid item={true} md={12}>
        <Box>
          <Typography variant="h4">Silver Orange Unfork Repos</Typography>
        </Box>
        {repos.map((repo) => (
          <Box key={repo.name} p={2}>
            <Box display="flex">
              <Typography variant="h6">Repository Name:</Typography>
              <Typography variant="h6">{repo.name}</Typography>
            </Box>
            <Box display="flex">
              <Typography>Description:</Typography>
              <Typography>{repo.description ?? 'No description'}</Typography>
            </Box>
          </Box>
        ))}
      </Grid>
    </Grid>
  );
}

export default ReposRoute;
