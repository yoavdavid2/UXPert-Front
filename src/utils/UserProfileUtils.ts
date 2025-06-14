export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string | null;
  createdAt?: string;
}

export const getUserProfile = (): UserProfile | null => {
  const userProfileStr = localStorage.getItem("userProfile");
  if (!userProfileStr) return null;

  try {
    return JSON.parse(userProfileStr) as UserProfile;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getFullName = (userProfile: UserProfile): string => {
  return `${userProfile.firstName} ${userProfile.lastName}`;
};
