import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfileById } from "../api";
import MapComponent from "../components/MapComponent";

const ProfileDetails = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfileById(id)
      .then((res) => setProfile(res.data))
      .catch(console.error);
  }, [id]);

  if (!profile)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading profile...
        </p>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto bg-purple-50 shadow-lg rounded-lg p-6 mt-10 border border-purple-200">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <img
          className="w-28 h-28 md:w-36 md:h-36 rounded-lg border-2 border-purple-500 shadow-md p-2"
          src={profile.image}
          alt={profile.name}
        />

        <div className="ml-4 text-center md:text-left mt-4 md:mt-0">
          <h1 className="text-2xl font-semibold text-purple-700">
            {profile.name}
          </h1>
          <p className="text-gray-600 mt-2">{profile.description}</p>
        </div>
      </div>

      {/* Location */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-purple-700">
          📍 Location:{" "}
          <span className="font-normal text-gray-700">{profile.address}</span>
        </h3>
        <MapComponent address={profile.address} />
      </div>
    </div>
  );
};

export default ProfileDetails;
