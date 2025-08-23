import { Box, CardContent, Typography } from "@mui/material";

import { IProjectCardProps } from "../../utils/types";

import "../components.css";

const ProjectCard = ({ project, selected, onClick }: IProjectCardProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        backgroundColor: "#fff",
        borderLeft: selected ? "4px solid #1976d2" : "4px solid transparent",
        boxShadow: selected
          ? `
            inset 20px 0 40px -20px rgba(25, 118, 210, 0.15),
            0 2px 8px rgba(0, 0, 0, 0.1)
          `
          : "0 2px 8px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
        borderRadius: 10,
        transition: "all 0.3s ease-in-out",
        ...(!selected && {
          "&:hover": {
            transform: "translateY(-8px)",
          },
        }),
      }}
      onClick={onClick}
    >
      <CardContent>
        <div className="project-card-header">
          <Typography variant="h6" component="h3" className="project-title">
            {project.url}
          </Typography>
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
    </Box>
  );
};

export default ProjectCard;
