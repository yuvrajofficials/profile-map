import { Link } from "react-router-dom";

const ProfileCard = ({ profile }) => (
  <div className="bg-purple-50 rounded-lg p-5 shadow-md hover:shadow-2xl transition duration-300">
    <img
      src={profile.image}
      alt={profile.name}
      className="w-24 h-24 object-cover rounded-lg mx-auto border-2 border-purple-500"
    />
    <h3 className="text-xl font-semibold text-center mt-3 text-purple-700">
      {profile.name}
    </h3>
    <p className="text-gray-600 text-center mt-1">{profile.description}</p>
    <div className="text-center mt-4">
      <Link
        to={`/profile/${profile._id}`}
        className="bg-purple-600 text-white py-2 px-5 rounded-lg hover:bg-purple-700 transition duration-300"
      >
        Summary
      </Link>
    </div>
  </div>
);

export default ProfileCard;
