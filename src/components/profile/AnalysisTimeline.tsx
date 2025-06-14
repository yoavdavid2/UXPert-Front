import { Box, Typography, CircularProgress, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import { IAnalysisTimelineProps } from "../../utils/types";

const MotionBox = motion(Box);

const AnalysisTimeline = ({
  reports,
  selectedReport,
  onSelectReport,
  loading,
}: IAnalysisTimelineProps) => {
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
        <CircularProgress size={32} sx={{ color: "#9C6ADE" }} />
      </Box>
    );
  }

  if (reports.length === 0) {
    return (
      <Typography
        variant="body2"
        sx={{ color: "#7E69AC", textAlign: "center", py: 4 }}
      >
        No analyses yet for this project. Click "New Analysis" to start.
      </Typography>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return {
      date: `${day}/${month}`,
      time: `${hours}:${minutes}`,
      fullDate: date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      fullTime: date.toLocaleTimeString("he-IL", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  return (
    <Box sx={{ position: "relative", py: 2, overflow: "visible" }}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          height: 3,
          bgcolor: "rgba(26, 35, 126, 0.3)",
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: reports.length <= 5 ? "space-around" : "flex-start",
          gap: reports.length > 5 ? 4 : 0,
          position: "relative",
          zIndex: 1,
          overflowX: reports.length > 5 ? "auto" : "visible",
          overflowY: "visible",
          pb: 3,
          pt: 2,
          "&::-webkit-scrollbar": {
            height: 6,
          },
          "&::-webkit-scrollbar-track": {
            bgcolor: "rgba(26, 35, 126, 0.1)",
            borderRadius: 3,
          },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "rgba(26, 35, 126, 0.5)",
            borderRadius: 3,
          },
        }}
      >
        {reports.map((report, index) => {
          const isSelected = selectedReport?._id === report._id;
          // Move every second circle up slightly for a wave effect
          const isOdd = index % 2 !== 0;
          const verticalOffset = isOdd ? -8 : 0;
          const size = isSelected ? 82 : 72;
          const dateInfo = formatDate(report.createdAt);

          return (
            <Tooltip
              key={report._id}
              title={
                <Box>
                  <Typography variant="caption" display="block">
                    {dateInfo.fullDate}
                  </Typography>
                  <Typography variant="caption" display="block">
                    {dateInfo.fullTime}
                  </Typography>
                  <Typography
                    variant="caption"
                    display="block"
                    sx={{ mt: 0.5 }}
                  >
                    Status: {report.status}
                  </Typography>
                </Box>
              }
              arrow
              placement="top"
            >
              <MotionBox
                onClick={() => onSelectReport(report)}
                animate={{ scale: isSelected ? 1.1 : 1 }}
                whileHover={{ scale: isSelected ? 1.1 : 1.05 }}
                transition={{ duration: 0.2 }}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                  cursor: "pointer",
                  top: `${verticalOffset}px`,
                  minWidth: 150,
                }}
              >
                <Box
                  sx={{
                    width: size,
                    height: size,
                    borderRadius: "50%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    transition: "all 0.2s ease",
                    bgcolor: isSelected ? "rgba(26, 35, 126, 0.95)" : "white",
                    border: `3px solid ${
                      isSelected
                        ? "rgba(26, 35, 126, 1)"
                        : "rgba(26, 35, 126, 0.7)"
                    }`,
                    boxShadow: isSelected
                      ? "0 0 15px rgba(87, 81, 167, 0.5)"
                      : "0 0 8px rgba(126, 105, 172, 0.2)",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: isSelected ? "white" : "#7E69AC",
                      fontWeight: isSelected ? 600 : 500,
                      lineHeight: 1.2,
                    }}
                  >
                    {dateInfo.date}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: isSelected ? "white" : "#7E69AC",
                      fontWeight: isSelected ? 600 : 400,
                      fontSize: "0.65rem",
                    }}
                  >
                    {dateInfo.time}
                  </Typography>
                </Box>
                {isSelected && (
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 1,
                      fontWeight: 600,
                      color: "rgba(26, 35, 126)",
                    }}
                  >
                    Selected
                  </Typography>
                )}
              </MotionBox>
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
};

export default AnalysisTimeline;
