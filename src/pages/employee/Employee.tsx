import React, { useEffect } from "react";
import "./employee.scss";
import { Link } from "react-router-dom";
import OutLineButton from "../../components/shared/outlineButton/OutLineButton";
import { RouteConstants } from "../../constants/RouteConstant";
import { useAppDispatch } from "../../services/redux/useTypedSelector";
import { useSelector } from "react-redux";
import { employeeSelector } from "../../services/redux/selecters/selector";
import EmployeeTable from "../../components/employee/table/EmployeeTable";
import { getAllEmployees } from "../../services/redux/slices/employee.slice";
import { selectItemBar } from "../../services/redux/slices/sidebar.slice";

const Employee: React.FC = () => {
  const dispatch = useAppDispatch();
  const employeePayload = useSelector(employeeSelector);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(getAllEmployees());
      dispatch(selectItemBar("employee"));
    };
    loadData();
  }, [dispatch]);

  return (
    <div className="employeeContainer">
      <div className="employeeHeader">
        <div className="employeeTitle">PRODUCT TABLE</div>
        <div className="employeeAddButton">
          <Link to={RouteConstants.ADD_PRODUCT_PATH}>
            <OutLineButton
              text="Add new employee"
              backgroundColor="#1ad0ec27"
            />
          </Link>
        </div>
      </div>
      <div className="employeeContent">
        <div className="employeeTable">
          <EmployeeTable employee={employeePayload.employees} />
        </div>
      </div>
    </div>
  );
};

export default Employee;
