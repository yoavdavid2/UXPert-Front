import {
  Box,
  Typography,
  CircularProgress,
  List,
  ListItem,
  IconButton,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import { Delete } from "@mui/icons-material";
import { IProfileProjectsListProps } from "../../utils/types";

const ProfileProjectsList = ({
  projects,
  loading,
  selectedProject,
  onProjectSelect,
  handleDeleteClick,
}: IProfileProjectsListProps) => {
  return (
    <Box
      sx={{
        flex: 1,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="overline"
        sx={{
          px: 3,
          pt: 3,
          pb: 1,
          color: "rgba(26, 35, 126, 1)",
          fontWeight: 600,
          letterSpacing: 1,
        }}
      >
        Your Projects
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
          <CircularProgress size={24} sx={{ color: "rgba(26, 35, 126, 1)" }} />
        </Box>
      ) : (
        <List className="sidebar-scroll-container" sx={{ py: 0 }}>
          {projects?.map((project) => (
            <ListItem
              key={project._id}
              disablePadding
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={(e) => handleDeleteClick(e, project)}
                  sx={{
                    color: "rgba(26, 35, 126, 0.6)",
                    "&:hover": {
                      color: "error.main",
                    },
                  }}
                >
                  <Delete />
                </IconButton>
              }
            >
              <ListItemButton
                selected={selectedProject?._id === project._id}
                onClick={() => onProjectSelect(project)}
                sx={{
                  borderLeft: "4px solid transparent",
                  transition: "all 0.2s ease",
                  pr: 6,
                  "&.Mui-selected": {
                    borderLeftColor: "rgba(26, 35, 126, 1)",
                    bgcolor: "rgba(26, 35, 126, 0.2)",
                    "&:hover": {
                      bgcolor: "rgba(26, 35, 126, 0.3)",
                    },
                  },
                  "&:hover": {
                    bgcolor: "#F5F0FF",
                  },
                }}
              >
                <ListItemText
                  primary={project.url || project.name || "Unnamed Project"}
                  primaryTypographyProps={{
                    sx: {
                      fontWeight:
                        selectedProject?._id === project._id ? 600 : 400,
                      color:
                        selectedProject?._id === project._id
                          ? "rgba(26, 35, 126, 1)"
                          : "rgba(26, 35, 126, 0.8)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};
export default ProfileProjectsList;
