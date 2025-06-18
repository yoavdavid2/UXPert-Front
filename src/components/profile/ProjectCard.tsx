import { useState } from 'react';
import { Card, CardContent, CardActions, Typography, Button, IconButton } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { IProjectCardProps } from '../../utils/types';

import '../components.css';

const AnimatedCard = styled(Card)(({ theme }) => ({
  borderRadius: 10,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
  },
}));

const ProjectCard = ({ project, onDelete, onClickProject }: IProjectCardProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AnimatedCard className="project-card" onClick={onClickProject} sx={{ cursor: 'pointer' }}>
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

          <Typography variant="body2" color="text.secondary" className="project-description">
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
    </>
  );
};

export default ProjectCard;
