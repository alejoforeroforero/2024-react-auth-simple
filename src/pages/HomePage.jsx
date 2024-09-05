import { useSelector } from "react-redux";
import UserInfo from "@/components/userInfo";
import { Link } from "react-router-dom";

const HomePage = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <div>
        {user && <UserInfo />}
        {!user && <Link to="/auth">Sign in</Link>}
        </div>
    </>
  );
};

export default HomePage;
