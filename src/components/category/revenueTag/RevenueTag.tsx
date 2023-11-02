import React from "react";
import "./revenuetag.scss";
type Props = {
  title: string;
  content: string;
  subContent: string;
  icon: React.ReactNode;
  subContentColor?: string;
  iconColor?: string;
};
const RevenueTag: React.FC<Props> = (props) => {
  const { title, content, subContent, icon, subContentColor, iconColor } =
    props;
  const subContentStyle = {
    color: subContentColor,
  };
  const iconStyle = {
    color: iconColor,
  };
  return (
    <div className="revenueTagContainer">
      <div className="revenueTagCard">
        <div className="revenueTagTitle">{title}</div>
        <div className="revenueTagBody">
          <div className="revenueTagContent">
            <div className="revenueTagText">{content}</div>
          </div>
          <div className="revenueTagDifference" style={subContentStyle}>
            {subContent}
          </div>
          <div className="revenueTagIcon" style={iconStyle}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueTag;
