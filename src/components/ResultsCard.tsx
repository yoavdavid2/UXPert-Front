import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

interface ResultsCardProps {
  score: number;
  category: string;
}

const handleClick = () => {
    console.log("Card clicked!");
}

const ResultsCard: React.FC<ResultsCardProps> = ({ score, category }) => {
  return (
    <Card sx={{ backgroundColor: "#7E69AC", borderRadius: "12px", textAlign: "center", p: 2, width: 160, height: 200 }} onClick={handleClick}>
      <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: '100%',
            height: 80,
            margin: "0 auto",
            mb: 1,
          }}
        >
          <Typography variant="h4" fontWeight={200} sx={{ color: '#7E69AC'}}>
            {score}
          </Typography>
        </Box>
        <Typography variant="h5" color="white" fontWeight={400} sx={{ mt: 1 }}>
          {category}
        </Typography>
        <Typography variant="caption" color="white" fontWeight={100} sx={{ mt: 4, textDecoration: "underline" }}>
          View details
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ResultsCard;
