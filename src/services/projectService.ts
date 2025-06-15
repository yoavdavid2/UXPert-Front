import api from "./requestsWrapper";
import {
  IProject,
  ICreateProjectRequest,
  IProjectResponse,
} from "../utils/types";
import {
  Report,
  ReportHistoryQuery,
  mapApiReportToReport,
} from "../utils/ReportUtils";
import { ProjectDto } from "../utils/types";

// Convert backend response to frontend Project format
const convertToProject = (projectData: IProjectResponse): IProject => {
  return {
    projectId: projectData._id,
    title: projectData.name,
    description: projectData.description || "",
    tags: projectData.tags,
    createdAt: projectData.createdAt,
  };
};

export const projectService = {
  // Get all projects
  async getUserProjects(
    userId: string
  ): Promise<{ projects: ProjectDto[]; total: number }> {
    try {
      const response = await api.get(`/api/projects/users/projects/${userId}`);
      return {
        projects: response.data,
        total: response.data.total,
      };
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  },

  async getProjectsReports(
    projectId: string
  ): Promise<{ reports: Report[]; total: number }> {
    try {
      const response = await api.get(`/api/reports/byProjectId/${projectId}`);
      return {
        reports: response.data,
        total: response.data.total,
      };
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  },

  // Get project/report history for a specific website
  async getProjectHistory(websiteName: string): Promise<IProject[]> {
    try {
      const response = await api.get(`/api/reports/history/${websiteName}`);
      return Array.isArray(response.data)
        ? response.data.map(convertToProject)
        : [];
    } catch (error) {
      console.error(`Error fetching history for ${websiteName}:`, error);
      throw error;
    }
  },

  // Create a new project
  async createProject(projectData: ICreateProjectRequest): Promise<IProject> {
    try {
      const response = await api.post("/api/project", projectData);
      return convertToProject(response.data);
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  },

  // Get project by ID
  async getProjectById(id: string): Promise<IProject> {
    try {
      const response = await api.get(`/reports/${id}`);
      return convertToProject(response.data);
    } catch (error) {
      console.error(`Error fetching project with ID ${id}:`, error);
      throw error;
    }
  },

  // Update a project
  async updateProject(
    id: string,
    projectData: Partial<ICreateProjectRequest>
  ): Promise<IProject> {
    try {
      const response = await api.patch(`/projects/${id}`, projectData);
      return convertToProject(response.data);
    } catch (error) {
      console.error(`Error updating project with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete a project
  async deleteProject(id: string): Promise<void> {
    try {
      await api.delete(`/api/projects/${id}`);
    } catch (error) {
      console.error(`Error deleting project with ID ${id}:`, error);
      throw error;
    }
  },

  // Get reports history
  async getReportsHistory(
    query: ReportHistoryQuery = {}
  ): Promise<{ reports: Report[]; total: number }> {
    try {
      const response = await api.get("/api/reports", { params: query });
      return {
        reports: response.data.reports.map(mapApiReportToReport),
        total: response.data.total,
      };
    } catch (error) {
      console.error("Error fetching reports history:", error);
      throw error;
    }
  },
};
