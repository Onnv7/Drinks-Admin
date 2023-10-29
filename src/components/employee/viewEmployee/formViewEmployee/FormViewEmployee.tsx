import React, { useEffect, useState } from "react";
import "./formviewemployee.scss";
import ElevatedButton from "../../../shared/elevatedButton/ElevatedButton";
import TextInput from "../../../shared/textInput/TextInput";
import "react-calendar/dist/Calendar.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import RadioInput from "../../../shared/radioInput/RadioInput";
import {
  ICreateEmployeeReq,
  IUpdateEmployeeReq,
} from "../../../../interfaces/request/employee.request";
import { Gender } from "../../../../enums/Gender";
import {
  DatePicker,
  DateValidationError,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers";
import { useAppDispatch } from "../../../../services/redux/useTypedSelector";

import {
  changePassword,
  creteEmployee,
  updateEmployee,
} from "../../../../services/redux/slices/employee.slice";
import { useSelector } from "react-redux";
import { employeeSelector } from "../../../../services/redux/selecters/selector";
import dayjs from "dayjs";
import OutLineButton from "../../../shared/outlineButton/OutLineButton";
import DropList from "../../../shared/dropList/DropList";
import ChangePasswordEmployeeModal from "../changePassword/ChangePasswordEmployeeModal";

const FormViewEmployee = () => {
  const initialItem = {
    id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: "",
    enabled: false,
  } as IUpdateEmployeeReq;
  const dispatch = useAppDispatch();

  const employeePayload = useSelector(employeeSelector);
  const [item, setItem] = useState(employeePayload.viewEmployee ?? initialItem);
  const [openChangePwdModal, setOpenChangePwdModal] = useState(false);

  useEffect(() => {
    if (employeePayload.viewEmployee) setItem(employeePayload.viewEmployee);
  }, [employeePayload.viewEmployee]);

  // event handlers ==============================================================
  const handleSubmit = async () => {
    console.log(item);
    await dispatch(updateEmployee({ employee: item, id: item.id }));
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
  // const handleChangePassword = async () => {
  //   await dispatch(changePassword({id: item.id, }))
  // }
  return (
    <form className="formViewEmployeeContainer">
      {openChangePwdModal && (
        <ChangePasswordEmployeeModal
          onClose={() => setOpenChangePwdModal(false)}
          onCloseWhenClickOutSite={true}
        />
      )}
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
          <div className="formViewEmployeeGender">
            <label className="employeeFieldTitle">Gender: </label>
            <div className="radioGenderItemWrap">
              <RadioInput
                title="Female"
                checked={item.gender === Gender[Gender.FEMALE]}
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
                checked={item.gender === Gender[Gender.MALE]}
                name="gender"
                onChange={(value) => {
                  console.log("object", value);
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
          <div className="formViewEmployeeCalendar">
            <label className="employeeFieldTitle">Birth date: </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                views={["year", "month", "day"]}
                className="custom-date-picker"
                format="DD-MM-YYYY"
                value={dayjs(item.birthDate)}
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
          <div className="formViewEmployeeChangePasswordWrap">
            <OutLineButton
              text="Change password"
              width="200px"
              height="48px"
              onClick={() => setOpenChangePwdModal(true)}
            />
          </div>
        </div>
        <div className="employeeField">
          <label className="employeeFieldTitle">Status: </label>
          <DropList
            labels={["Enable", "Disable"]}
            values={[true, false]}
            title={"Select status"}
            indexSelected={item.enabled ? 0 : 1}
            // onChangeSelected={handleChangeStatus}
            onChangeValue={(value: any) => {
              setItem((prev) => {
                return { ...prev, enabled: value };
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

export default FormViewEmployee;
