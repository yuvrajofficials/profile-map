import { useState, useEffect } from "react";
import { createProfile, updateProfile, deleteProfile, getProfile } from "../api";

const ProfileForm = ({ refreshProfiles, profileId, setProfileId }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Fetch profile data if editing
  useEffect(() => {
    if (profileId) {
      const fetchProfile = async () => {
        const profile = await getProfile(profileId);
        setName(profile.name);
        setDescription(profile.description);
        setAddress(profile.address);
        setPreview(profile.image);
      };
      fetchProfile();
    } else {
      resetForm();
    }
  }, [profileId]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setAddress("");
    setImage(null);
    setPreview(null);
    setProfileId(null); // Clear selected profile for editing
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("address", address);
    if (image) {
      formData.append("image", image);
    }

    if (profileId) {
      await updateProfile(profileId, formData);
    } else {
      await createProfile(formData);
    }

    refreshProfiles();
    resetForm();
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      await deleteProfile(profileId);
      refreshProfiles();
      resetForm();
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-purple-50 p-8 rounded-xl shadow-xl mt-6 transition-all duration-300">
      <h2 className="text-3xl font-semibold text-center text-purple-600 ">
        {profileId ? "Edit Profile" : "Add Profile"}
      </h2>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6" encType="multipart/form-data">
        <div className="flex flex-col">
          <label className="text-purple-600  font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter full name"
            className="mt-2 w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-purple-600  font-medium">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="mt-2 w-full p-3 border border-purple-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-purple-600  font-medium">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
            required
          />
        </div>

        {/* Image Upload Section */}
        <div className="flex flex-col">
          <label className="text-purple-600  font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
          />
        </div>

        {/* Image Preview */}
        {preview && (
          <div className="flex justify-center mt-4">
            <img
              src={preview}
              alt="Profile Preview"
              className="w-32 h-32 object-cover rounded-full shadow-lg border-4 border-purple-500 transition-all duration-300"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-3 rounded-lg font-semibold hover:bg-purple-600 transition duration-300 transform hover:scale-[1.02]"
        >
          {profileId ? "Update Profile" : "Add Profile"}
        </button>

        {profileId && (
          <button
            type="button"
            onClick={handleDelete}
            className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition duration-300 mt-2 transform hover:scale-[1.02]"
          >
            Delete Profile
          </button>
        )}
      </form>
    </div>
  );
};

export default ProfileForm;
