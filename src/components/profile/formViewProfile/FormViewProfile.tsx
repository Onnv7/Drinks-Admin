import React, { useEffect, useState } from "react";
import "./formviewprofile.scss";
import { IUpdateEmployeeReq } from "../../../interfaces/request/employee.request";
import { useAppDispatch } from "../../../services/redux/useTypedSelector";
import {
  PickerChangeHandlerContext,
  DateValidationError,
  LocalizationProvider,
  DatePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { Gender } from "../../../enums/Gender";
import { profileSelector } from "../../../services/redux/selecters/selector";
import { updateEmployeeSchema } from "../../../validators/EmployeeValidateSchema";
import useValidator from "../../../hooks/useValidator";
import ElevatedButton from "../../shared/elevatedButton/ElevatedButton";
import OutLineButton from "../../shared/outlineButton/OutLineButton";
import RadioInput from "../../shared/radioInput/RadioInput";
import TextInput from "../../shared/textInput/TextInput";
import { updateProfile } from "../../../services/redux/slices/profile.slice";
import ChangePasswordModal from "../changePassword/ChangePasswordModal";

const FormViewProfile = () => {
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

  const profilePayload = useSelector(profileSelector);
  const { errors, validate } = useValidator(updateEmployeeSchema);
  const [item, setItem] = useState(profilePayload.profile ?? initialItem);
  const [openChangePwdModal, setOpenChangePwdModal] = useState(false);

  useEffect(() => {
    if (profilePayload.profile) {
      setItem(profilePayload.profile);
    }
  }, [profilePayload.profile]);

  // event handlers ==============================================================
  const handleSubmit = async () => {
    const result = validate(item);

    if (result) {
      await dispatch(updateProfile({ profile: item }));
    }
  };

  const handleDateChange = (
    value: any,
    context: PickerChangeHandlerContext<DateValidationError>
  ) => {
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

  return (
    <form className="formViewEmployeeContainer">
      {openChangePwdModal && (
        <ChangePasswordModal
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
            errorMessage={errors.firstName}
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
            errorMessage={errors.lastName}
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
            <div className="formViewEmployeeCalendarInput">
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
              {errors.birthDate && (
                <span className="formViewEmployeeCalendarErrorMessage">{`*${errors.birthDate}`}</span>
              )}
            </div>
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
            readOnly={true}
            errorMessage={errors.username}
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
        {/* <div className="employeeField">
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
        </div> */}
      </div>
      <div className="submitCreateEmployee" onClick={handleSubmit}>
        <ElevatedButton text="Submit" width="300px" borderRadius={20} />
      </div>
    </form>
  );
};

export default FormViewProfile;
