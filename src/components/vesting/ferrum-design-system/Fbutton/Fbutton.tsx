import React from "react";
import { truncateMiddle, truncateText } from "../assets/js/_helper";
import BtnFuturisticPrimaryLeft from "../assets/img/btn-futuristic-primary-side-left.png";
import BtnFuturisticPrimaryRight from "../assets/img/btn-futuristic-primary-side-right.png";
import BtnFuturisticSecondaryLeft from "../assets/img/btn-futuristic-secondary-side-left.png";
import BtnFuturisticSecondaryRight from "../assets/img/btn-futuristic-secondary-side-right.png";
import "../assets/_Fbutton-styles.scss";
interface FbuttonProps {
  title?: any;
  variant?: String;
  btnInfo?: any;
  rounded?: any;
  outlined?: any;
  className?: String;
  onClick?: any;
  prefix?: any;
  postfix?: any;
  style?: any;
  type?: any;
  disabled?: boolean;
  width?: String;
}
export const FButton = ({
  title,
  outlined,
  rounded,
  btnInfo,
  variant = "primary",
  className = "",
  onClick = () => { },
  prefix,
  postfix,
  style,
  type = "button",
  disabled = false,
  width = "",
}: FbuttonProps) => {
  return (
    <React.Fragment>
      {btnInfo ? (
        <div className="f-btn-wrap">
          <span className="f-btn-info">{btnInfo}</span>
          <button
            className={`f-btn f-btn-${variant} f-btn-${type} ${postfix ? "f-pl--7" : ""
              } ${prefix ? "f-pr--7" : ""} 
            ${rounded && "f-btn-rounded"} ${outlined && "f-btn-outlined"
              } ${className} `}
            onClick={onClick}
            style={style ? { ...style } : undefined}
            type={type}
            disabled={disabled}
          >
            {prefix && <span className="f-btn-icon f-prefix">{prefix}</span>}
            <span className="f-btn-title">{title}</span>
            {postfix && <span className="f-btn-icon f-postfix">{postfix}</span>}
          </button>
        </div>
      ) : (
        <div
          className={`${variant.includes("futuristic")
            ? `btn-futuristic-wrap f-btn-${variant}-wrap`
            : ""
            }  ${variant.includes("futuristic") ? className : ""}${width}`}
        >
          {variant.includes("futuristic") && (
            <img
              className="btn-img left"
              src={
                variant === "futuristic-primary"
                  ? BtnFuturisticPrimaryLeft
                  : BtnFuturisticSecondaryLeft
              }
              alt="btn-img"
            ></img>
          )}
          <button
            className={`f-btn f-btn-${variant} f-btn-${type} ${postfix ? "f-pl--7" : ""
              } ${prefix ? "f-pr--7" : ""} 
          ${rounded && "f-btn-rounded"} ${outlined && "f-btn-outlined"} ${!variant.includes("futuristic") ? className : ""
              } ${width}`}
            onClick={onClick}
            style={style ? { ...style } : undefined}
            type={type}
            disabled={disabled}
          >
            {prefix && <span className="f-btn-icon f-prefix">{prefix}</span>}
            <span className="f-btn-title">{title}</span>
            {postfix && <span className="f-btn-icon f-postfix">{postfix}</span>}
          </button>
          {variant.includes("futuristic") && (
            <img
              className="btn-img right"
              src={
                variant === "futuristic-primary"
                  ? BtnFuturisticPrimaryRight
                  : BtnFuturisticSecondaryRight
              }
              alt="btn-img"
            ></img>
          )}
        </div>
      )}
    </React.Fragment>
  );
};
