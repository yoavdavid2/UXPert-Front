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
