export interface Project {
    id: string;
    title: string;
    description: string;
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

export const mockProjects: Project[] = [
    {
      id: '1',
      title: 'UX Research Project',
      description: 'User research and usability testing for e-commerce application',
      createdAt: '2023-06-15'
    },
    {
      id: '2',
      title: 'Website Redesign',
      description: 'Complete overhaul of company website with focus on accessibility',
      createdAt: '2023-08-22'
    },
    {
      id: '3',
      title: 'Mobile App Design',
      description: 'UI/UX design for iOS and Android fitness application',
      createdAt: '2023-10-05'
    },
    {
      id: '4',
      title: 'Design System Creation',
      description: 'Building a comprehensive design system for enterprise applications',
      createdAt: '2024-01-10'
    }
];