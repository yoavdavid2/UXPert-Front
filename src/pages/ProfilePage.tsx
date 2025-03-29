import React, { useState, useEffect } from 'react';
import { Typography, Avatar, Box, Container, Paper, Grid, Button } from '@mui/material';
import { getUserProfile, getFullName, UserProfile } from '../types/UserProfile';
import './pages.css';

// Mocked project data - replace with actual API call
interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  createdAt: string;
}

const mockProjects: Project[] = [
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

// Project card component
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <Paper className="project-card">
      <Typography variant="h6" gutterBottom component="div">
        {project.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" className="project-description">
        {project.description}
      </Typography>
      <Box className="project-footer">
        <Typography variant="caption" color="text.secondary">
          Created: {new Date(project.createdAt).toLocaleDateString()}
        </Typography>
        <Button size="small" variant="outlined">View Details</Button>
      </Box>
    </Paper>
  );
};

const ProfilePage: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [projects, setProjects] = useState<Project[]>(mockProjects);

  useEffect(() => {
    // Load user profile data
    const profile = getUserProfile();
    setUserProfile(profile);
    
    // fetch projects from an API here
    // For now we're using mock data
  }, []);

  useEffect(() => {
    // If no profile exists, create a mock one for testing
    if (!getUserProfile()) {
      const mockProfile = {
        id: '1',
        firstName: 'Ron',
        lastName: 'Israeli',
        email: 'ron@example.com',
        profileImage: null,
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('userProfile', JSON.stringify(mockProfile));
      setUserProfile(mockProfile);
    }
  }, []);
  
  if (!userProfile) {
    return (
      <div className="profile-page">
        <Container className="loading-container">
          <Typography variant="h5" sx={{ color: 'white' }}>Loading profile...</Typography>
        </Container>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Container className="profile-container">
        {/* Profile Header Section */}
        <div className="profile-header">
          <div className="profile-header-content">
            <Avatar 
              src={userProfile.profileImage || undefined}
              alt={getFullName(userProfile)}
              className="profile-avatar"
            />
            <div className="profile-info">
              <Typography variant="h4" component="h1" className="profile-name">
                {getFullName(userProfile)}
              </Typography>
              <Typography variant="body1" className="profile-email">
                {userProfile.email}
              </Typography>
              <Typography variant="body2" className="profile-member-since">
                Member since {userProfile.createdAt ? 
                  new Date(userProfile.createdAt).toLocaleDateString() : 
                  'Unknown date'}
              </Typography>
            </div>
          </div>
          <div className="profile-actions">
            <Button variant="contained" className="profile-edit-button">Edit Profile</Button>
          </div>
        </div>

        {/* Projects Section */}
        <div className="projects-section">
          <div className="projects-header">
            <Typography variant="h5" component="h2" className="section-title">
              My Projects
            </Typography>
            <Button variant="contained" color="primary" className="new-project-button">
              New Project
            </Button>
          </div>
          
          <Grid container spacing={6} className="projects-grid" >
            {projects.map((project) => (
              <Grid item xs={12} sm={6} key={project.id}>
                <ProjectCard project={project} />
              </Grid>
            ))}
          </Grid>
          
          {projects.length === 0 && (
            <div className="empty-projects">
              <Typography variant="body1">
                You don't have any projects yet. Create your first project!
              </Typography>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ProfilePage;