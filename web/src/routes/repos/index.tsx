import { Box } from '@mui/material';
import { useRepos } from './useReposHook';

function ReposRoute() {
  const [repos] = useRepos();

  console.log(repos);

  return <Box>Homepage</Box>;
}

export default ReposRoute;
