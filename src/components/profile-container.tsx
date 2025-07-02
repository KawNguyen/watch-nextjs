import { ProfileSidebar } from "@/components/profile/profile-sidebar";
import { UserProps } from "@/types/auth";
import { ProfileContext } from "./providers/profile-context";

const ProfileContainer = ({
  user,
  children,
}: {
  user: UserProps | null;
  children: React.ReactNode;
}) => {
  return (
    <ProfileContext.Provider value={user}>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <ProfileSidebar user={user} />
            </div>
            <div className="lg:col-span-3">{children}</div>
          </div>
        </div>
      </div>
    </ProfileContext.Provider>
  );
};

export default ProfileContainer;
