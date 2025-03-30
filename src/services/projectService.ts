import api from '../services/Api';
import { Project } from '../types/Project';

interface CreateProjectRequest {
  name: string;
  description?: string;
  tags?: string[];
}

interface ProjectResponse {
  _id: string;
  name: string;
  description?: string;
  tags?: string[];
  userId: string;
  createdAt: string;
  updatedAt?: string;
}

// Convert backend response to frontend Project format
const convertToProject = (projectData: ProjectResponse): Project => {
  return {
    id: projectData._id,
    title: projectData.name,
    description: projectData.description || '',
    tags: projectData.tags,
    createdAt: projectData.createdAt
  };
};

export const projectService = {
  // Get all projects
  async getProjects(): Promise<Project[]> {
    try {
      const response = await api.get('/projects');
      return response.data.map(convertToProject);
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  // Create a new project
  async createProject(projectData: CreateProjectRequest): Promise<Project> {
    try {
      const response = await api.post('/projects', projectData);
      return convertToProject(response.data);
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  // Get project by ID
  async getProjectById(id: string): Promise<Project> {
    try {
      const response = await api.get(`/projects/${id}`);
      return convertToProject(response.data);
    } catch (error) {
      console.error(`Error fetching project with ID ${id}:`, error);
      throw error;
    }
  },

  // Update a project
  async updateProject(id: string, projectData: Partial<CreateProjectRequest>): Promise<Project> {
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
      await api.delete(`/projects/${id}`);
    } catch (error) {
      console.error(`Error deleting project with ID ${id}:`, error);
      throw error;
    }
  }
};