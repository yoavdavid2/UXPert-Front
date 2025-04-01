import React from "react";
import {
  Typography,
  Box,
  Paper,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import { Project } from "../types/Project";

interface ProjectCardProps {
  project: Project;
  onDelete?: (projectId: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onDelete }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    handleMenuClose();
    if (onDelete) {
      onDelete(project.id);
    }
  };

  const handleViewDetails = () => {
    // Navigate to project details page
    console.log(`View details for project ${project.id}`);
  };

  return (
    <Paper className="project-card">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 1,
        }}
      >
        <Typography variant="h6" component="div" sx={{ mb: 2 }}>
          {project.title}
        </Typography>

        <IconButton aria-label="more" onClick={handleMenuClick} size="small">
          <MoreVertIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleDelete}>
            <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
            Delete
          </MenuItem>
        </Menu>
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        className="project-description"
        sx={{ mb: 3 }}
      >
        {project.description}
      </Typography>

      <Box className="project-footer">
        <Typography variant="caption" color="text.secondary">
          Created: {new Date(project.createdAt).toLocaleDateString()}
        </Typography>
        <Button size="small" variant="outlined" onClick={handleViewDetails}>
          VIEW DETAILS
        </Button>
      </Box>
    </Paper>
  );
};

export default ProjectCard;
