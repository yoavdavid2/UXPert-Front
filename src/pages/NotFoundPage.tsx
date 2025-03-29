import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        flexDirection: "column",
      }}
      className="page-layout"
    >
      <Typography variant="h3" component="h1" color="black" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" mb={4} color="black">
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to="/"
        sx={{
          bgcolor: "#1a237e",
          color: "white",
          borderRadius: 8,
          px: 4,
          py: 1.5,
          textTransform: "none",
          "&:hover": {
            bgcolor: "#0d1642",
          },
        }}
      >
        Return to Homepage
      </Button>
    </Box>
  );
};

export default NotFoundPage;
