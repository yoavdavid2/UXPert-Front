export interface Project {
    projectId: string;
    title: string;
    description: string;
    purpose  ?: string;
    image?: string;
    createdAt: string;
    url?: string;
    tags?: string[];
    results?: {
        seo?: {score: number};
        accessibility?: {score: number};
        performance?: {score: number};
        usability?: {score: number};
    }
}

export interface CreateProjectRequest {
    name: string;
    description?: string;
    tags?: string[];
}
  
  export interface ProjectResponse {
    _id: string;
    name: string;
    description?: string;
    tags?: string[];
    userId: string;
    createdAt: string;
    updatedAt?: string;
}  

export interface IReportCardProps {
  report: any; // Replace with proper Report type
  onViewClick: (reportId: string) => void;
  onDeleteClick: (reportId: string) => void;
}
