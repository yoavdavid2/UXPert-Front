import { useMemo } from "react";
import { TIMELINE_COLORS } from "../utils/timeline.constants";

interface UseTimelineStylesProps {
  isSelected: boolean;
  isFailed: boolean;
  size: number;
}

export const useTimelineStyles = ({
  isSelected,
  isFailed,
  size,
}: UseTimelineStylesProps) => {
  const circleStyles = useMemo(() => {
    const baseStyles = {
      width: size,
      height: size,
      borderRadius: "50%",
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "center",
      alignItems: "center",
      transition: "all 0.2s ease-in-out",
      cursor: "pointer",
    };

    if (isSelected) {
      return {
        ...baseStyles,
        bgcolor: isFailed ? TIMELINE_COLORS.error : TIMELINE_COLORS.success,
        border: `3px solid ${
          isFailed ? TIMELINE_COLORS.errorBorder : TIMELINE_COLORS.primary
        }`,
        boxShadow: `0 0 15px ${
          isFailed ? "rgba(167, 81, 81, 0.5)" : "rgba(87, 81, 167, 0.5)"
        }`,
      };
    }

    return {
      ...baseStyles,
      bgcolor: "white",
      border: `3px solid ${
        isFailed ? TIMELINE_COLORS.errorUnselected : "rgba(26, 35, 126, 0.7)"
      }`,
      boxShadow: "0 0 8px rgba(126, 105, 172, 0.2)",
    };
  }, [isSelected, isFailed, size]);

  const textColor = useMemo(
    () => (isSelected ? "white" : TIMELINE_COLORS.secondary),
    [isSelected]
  );

  const getContainerStyles = useMemo(
    () => (hasMultipleReports: boolean) => ({
      display: "flex",
      justifyContent: hasMultipleReports ? "flex-start" : "space-around",
      gap: hasMultipleReports ? 4 : 0,
      position: "relative" as const,
      zIndex: 1,
      overflowX: hasMultipleReports ? "auto" : "visible",
      overflowY: "visible" as const,
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
        "&:hover": {
          bgcolor: "rgba(26, 35, 126, 0.7)",
        },
      },
    }),
    []
  );

  return {
    circleStyles,
    textColor,
    getContainerStyles,
  };
};
