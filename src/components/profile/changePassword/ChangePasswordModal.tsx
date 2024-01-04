import React, { useEffect, useState } from "react";
import "./changepasswordmodal.scss";
import { useSelector } from "react-redux";
import { profileSelector } from "../../../services/redux/selecters/selector";

import { useAppDispatch } from "../../../services/redux/useTypedSelector";
import { changeEmployeePasswordSchema } from "../../../validators/EmployeeValidateSchema";
import useValidator from "../../../hooks/useValidator";

import TextInput from "../../shared/textInput/TextInput";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ElevatedButton from "../../shared/elevatedButton/ElevatedButton";
import { changePasswordProfile } from "../../../services/redux/slices/profile.slice";

type Props = {
  onClose: () => void;
  onCloseWhenClickOutSite?: boolean;
};

const ChangePasswordModal: React.FC<Props> = (props) => {
  const { onClose, onCloseWhenClickOutSite = false } = props;
  const dispatch = useAppDispatch();
  const profilePayload = useSelector(profileSelector);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const { errors, validate } = useValidator(changeEmployeePasswordSchema);

  useEffect(() => {
    if (profilePayload.succeed) {
      onClose();
    }
  }, [profilePayload.succeed, onClose]);
  // event handlers =================================================================

  const handleChangePasswordProfile = async () => {
    const result = validate({ password, rePassword });
    if (result) {
      await dispatch(
        changePasswordProfile({
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
        <div className="changePwdEmplTitle">Change password</div>
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
                onClick={handleChangePasswordProfile}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
