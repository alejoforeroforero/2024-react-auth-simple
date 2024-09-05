import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserUpdateForm from "@/components/UserUpdateForm";


const AuthFormPage = () => {
  // const user = useSelector((state) => state.auth.user);
  const { user, isAuthorized } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  
  useEffect(()=>{
    if(!isAuthorized){
      navigate('/')
    }
  }, [isAuthorized])

  return (
    <div>
      {user && <UserUpdateForm />}
      {!user && <p>No tienes permisos</p>}
    </div>
  );
};

export default AuthFormPage;
