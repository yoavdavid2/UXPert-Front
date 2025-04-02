import React, { useState } from "react";
import { Card, CardContent, Typography, Box, Modal } from "@mui/material";
import { WebsiteEvaluation } from "../types/Report";

const handleClick = () => {
  console.log("Card clicked!");
};

const ResultsCard: React.FC<WebsiteEvaluation> = ({
  numeric_rating,
  category,
  text_rating,
  improvement_suggestions,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card
        sx={{
          backgroundColor: "#7E69AC",
          borderRadius: "12px",
          textAlign: "center",
          p: 2,
          width: 160,
          height: 250,
          position: "relative",
        }}
        onClick={handleOpen}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: 80,
              margin: "0 auto",
              mb: 1,
            }}
          >
            <Typography variant="h4" fontWeight={200} sx={{ color: "#7E69AC" }}>
              {numeric_rating}
            </Typography>
          </Box>
          <Typography
            variant="h4"
            color="white"
            fontWeight={400}
            sx={{ mt: 1, fontSize: "1.3rem" }}
          >
            {category}
          </Typography>
        </CardContent>
        <Typography
          variant="caption"
          color="white"
          fontWeight={100}
          sx={{
            textDecoration: "underline",
            position: "absolute",
            bottom: 5,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          View details
        </Typography>
      </Card>
      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            height: 500,
            bgcolor: "white",
            borderRadius: "12px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" sx={{ color: "#7E69AC", fontWeight: 600 }}>
            {category}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, color: "black" }}>
            {text_rating}
          </Typography>

          {improvement_suggestions.map((suggestion, index) => (
            <Box
              key={index}
              sx={{
                mt: 2,
                backgroundColor: "#f0f0f0",
                p: 2,
                borderRadius: "8px",
              }}
            >
              <Typography variant="h5" sx={{ color: "#7E69AC" }}>
                <b>{index + 1}.</b> {suggestion.improvement}
              </Typography>
              <Typography variant="h6" sx={{ color: "#7E69AC" }}>
                Importance: {suggestion.importance}{" "}
                {suggestion.importance < 5
                  ? "📛"
                  : "📛".repeat(suggestion.importance / 2)}
              </Typography>
              <Typography variant="h6" sx={{ color: "#7E69AC" }}>
                Expected Improvement: {suggestion.expected_improvement}{" "}
                {"⭐".repeat(suggestion.importance)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Modal>
    </>
  );
};

export default ResultsCard;
