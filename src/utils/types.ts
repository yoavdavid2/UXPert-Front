import { PropsWithChildren } from 'react';
import { UserProfile } from './UserProfileUtils';
import { OverallEvaluation, Report, WebsiteEvaluation } from './ReportUtils';

export interface IAppbarProps {
  handleProfileClick: () => void;
}

export interface IAuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProfile | null;
  login: (token: string, userData: UserProfile) => void;
  logout: () => void;
}

export interface IFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isLargeScreen: boolean;
}

interface CornerStyles {
  width: string;
  height: string;
  bottom: string;
  right: string;
}

interface BackgroundConfig {
  primaryPath: string;
  secondaryPath: string;
  primaryColor: string;
  secondaryColor: string;
  bgColor: string;
  cornerImage?: string;
  hasCornerImage: boolean;
  cornerStyles?: CornerStyles;
}

export interface IBackgroundConfigMap {
  [key: string]: BackgroundConfig;
}

export interface BackgroundWrapperProps extends PropsWithChildren {
  configMap?: IBackgroundConfigMap;
  transitionDuration?: number;
}

export interface IChipItem {
  name: string;
  icon: React.ReactNode;
}

export interface IChipGroupProps {
  items: IChipItem[];
  selectedItems: string[];
  toggleItem: (item: string) => void;
  readonly?: boolean;
  marginBottom?: number;
}

export interface IStepperCardProps {
  onClose: (summery: userRequirmentsSummeryDto | ProjectDto) => void;
  onSubmit?: (formData: FormData) => void;
}

export interface IFormData {
  categories: string[];
  audience: string[];
  emotions: string[];
  websitePurpose: string;
  websiteUrl: string;
}

export interface ILoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  error: string | null;
  setError: (error: string | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  onSwitchToSignUp: () => void;
}

export interface ISignupFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  error: string | null;
  setError: (error: string | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  onSignUpSuccess: () => void;
  onSwitchToSignIn: () => void;
}

export interface IProfileHeaderProps {
  userProfile: UserProfile;
}

export interface IProfileProjectsSectionProps {
  userId: string;
  setGlobalError: (error: string | null) => void;
}

export interface IProjectCardProps {
  project: ProjectDto;
  onDelete: () => void;
  onClickProject: () => void;
}

export interface IProjectResultCardProps {
  report: Report;
  onDelete: () => void;
}

export interface ILoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  error: string | null;
  setError: (error: string | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  onSwitchToSignUp: () => void;
}

export interface ISignupFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  error: string | null;
  setError: (error: string | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  onSignUpSuccess: () => void;
  onSwitchToSignIn: () => void;
}

export interface IProfileHeaderProps {
  userProfile: UserProfile;
  onEditProfile: () => void;
}

export interface IProfileProjectsSectionProps {
  userId: string;
  setGlobalError: (error: string | null) => void;
}

export interface IProjectCardProps {
  project: ProjectDto;
  onDelete: () => void;
}

export type userRequirmentsSummeryDto = {
  projectId?: string;
  userId: string;
  email: string;
  name: string;
  categories: string[];
  audience: string[];
  emotions: string[];
  purpose: string;
  url: string;
};

// ProjectDto from the backend
export type ProjectDto = {
  _id: string;
  userId: string;
  email: string;
  name: string;
  categories: string[];
  audience: string[];
  emotions: string[];
  purpose: string;
  url: string;
};

export interface IAnimatedModal {
  currentText: string;
}

export interface IResultsModalProps extends WebsiteEvaluation {
  open: boolean;
  onClose: () => void;
}

export interface IChipItem {
  name: string;
  icon: React.ReactNode;
  description?: string;
  category?: string;
}

export interface IChipGroupProps {
  items: IChipItem[];
  selectedItems: string[];
  toggleItem: (item: string) => void;
  searchable?: boolean;
  groupByCategory?: boolean;
  maxHeight?: string | number;
}

export interface IResultsModalProps extends WebsiteEvaluation {
  open: boolean;
  onClose: () => void;
}

export interface IAnalysisSectionProps {
  decodedCustomerUrl: string;
  handleDownloadReport: () => void;
  handlePreviewSuggestions: () => void;
  averageScore: number;
  analystResult: OverallEvaluation;
  tabValue: number;
  handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export interface IProject {
  projectId: string;
  title: string;
  description: string;
  purpose?: string;
  image?: string;
  createdAt: string;
  url?: string;
  tags?: string[];
  results?: {
    seo?: { score: number };
    accessibility?: { score: number };
    performance?: { score: number };
    usability?: { score: number };
  };
}

export interface ICreateProjectRequest {
  name: string;
  description?: string;
  tags?: string[];
}

export interface IProjectResponse {
  _id: string;
  name: string;
  description?: string;
  tags?: string[];
  userId: string;
  createdAt: string;
  updatedAt?: string;
}

export interface IReportCardProps {
  report: unknown; // Replace with proper Report type
  onViewClick: (reportId: string) => void;
  onDeleteClick: (reportId: string) => void;
}

export interface IImprovementSuggestionsSectionProps {
  categoryRatings: OverallEvaluation['category_ratings'];
  onPreview: () => void;
}

export interface IDetailedAnalysisSectionProps {
  categoryRatings: OverallEvaluation['category_ratings'];
}

export interface IAnalysisTimelineProps {
  reports: Report[];
  selectedReport: Report | null;
  onSelectReport: (report: Report) => void;
  loading: boolean;
}

export interface IProfileDashboardProps {
  selectedProject: ProjectDto | null;
  setGlobalError: (error: string | null) => void;
}

export interface IProfileSidebarProps {
  userProfile: UserProfile;
  selectedProject: ProjectDto | null;
  onProjectSelect: (project: ProjectDto | null) => void;
  projects: ProjectDto[];
  setProjects: React.Dispatch<React.SetStateAction<ProjectDto[]>>;
}

export interface IFinalDataStepProps {
  websitePurpose: string;
  setWebsitePurpose: (purpose: string) => void;
  websiteUrl: string;
  setWebsiteUrl: (url: string) => void;
}

export interface IEmotionsStepProps {
  selectedEmotions: string[];
  toggleEmotion: (emotion: string) => void;
}

export interface IOverallScoreCardProps {
  averageScore: number;
  bestThing: string;
  worstThing: string;
}

export interface IDynamicIframeModalProps {
  code: string;
  open: boolean;
  onClose: () => void;
}
