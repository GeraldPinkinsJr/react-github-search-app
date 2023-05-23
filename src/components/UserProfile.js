import { useParams } from "react-router-dom";

function UserProfile() {
  const { username } = useParams();

  return <div>User Profile Component for {username}</div>;
}
export default UserProfile;