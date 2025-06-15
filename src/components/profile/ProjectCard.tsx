import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { IProjectCardProps } from "../../utils/types";

import "../components.css";

const AnimatedCard = styled(Card)(({ theme }) => ({
  borderRadius: 10,
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: theme.shadows[8],
  },
}));

const ProjectCard = ({
  project,
  onDelete,
  onClickProject,
}: IProjectCardProps) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleMenuClose();
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

  return (
    <>
      <AnimatedCard
        className="project-card"
        onClick={onClickProject}
        sx={{ cursor: "pointer" }}
      >
        <CardContent>
          <div className="project-card-header">
            <Typography variant="h6" component="h3" className="project-title">
              {project.url}
            </Typography>
            <IconButton
              aria-label="Project options"
              aria-controls="project-menu"
              aria-haspopup="true"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // onClickProject();
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
            {project.purpose}
          </Typography>

          {project.audience && project.audience.length > 0 && (
            <div className="project-audience">
              {project.audience.map((tag, index) => (
                <span key={index} className="project-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {project.categories && project.categories.length > 0 && (
            <div className="project-audience">
              {project.categories.map((tag, index) => (
                <span key={index} className="project-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {project.emotions && project.emotions.length > 0 && (
            <div className="project-audience">
              {project.emotions.map((tag, index) => (
                <span key={index} className="project-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>

        <CardActions className="project-card-actions">
          <Button
            size="small"
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              onClickProject();
            }}
          >
            View analysis history results
          </Button>
        </CardActions>
      </AnimatedCard>

      {/* <Menu
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
      </Dialog>*/}
    </>
  );
};

export default ProjectCard;
