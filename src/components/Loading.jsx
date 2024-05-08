import { Box, CircularProgress, LinearProgress } from "@mui/material";

const LoadingProgress = () => {
  return (
    <>
      <LinearProgress />
      <Box
        sx={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          height: "100vh",
        }}
      >
        <CircularProgress size={300} />
      </Box>
    </>
  );
};

export default LoadingProgress;
