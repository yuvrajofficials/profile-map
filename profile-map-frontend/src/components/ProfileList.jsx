import ProfileCard from "./ProfileCard";

const ProfileList = ({ profiles }) => (
  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
    {profiles.map((profile) => (
      <ProfileCard key={profile._id} profile={profile} />
    ))}
  </div>
);

export default ProfileList;
