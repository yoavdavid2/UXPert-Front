import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { MoreVert, Delete, Edit } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { IProjectCardProps } from "../utils/types";

import "./components.css";

const AnimatedCard = styled(Card)(({ theme }) => ({
  borderRadius: 10,
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: theme.shadows[8],
  },
}));

const ProjectCard = ({ project, onDelete }: IProjectCardProps) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleMenuClose();
    console.log("Edit project", project.id);
  };

  const handleDeleteClick = () => {
    handleMenuClose();
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    setDeleteDialogOpen(false);
    onDelete();
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  const handleViewDetails = () => {
    navigate(`/results?reportId=${project.id}&link=${encodeURIComponent(project.title)}`);
  };

  const handleCardClick = () => {
    handleViewDetails();
  };

  return (
    <>
      <AnimatedCard className="project-card" onClick={handleCardClick} sx={{cursor: 'pointer'}}>
        <CardContent>
          <div className="project-card-header">
            <Typography variant="h6" component="h3" className="project-title">
              {project.title}
            </Typography>
            <IconButton
              aria-label="Project options"
              aria-controls="project-menu"
              aria-haspopup="true"
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click when clicking menu
                handleMenuClick(e);
              }}
              size="small"
            >
              <MoreVert />
            </IconButton>
          </div>

          <Typography
            variant="body2"
            color="text.secondary"
            className="project-description"
          >
            {project.description}
          </Typography>

          <Typography
            variant="caption"
            display="block"
            className="project-date"
          >
            Created: {new Date(project.createdAt).toLocaleDateString()}
          </Typography>

          {project.tags && project.tags.length > 0 && (
            <div className="project-tags">
              {project.tags.map((tag, index) => (
                <span key={index} className="project-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>

        <CardActions className="project-card-actions">
          <Button size="small" color="primary" onClick={(e) => {
              e.stopPropagation(); // Prevent card click
              handleViewDetails();
            }}>
            View Details
          </Button>
        </CardActions>
      </AnimatedCard>

      <Menu
        id="project-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleEdit}>
          <Edit fontSize="small" style={{ marginRight: 8 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <Delete fontSize="small" style={{ marginRight: 8 }} />
          Delete
        </MenuItem>
      </Menu>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">Delete Project</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{project.title}"? This action
            cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProjectCard;
