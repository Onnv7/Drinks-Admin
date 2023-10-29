import React, { useEffect, useState } from "react";
import "./viewemployee.scss";
import { useParams } from "react-router-dom";
import { getProductDetailsById } from "../../../services/redux/slices/product.slice";
import { useAppDispatch } from "../../../services/redux/useTypedSelector";
import FormViewEmployee from "../../../components/employee/viewEmployee/formViewEmployee/FormViewEmployee";
import { useSelector } from "react-redux";
import { employeeSelector } from "../../../services/redux/selecters/selector";
import { getEmployeeById } from "../../../services/redux/slices/employee.slice";
import { IUpdateEmployeeReq } from "../../../interfaces/request/employee.request";

const ViewEmployee: React.FC = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams();

  useEffect(() => {
    const loadData = async () => {
      await dispatch(getEmployeeById(id!));
    };
    loadData();
  }, [dispatch, id]);

  return (
    <div className="viewEmployeeContainer">
      <div className="viewEmployeeTitle">Employee: {id}</div>
      <div className="viewEmployeeFormContainer">
        <FormViewEmployee />
      </div>
    </div>
  );
};

export default ViewEmployee;
