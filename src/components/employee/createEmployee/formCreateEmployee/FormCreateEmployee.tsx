import React, { useEffect, useState } from "react";
import "./formcreateemployee.scss";
import ElevatedButton from "../../../shared/elevatedButton/ElevatedButton";
import TextInput from "../../../shared/textInput/TextInput";
import "react-calendar/dist/Calendar.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import RadioInput from "../../../shared/radioInput/RadioInput";
import { ICreateEmployeeReq } from "../../../../interfaces/request/employee.request";
import { Gender } from "../../../../enums/Gender";
import {
  DatePicker,
  DateValidationError,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers";
import { useAppDispatch } from "../../../../services/redux/useTypedSelector";

import { creteEmployee } from "../../../../services/redux/slices/employee.slice";
import { useSelector } from "react-redux";
import { employeeSelector } from "../../../../services/redux/selecters/selector";

const FormCreateEmployee: React.FC = () => {
  const initialItem = {
    username: "",
    firstName: "",
    lastName: "",
    gender: Gender[Gender.FEMALE],
    password: "",
    birthDate: "",
  } as ICreateEmployeeReq;
  const dispatch = useAppDispatch();
  const employeePayload = useSelector(employeeSelector);
  const [item, setItem] = useState(initialItem);

  useEffect(() => {
    if (employeePayload.succeed) {
      handleClearData();
    }
  }, [employeePayload.succeed]);
  // event handlers ==============================================================
  const handleSubmit = async () => {
    // console.log(item);

    await dispatch(creteEmployee(item));
  };

  const handleDateChange = (
    value: any,
    context: PickerChangeHandlerContext<DateValidationError>
  ) => {
    console.log(value);
    if (value) {
      const data =
        value.$y +
        "-" +
        String(value.$M + 1).padStart(2, "0") +
        "-" +
        String(value.$D).padStart(2, "0");
      setItem((prev) => {
        return {
          ...prev,
          birthDate: data,
        };
      });
    }
  };
  const handleClearData = () => {
    setItem(initialItem);
  };
  return (
    <form className="formCreateEmployeeContainer">
      {/* {productPayload.loading && <Loading />} */}
      <div className="employeeInfo">
        <div className="employeeField">
          <label className="employeeFieldTitle">First name: </label>
          <TextInput
            height="48px"
            value={item.firstName}
            placeHolderText="Employee's first name"
            onChange={(e) => {
              setItem((prev) => {
                return {
                  ...prev,
                  firstName: e.target.value,
                };
              });
            }}
          />
          <label className="employeeFieldTitle">Last name: </label>
          <TextInput
            height="48px"
            value={item.lastName}
            placeHolderText="Employee's last name"
            onChange={(e) => {
              setItem((prev) => {
                return {
                  ...prev,
                  lastName: e.target.value,
                };
              });
            }}
          />
        </div>

        <div className="employeeField">
          <div className="formCreateEmployeeGender">
            <label className="employeeFieldTitle">Gender: </label>
            <div className="radioGenderItemWrap">
              <RadioInput
                title="Female"
                checked={item.gender === Gender[Gender.FEMALE]}
                // value="Female"
                name="gender"
                onChange={(value) => {
                  setItem((prev) => {
                    return {
                      ...prev,
                      gender: value,
                    };
                  });
                }}
                value={Gender[Gender.FEMALE]}
              />
              <div className="sizedBox"></div>
              <RadioInput
                title="Male"
                // value="Male"
                checked={item.gender === Gender[Gender.MALE]}
                name="gender"
                onChange={(value) => {
                  setItem((prev) => {
                    return {
                      ...prev,
                      gender: value,
                    };
                  });
                }}
                value={Gender[Gender.MALE]}
              />
            </div>
          </div>
          <div className="formCreateEmployeeCalendar">
            <label className="employeeFieldTitle">Birth date: </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                views={["year", "month", "day"]}
                className="custom-date-picker"
                format="DD-MM-YYYY"
                onChange={(
                  value: any,
                  context: PickerChangeHandlerContext<DateValidationError>
                ) => handleDateChange(value, context)}
              />
            </LocalizationProvider>
          </div>
        </div>

        <div className="employeeField">
          <label className="employeeFieldTitle">Username: </label>
          <TextInput
            value={item.username}
            height="48px"
            placeHolderText="Username"
            onChange={(e) => {
              setItem((prev) => {
                return {
                  ...prev,
                  username: e.target.value,
                };
              });
            }}
          />
        </div>
        <div className="employeeField">
          <label className="employeeFieldTitle">Password: </label>
          <TextInput
            type="password"
            value={item.password}
            height="48px"
            placeHolderText="Password"
            onChange={(e) => {
              setItem((prev) => {
                return {
                  ...prev,
                  password: e.target.value,
                };
              });
            }}
          />
        </div>
      </div>
      <div className="submitCreateEmployee" onClick={handleSubmit}>
        <ElevatedButton text="Submit" width="300px" borderRadius={20} />
      </div>
    </form>
  );
};

export default FormCreateEmployee;
