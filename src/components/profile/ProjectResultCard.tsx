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
import { IProjectResultCardProps } from "../../utils/types";

import "../components.css";

const AnimatedCard = styled(Card)(({ theme }) => ({
  borderRadius: 10,
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: theme.shadows[8],
  },
}));

const ProjectResultCard = ({ report, onDelete }: IProjectResultCardProps) => {
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
    console.log("Edit project", report.url);
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
    navigate(
      `/results?reportId=${report._id}&link=${encodeURIComponent(report.url)}`
    );
  };

  const handleCardClick = () => {
    handleViewDetails();
  };

  return (
    <>
      <AnimatedCard
        className="project-card"
        onClick={handleCardClick}
        sx={{ cursor: "pointer" }}
      >
        <CardContent>
          <div className="project-card-header">
            <Typography variant="h6" component="h3" className="project-title">
              {report.url}
            </Typography>
            <IconButton
              aria-label="Project options"
              aria-controls="project-menu"
              aria-haspopup="true"
              onClick={(e) => {
                e.preventDefault();
                console.log("prevented");
                handleMenuClick(e);
              }}
              size="small"
            >
              <MoreVert />
            </IconButton>
          </div>

          <Typography
            variant="caption"
            display="block"
            className="project-date"
          >
            Created: {new Date(report.createdAt).toLocaleDateString()}
          </Typography>
        </CardContent>

        <CardActions className="project-card-actions">
          <Button
            size="small"
            color="primary"
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click
              handleViewDetails();
            }}
          >
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
            Are you sure you want to delete "{report._id}"? This action cannot
            be undone.
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

export default ProjectResultCard;
