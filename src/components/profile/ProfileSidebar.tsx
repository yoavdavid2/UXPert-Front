import React, { useState, useEffect } from "react";
import {
  Box,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

import { getFullName } from "../../utils/UserProfileUtils";
import { IProfileSidebarProps, ProjectDto } from "../../utils/types";
import { projectService } from "../../services/projectService";

const ProfileSidebar = ({
  userProfile,
  selectedProject,
  onProjectSelect,
}: IProfileSidebarProps) => {
  const [projects, setProjects] = useState<ProjectDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<ProjectDto | null>(
    null
  );

  useEffect(() => {
    fetchProjects();
  }, [userProfile.id]);

  const fetchProjects = async () => {
    try {
      setLoading(true);

      const result = await projectService.getUserProjects(userProfile.id);
      setProjects(result.projects);

      if (result.projects.length > 0 && !selectedProject) {
        onProjectSelect(result.projects[0]);
      }
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (event: React.MouseEvent, project: ProjectDto) => {
    event.stopPropagation();
    setProjectToDelete(project);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!projectToDelete) return;

    try {
      await projectService.deleteProject(projectToDelete._id);

      setProjects(projects.filter((p) => p._id !== projectToDelete._id));

      if (selectedProject?._id === projectToDelete._id) {
        const remainingProjects = projects.filter(
          (p) => p._id !== projectToDelete._id
        );
        if (remainingProjects.length > 0) {
          onProjectSelect(remainingProjects[0]);
        } else {
          onProjectSelect(null);
        }
      }
    } catch (error) {
      console.error("Failed to delete project:", error);
    } finally {
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setProjectToDelete(null);
  };

  return (
    <Box
      sx={{
        width: 280,
        flexShrink: 0,
        bgcolor: "#F9F7FF",
        borderRight: "1px solid #E7E1F2",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "relative",
        zIndex: 10,
        boxShadow: "2px 0 10px rgba(0,0,0,0.05)",
      }}
    >
      {/* User Profile */}
      <Box
        sx={{
          py: 4,
          px: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderBottom: "1px solid #E7E1F2",
        }}
      >
        <Avatar
          src={userProfile.profileImage || undefined}
          alt={getFullName(userProfile)}
          sx={{
            width: 80,
            height: 80,
            bgcolor: "rgba(26, 35, 126, 0.8)",
            fontSize: "2rem",
            fontWeight: "light",
            mb: 2,
            boxShadow: "0 4px 12px rgba(165, 148, 195, 0.3)",
          }}
        >
          {getFullName(userProfile).charAt(0)}
        </Avatar>
        <Typography
          variant="h6"
          sx={{ fontWeight: 500, color: "rgba(26, 35, 126, 1)", mb: 0.5 }}
        >
          {getFullName(userProfile)}
        </Typography>
        <Typography variant="body2" sx={{ color: "rgba(26, 35, 126, 1)" }}>
          {userProfile.email || "No email provided"}
        </Typography>
      </Box>

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
          YOUR PROJECTS
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
            <CircularProgress
              size={24}
              sx={{ color: "rgba(26, 35, 126, 1)" }}
            />
          </Box>
        ) : (
          <List className="sidebar-scroll-container" sx={{ py: 0 }}>
            {projects.map((project) => (
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

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">Delete Project</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "
            {projectToDelete?.url || projectToDelete?.name || "Unnamed Project"}
            "? This will permanently delete the project and all its analyses.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfileSidebar;
