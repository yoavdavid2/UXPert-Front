import React from "react";
import { Box, LinearProgress } from "@mui/material";
import { motion } from "framer-motion";

import LogoSvg from "../../assets/FullLogo.svg";
import { IAnimatedModal } from "../../utils/types";

const AnimatedModal: React.FC<IAnimatedModal> = ({ currentText }) => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      sx={{
        minHeight: "50%",
        minWidth: "50%",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        gap: "20px",
        border: "1px solid black",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <motion.img
        src={LogoSvg}
        alt="Loading"
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
        style={{ width: 230, height: 100 }}
      />

      <Box mt={2} sx={{ width: "100%", maxWidth: 300, marginTop: "10%" }}>
        <LinearProgress />
      </Box>

      <Box
        mt={2}
        sx={{ textAlign: "center", fontSize: "1.1rem", color: "text.primary" }}
      >
        {currentText}
      </Box>
    </Box>
  );
};

export default AnimatedModal;
