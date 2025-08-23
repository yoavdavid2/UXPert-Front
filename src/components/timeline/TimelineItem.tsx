import { memo, useMemo } from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import { motion } from "framer-motion";

import { ITimelineItemProps } from "../../utils/types";
import { formatDate } from "../../utils/DateFormatter";
import {
  TIMELINE_ANIMATIONS,
  TIMELINE_SIZES,
} from "../../utils/timeline.constants";
import { useTimelineStyles } from "../../hooks/useTimelineStyles";

const MotionBox = motion(Box);

const TimelineItem = memo<ITimelineItemProps>(
  ({ report, index, isSelected, onSelectReport }) => {
    const isOdd = index % 2 !== 0;
    const verticalOffset = isOdd ? -TIMELINE_SIZES.verticalOffset : 0;
    const size = isSelected ? TIMELINE_SIZES.selected : TIMELINE_SIZES.default;
    const dateInfo = useMemo(
      () => formatDate(report.createdAt),
      [report.createdAt]
    );
    const isFailed = report.status === "failed";

    const { circleStyles, textColor } = useTimelineStyles({
      isSelected,
      isFailed,
      size,
    });

    return (
      <Tooltip
        title={
          <Box>
            <Typography variant="caption" display="block">
              {dateInfo.fullDate}
            </Typography>
            <Typography variant="caption" display="block">
              {dateInfo.fullTime}
            </Typography>
            <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
              Status: {report.status}
            </Typography>
          </Box>
        }
        arrow
        placement="top"
      >
        <MotionBox
          onClick={() => {
            console.log(report);
            onSelectReport(report);
          }}
          animate={{ scale: isSelected ? 1.1 : 1 }}
          whileHover={{ scale: isSelected ? 1.1 : 1.05 }}
          whileTap={{ scale: 0.6 }}
          transition={{
            duration: TIMELINE_ANIMATIONS.duration,
            ease: TIMELINE_ANIMATIONS.easing,
          }}
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
          <Box sx={circleStyles}>
            <Typography
              variant="caption"
              sx={{
                color: textColor,
                fontWeight: isSelected ? 600 : 500,
                lineHeight: 1.2,
              }}
            >
              {dateInfo.date}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: textColor,
                fontWeight: isSelected ? 600 : 400,
                fontSize: "0.65rem",
              }}
            >
              {dateInfo.time}
            </Typography>
          </Box>
        </MotionBox>
      </Tooltip>
    );
  }
);

export default TimelineItem;
