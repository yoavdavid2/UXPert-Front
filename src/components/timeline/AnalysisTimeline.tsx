import { Box } from "@mui/material";
import { IAnalysisTimelineProps } from "../../utils/types";
import TimelineItem from "./TimelineItem";
import { useMemo } from "react";
import { useTimelineStyles } from "../../hooks/useTimelineStyles";
import LoadingState from "./LoadingState";
import EmptyState from "./EmptyState";

const AnalysisTimeline = ({
  reports,
  selectedReport,
  onSelectReport,
  loading,
}: IAnalysisTimelineProps) => {
  const hasMultipleReports = reports.length > 5;
  const { getContainerStyles } = useTimelineStyles({
    isSelected: false,
    isFailed: false,
    size: 0,
  });

  const timelineContainerStyles = useMemo(
    () => getContainerStyles(hasMultipleReports),
    [getContainerStyles, hasMultipleReports]
  );

  if (loading) return <LoadingState />;
  if (reports.length === 0) return <EmptyState />;

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
          borderRadius: "45%",
          zIndex: 0,
        }}
      />

      <Box sx={timelineContainerStyles}>
        {reports.map((report, index) => {
          return (
            <TimelineItem
              key={report._id}
              report={report}
              index={index}
              isSelected={selectedReport?._id === report._id}
              onSelectReport={onSelectReport}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default AnalysisTimeline;
