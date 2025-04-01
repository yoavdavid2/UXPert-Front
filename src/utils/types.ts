import { PropsWithChildren } from "react";

export interface IAppbarProps {
  handleProfileClick: () => void;
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
  onClose: () => void;
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
