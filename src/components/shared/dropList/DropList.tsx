import React, { memo, useEffect, useState } from "react";
import "./droplist.scss";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
type Props = {
  title: string;
  labels: string[];
  values: any[];
  indexSelected?: number;
  indexValue?: number;
  // onChangeSelected?: (index: number) => void;
  onChangeValue?: (index: string) => void;
  errorMessage?: string;
  width?: string;
  height?: string;
};
const DropList: React.FC<Props> = (props) => {
  const {
    title,
    labels,
    indexSelected,
    // onChangeSelected,
    onChangeValue,
    values,
    errorMessage,
    width = "100%",
    height,
  } = props;
  const [openOption, setOpenOption] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(indexSelected);

  const handleSelected = (index: number) => {
    setSelectedIndex(index);
    setOpenOption(false);
    // if (onChangeSelected) {
    //   onChangeSelected(index);
    // }
    if (onChangeValue) {
      onChangeValue(values[index]);
    }
  };
  useEffect(() => {
    setSelectedIndex(indexSelected);
  }, [indexSelected]);
  const containerStyle = {
    width: width,
    height: height,
  };
  return (
    <div className="dropListContainer" style={containerStyle}>
      <div
        className="dropListHeader"
        onClick={() => setOpenOption(!openOption)}
      >
        <div className="dropListTitle">
          {selectedIndex !== undefined && selectedIndex !== -1
            ? labels[selectedIndex]
            : title}
        </div>
        {openOption ? <ArrowDropUpRoundedIcon /> : <ArrowDropDownRoundedIcon />}
      </div>
      {errorMessage?.length! > 0 ? (
        <span className="dropListErrorMessage">{`*${errorMessage}`}</span>
      ) : (
        <></>
      )}
      {openOption && (
        <div className="dropListBody">
          <div className="dropListElements">
            <ul>
              {labels.map((item, index) => {
                if (index === selectedIndex) {
                  return (
                    <li
                      key={index}
                      className="activeItemDropList"
                      onClick={(e) => handleSelected(index)}
                    >
                      {item}
                    </li>
                  );
                }
                return (
                  <li key={index} onClick={(e) => handleSelected(index)}>
                    {item}
                  </li>
                );
              })}
              {/* <li>Item 1</li>
              <li>Item 2</li>
              <li className="activeItemDropList">Item 3</li>
              <li>Item 4</li>
              <li>Item 5</li> */}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(DropList);
