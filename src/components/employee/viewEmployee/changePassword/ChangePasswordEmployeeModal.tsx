import React, { useEffect, useState } from "react";
import "./changepasswordemployeemodal.scss";
import TextInput from "../../../shared/textInput/TextInput";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ElevatedButton from "../../../shared/elevatedButton/ElevatedButton";
import { useAppDispatch } from "../../../../services/redux/useTypedSelector";
import { changePassword } from "../../../../services/redux/slices/employee.slice";
import { useSelector } from "react-redux";
import { employeeSelector } from "../../../../services/redux/selecters/selector";
import { IChangePasswordReq } from "../../../../interfaces/request/employee.request";
import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changeEmployeePasswordSchema } from "../../../../validators/EmployeeValidateSchema";
import useValidator from "../../../../validators/useValidator";
type Props = {
  onClose: () => void;
  onCloseWhenClickOutSite?: boolean;
  onSubmit?: () => void;
};

interface ITest {
  password: string;
  rePassword: string;
}
const ChangePasswordEmployeeModal: React.FC<Props> = (props) => {
  const { onClose, onCloseWhenClickOutSite = false, onSubmit } = props;
  const dispatch = useAppDispatch();
  const employeePayload = useSelector(employeeSelector);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const { errors, validate } = useValidator(changeEmployeePasswordSchema);

  useEffect(() => {
    if (employeePayload.succeed) {
      onClose();
    }
  }, [employeePayload.succeed, onClose]);
  // event handlers =================================================================

  const handleChangePassword = async () => {
    const result = validate({ password, rePassword });
    if (result) {
      await dispatch(
        changePassword({
          id: employeePayload.viewEmployee?.id!,
          body: { password: password },
        })
      );
    }
  };

  return (
    <div
      className="changePwdEmplContainer"
      onClick={() => {
        if (onCloseWhenClickOutSite) onClose();
      }}
    >
      <div
        className="changePwdEmplModalCard"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="changePwdEmplModalCloseIcon" onClick={onClose}>
          <CloseRoundedIcon />
        </div>
        <div className="changePwdEmplTitle">Chang password</div>
        <div className="changePwdEmplBody">
          <div className="changePwdEmplField">
            <label className="changePwdEmplLabel">New password</label>
            <TextInput
              type="password"
              height="40px"
              placeHolderText="Enter new password"
              value={password}
              errorMessage={errors.password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="changePwdEmplField">
            <label className="changePwdEmplLabel">Re new password</label>
            <TextInput
              type="password"
              height="40px"
              placeHolderText="Re-Enter password"
              value={rePassword}
              errorMessage={errors.rePassword}
              onChange={(e) => setRePassword(e.target.value)}
            />
          </div>
          <div className="changePwdEmplField changePwdEmplButtonWrap">
            <div className="changePwdEmplButtonChange">
              <ElevatedButton
                text={"Change password"}
                borderRadius={12}
                onClick={handleChangePassword}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordEmployeeModal;
