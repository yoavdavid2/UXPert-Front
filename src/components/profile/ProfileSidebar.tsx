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
} from "@mui/material";
import { UserProfile, getFullName } from "../../types/UserProfile";
import { ProjectDto } from "../../utils/types";
import { projectService } from "../../services/projectService";

interface ProfileSidebarProps {
  userProfile: UserProfile;
  selectedProject: ProjectDto | null;
  onProjectSelect: (project: ProjectDto | null) => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  userProfile,
  selectedProject,
  onProjectSelect,
}) => {
  const [projects, setProjects] = useState<ProjectDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, [userProfile.id]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      console.log("Fetching projects for user:", userProfile.id);
      
      const result = await projectService.getUserProjects(userProfile.id);
      console.log("Fetched projects:", result.projects);
      
      setProjects(result.projects);
      
      // Auto-select first project if none selected
      if (result.projects.length > 0 && !selectedProject) {
        console.log("Auto-selecting first project:", result.projects[0]);
        onProjectSelect(result.projects[0]);
      }
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoading(false);
    }
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

      {/* Projects List */}
      <Box sx={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
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
            <CircularProgress size={24} sx={{ color: "rgba(26, 35, 126, 1)" }} />
          </Box>
        ) : (
          <List sx={{ flex: 1, overflow: "auto", py: 0 }}>
            {projects.map((project) => (
              <ListItem key={project.projectId} disablePadding>
                <ListItemButton
                  selected={selectedProject?.projectId === project.projectId}
                  onClick={() => onProjectSelect(project)}
                  sx={{
                    borderLeft: "4px solid transparent",
                    transition: "all 0.2s ease",
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
                        fontWeight: selectedProject?.projectId === project.projectId ? 600 : 400,
                        color: selectedProject?.projectId === project.projectId ? "rgba(26, 35, 126, 1)" : "rgba(26, 35, 126, 0.8)",
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
    </Box>
  );
};

export default ProfileSidebar;