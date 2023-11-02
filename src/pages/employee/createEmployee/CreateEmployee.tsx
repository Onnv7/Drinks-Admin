import React, { useEffect } from "react";
import "./createemployee.scss";
import FormCreateEmployee from "../../../components/employee/createEmployee/formCreateEmployee/FormCreateEmployee";
import { useAppDispatch } from "../../../services/redux/useTypedSelector";
import { selectItemBar } from "../../../services/redux/slices/sidebar.slice";

const CreateEmployee: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(selectItemBar("employee"));
  }, [dispatch]);
  return (
    <div className="creteEmployeeContainer">
      <div className="createEmployeeHeader">
        <div className="createEmployeeTitle">Create Employee</div>
      </div>
      <div className="createEmployeeBody">
        <div className="createEmployeeForm">
          <FormCreateEmployee />
        </div>
      </div>
    </div>
  );
};

export default CreateEmployee;
