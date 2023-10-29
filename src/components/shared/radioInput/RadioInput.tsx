import React from "react";
import "./radioinput.scss";

type Props = {
  color?: string;
  checked?: boolean;
  name?: string;
  title?: string;
  value?: any;
  onChange?: (value: any) => void;
};

const RadioInput: React.FC<Props> = (props) => {
  const { color, name, title, value, checked, onChange } = props;

  return (
    <div className="radioInputContainer" onClick={onChange}>
      <input
        type="radio"
        name={name}
        id={value}
        value={value}
        checked={checked}
        className="radioInputRadio"
        onChange={() => {
          if (onChange) onChange(value);
        }}
      />
      <label htmlFor={value} className="radioInputLabel">
        {title}
      </label>
    </div>
  );
};

export default RadioInput;
