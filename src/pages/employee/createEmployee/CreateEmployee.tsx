import React from "react";
import "./createemployee.scss";
import FormCreateEmployee from "../../../components/employee/createEmployee/formCreateEmployee/FormCreateEmployee";

const CreateEmployee: React.FC = () => {
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
