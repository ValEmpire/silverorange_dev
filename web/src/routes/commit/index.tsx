import { Box, Button, Typography } from '@mui/material';
import { useCommit } from './useCommitHook';

function CommitRoute() {
  const [commit, readMe, handleBack] = useCommit();

  return (
    <>
      <Box mb={1} pb={2}>
        <Box display="flex">
          <Typography>Author:</Typography>
          <Typography>{commit?.author}</Typography>
        </Box>
        <Box display="flex">
          <Typography>Commit Date:</Typography>
          <Typography>{commit?.commitDate}</Typography>
        </Box>
        <Box display="flex">
          <Typography>Commit Message:</Typography>
          <Typography>{commit?.message}</Typography>
        </Box>
      </Box>
      <Box>
        <Typography>ReadME</Typography>
        <Typography>{readMe}</Typography>
      </Box>

      <Button variant="contained" onClick={handleBack}>
        Back to Repos
      </Button>
    </>
  );
}

export default CommitRoute;
