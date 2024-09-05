import { useSelector } from "react-redux";

const UserInfo = () => {
  const authObj = useSelector((state) => state.auth);

  return (
    <div>
      <div className="user">
        <h2>
          {authObj.user?.first_name} {authObj.user?.last_name}
        </h2>
        <p>{authObj.user?.email}</p>
        <p>{authObj.user?.bio}</p>
        <p>{authObj.user?.address}</p>
        <p>{authObj.user?.phone_number}</p>
        <p>{authObj.user?.birth_date}</p>
      </div>
    </div>
  );
};

export default UserInfo;
