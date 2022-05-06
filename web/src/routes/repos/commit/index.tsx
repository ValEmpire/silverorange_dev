import { Box, Button } from '@mui/material';
import { useCommit } from './useCommitHook';

function CommitRoute() {
  const [commit] = useCommit();

  console.log(commit);

  return (
    <Box>
      <Button>Back</Button>
    </Box>
  );
}

export default CommitRoute;
