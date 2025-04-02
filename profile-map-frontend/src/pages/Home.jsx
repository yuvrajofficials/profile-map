import { useEffect, useState } from "react";
import { getProfiles } from "../api";
import ProfileList from "../components/ProfileList";
import Headers from "../components/Headers";

const Home = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    getProfiles().then((res) => setProfiles(res.data)).catch(console.error);
  }, []);

  return (
    <div>
<Headers/>
      <ProfileList profiles={profiles} />
    </div>
  );
};

export default Home;
