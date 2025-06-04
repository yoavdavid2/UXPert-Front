import { Box, Typography, Divider, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../services/requestsWrapper";
import Swal from "sweetalert2";
import { ProjectDto } from "../../utils/types";

const ProjectCard = ({
  project,
  selected,
  onClick,
}: {
  project: ProjectDto;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        backgroundColor: selected ? "#f0f0f0" : "#fff",
        borderRadius: 1,
        cursor: "pointer",
        "&:hover": {
          bgcolor: "#f0f0f8",
        },
      }}
      onClick={onClick}
    >
      <CardContent>
        <div>
          <Typography
            variant="h6"
            component="h3"
            className="project-title"
            color="text.primary"
          >
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
      </CardContent>
    </Box>
  );
};

const ChooseProjectStep = ({
  selectedProject,
  setSelectedProject,
}: {
  selectedProject: ProjectDto | null;
  setSelectedProject: (project: ProjectDto | null) => void;
}) => {
  const [projects, setProjects] = useState<ProjectDto[]>([]);
  const [userProfile, setUserProfile] = useState(
    localStorage.getItem("userProfile")
      ? JSON.parse(localStorage.getItem("userProfile")!)
      : null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const userId = userProfile ? userProfile.id : "0";
    if (!userId) {
      Swal.fire({
        icon: "error",
        title: "User not found",
        text: "User not found. Please log in again.",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }

    // Fetch projects for the user
    api
      .get(`/api/projects/users/projects/${userId}`)
      .then((response: any) => {
        setProjects(response.data);
      })
      .catch((error: any) => {
        console.error("Error fetching projects:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Box
      className="choose-project-step"
      sx={{ height: "100%", overflow: "auto", pr: 1 }}
    >
      {loading ? (
        <Typography variant="body2" color="text.secondary">
          Loading projects...
        </Typography>
      ) : (
        <>
          {!projects || projects.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                m: 2,
                verticalAlign: "center",
                height: "100%",
                alignItems: "center",
              }}
              className="empty-projects"
            >
              <Box sx={{ textAlign: "start" }}>
                <Typography variant="h6" color="textPrimary">
                  Hi, {userProfile ? userProfile.firstName : "there"}!
                  <br />
                  It seems you don't have any projects yet...
                  <br />
                </Typography>
                <Typography variant="h6" color="textPrimary" sx={{ mt: 1 }}>
                  Lets create your first project!
                </Typography>
              </Box>
            </Box>
          ) : (
            <>
              <Typography variant="h6" color="textPrimary" sx={{ m: 2 }}>
                Do you have a project in mind?
                <br /> If not, you can choose one of the existing projects or
                create a new one.
              </Typography>
              <Divider sx={{ mb: 3 }} variant="fullWidth" />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  overflowY: "scroll",
                  height: "50vh",
                }}
              >
                {projects.map((project: ProjectDto) => (
                  <Box key={project.projectId}>
                    <ProjectCard
                      project={project}
                      selected={
                        selectedProject?.projectId === project.projectId
                      }
                      onClick={() => {
                        console.log("Project clicked:", project);
                        if (selectedProject?.projectId === project.projectId) {
                          setSelectedProject(null);
                        } else {
                          setSelectedProject(project);
                        }
                      }}
                    />
                    <Divider sx={{ mb: 2 }} variant="fullWidth" />
                  </Box>
                ))}
              </Box>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default ChooseProjectStep;