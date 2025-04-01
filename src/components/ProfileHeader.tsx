import { Typography, Avatar, Button } from "@mui/material";
import { getFullName } from "../types/UserProfile";
import { IProfileHeaderProps } from "../utils/types";

import "./components.css";

const ProfileHeader = ({ userProfile, onEditProfile }: IProfileHeaderProps) => {
  return (
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
            Member since{" "}
            {userProfile.createdAt
              ? new Date(userProfile.createdAt).toLocaleDateString()
              : "Unknown date"}
          </Typography>
        </div>
      </div>
      <div className="profile-actions">
        <Button
          variant="contained"
          className="profile-edit-button"
          onClick={onEditProfile}
        >
          Edit Profile
        </Button>
      </div>
    </div>
  );
};

export default ProfileHeader;
