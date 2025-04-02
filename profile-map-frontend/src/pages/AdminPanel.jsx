import React, { useState } from 'react'
import ProfileForm from '../components/ProfileForm'
import Headers from '../components/Headers';
import ManageProfilesList from '../components/ManageProfiles';

const AdminPanel = () => {
  const [profileId, setProfileId] = useState(null);

  // ✅ Add refreshProfiles function
  const refreshProfiles = async () => {
    try {
      const response = await fetch("/api/profiles");
      const data = await response.json();
      console.log("Profiles refreshed:", data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  return (

    <div>
    <Headers/>
      <ProfileForm 
        refreshProfiles={refreshProfiles} 
        profileId={profileId} 
        setProfileId={setProfileId} 
      />
      <ManageProfilesList/>
    </div>
  )
}

export default AdminPanel;
