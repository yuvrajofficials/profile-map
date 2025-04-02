import { useEffect, useState } from "react";
import { getProfiles, updateProfile, deleteProfile } from "../api";

const ManageProfilesList = () => {
  const [profiles, setProfiles] = useState([]);
  const [editingProfile, setEditingProfile] = useState(null);
  const [updatedData, setUpdatedData] = useState({ name: "", description: "" });

  // Fetch all profiles
  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const res = await getProfiles();
      setProfiles(res.data);
    } catch (err) {
      console.error("Error fetching profiles:", err);
    }
  };

  // Handle Edit button click
  const handleEdit = (profile) => {
    setEditingProfile(profile);
    setUpdatedData({ name: profile.name, description: profile.description });
  };

  // Handle Update Submission
  const handleUpdate = async (id) => {
    try {
      await updateProfile(id, updatedData);
      setEditingProfile(null);
      fetchProfiles(); // Refresh the list
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  // Handle Delete Profile
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      try {
        await deleteProfile(id);
        fetchProfiles(); // Refresh the list
      } catch (err) {
        console.error("Error deleting profile:", err);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-purple-50 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-purple-700 text-center mb-6">
        Manage Profiles
      </h2>

      <div className="space-y-4">
        {profiles.map((profile) => (
          <div
            key={profile._id}
            className="flex justify-between items-center bg-white p-4 rounded shadow"
          >
            {editingProfile?._id === profile._id ? (
              <div className="flex flex-col w-full">
                <input
                  type="text"
                  value={updatedData.name}
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, name: e.target.value })
                  }
                  className="border p-2 rounded w-full mb-2"
                />
                <input
                  type="text"
                  value={updatedData.description}
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, description: e.target.value })
                  }
                  className="border p-2 rounded w-full mb-2"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleUpdate(profile._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingProfile(null)}
                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold">{profile.name}</h3>
                <p className="text-gray-600">{profile.description}</p>
              </div>
            )}

            {!editingProfile && (
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(profile)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(profile._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProfilesList;
