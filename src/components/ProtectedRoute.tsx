import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import {
  Box,
  Typography,
  CircularProgress,
  keyframes,
  styled,
} from "@mui/material";
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Create the pulse animation
  const pulseAnimation = keyframes`
  0%, 50% {
    opacity: 0.3;
    transform: scale(1);
  }
  25% {
    opacity: 1;
    transform: scale(1.1);
    color:rgb(15, 89, 163);
  }
`;

  // Styled component for animated letters
  const AnimatedLetter = styled("span")<{ delay: number }>`
    display: inline-block;
    animation: ${pulseAnimation} 1s infinite;
    animation-delay: ${(props) => props.delay}s;
    font-weight: bold;
  `;
  if (isLoading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography
          variant="h3"
          component="div"
          sx={{
            fontWeight: "bold",
            marginBottom: 3,
            color: "text.primary",
          }}
        >
          {"Loading...".split("").map((char, index) => (
            <AnimatedLetter key={index} delay={index * 0.1}>
              {char}
            </AnimatedLetter>
          ))}
        </Typography>

        <CircularProgress size={40} thickness={4} />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
