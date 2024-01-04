import React, { useEffect } from "react";
import "./viewemployee.scss";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../services/redux/useTypedSelector";
import FormViewEmployee from "../../../components/employee/viewEmployee/formViewEmployee/FormViewEmployee";
import { getEmployeeById } from "../../../services/redux/slices/employee.slice";
import { selectItemBar } from "../../../services/redux/slices/sidebar.slice";
import { useSelector } from "react-redux";
import { employeeSelector } from "../../../services/redux/selecters/selector";

const ViewEmployee: React.FC = () => {
  const dispatch = useAppDispatch();
  const employeePayload = useSelector(employeeSelector);

  const { id } = useParams();

  useEffect(() => {
    const loadData = async () => {
      await dispatch(getEmployeeById(id!));

      dispatch(selectItemBar("employee"));
    };
    loadData();
  }, [dispatch, id]);

  return (
    <div className="viewEmployeeContainer">
      <div className="viewEmployeeTitle">
        Employee: {employeePayload.viewEmployee?.code}
      </div>
      <div className="viewEmployeeFormContainer">
        <FormViewEmployee />
      </div>
    </div>
  );
};

export default ViewEmployee;
