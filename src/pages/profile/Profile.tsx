import React, { useEffect } from "react";
import "./profile.scss";
import { useAppDispatch } from "../../services/redux/useTypedSelector";
import { getMyProfile } from "../../services/redux/slices/profile.slice";
import FormViewProfile from "../../components/profile/formViewProfile/FormViewProfile";
import { selectItemBar } from "../../services/redux/slices/sidebar.slice";
const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getMyProfile());
    dispatch(selectItemBar("profile"));
  }, [dispatch]);
  return (
    <div className="viewEmployeeContainer">
      <div className="viewEmployeeTitle">Admin Profile</div>
      <div className="viewEmployeeFormContainer">
        <FormViewProfile />
      </div>
    </div>
  );
};

export default Profile;
