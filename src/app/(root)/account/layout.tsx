import ProfileContainer from "@/components/profile-container";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return <ProfileContainer>{children}</ProfileContainer>;
};

export default ProfileLayout;
