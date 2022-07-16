import React, { useState, useLayoutEffect, useRef } from "react";
import CardFuturisticPrimary from "../assets/img/card-futuristic-primary.png";
import CardFuturisticSecondary from "../assets/img/card-futuristic-secondary.svg";
import CardFuturisticTartiary from "../assets/img/card-futuristic-tartiary.svg";
import CardFuturisticQuadratic from "../assets/img/card-futuristic-quadratic.svg";
import "../assets/_Fcard-styles.scss";
interface FcardProps {
  variant?: String;
  className?: String;
  onClick?: any;
  children?: any;
  style?: any;
  width?: String;
  height?: String;
}
export const FCard = ({ variant = "primary", className = "", children = undefined, style = undefined, width, height }: FcardProps) => {
  const card = useRef<any>("");
  const [cardSize, setCardSize] = useState<number>(0);
  useLayoutEffect(() => {
    function handleResize() {
      setCardSize(card.current.offsetWidth);
      // setWindowDimensions(getWindowDimensions());
      console.log("width", card.current.offsetWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={card}
      className={`f-card f-card-${variant} ${variant.includes("futuristic") ? "f-card-futuristic" : ""} ${className} ${variant.includes("futuristic-secondary") ? (cardSize > 722 ? "bg-contain" : "bg-cover") : ""
        }`}
      style={height || width ? { ...style, height: `${height}`, maxWidth: `${width}` } : undefined}>
      <div className="f-card-body">{children}</div>

      {variant.includes("futuristic") && variant === "futuristic-primary" ? (
        <div className={`bg-futuristic`}>
          <img src={CardFuturisticPrimary} alt={`img-${variant}`} />
          <img src={CardFuturisticPrimary} alt={`img-${variant}`} />
          <img src={CardFuturisticPrimary} alt={`img-${variant}`} />
          <img src={CardFuturisticPrimary} alt={`img-${variant}`} />
        </div>
      ) : // : variant === "futuristic-secondary" ? (
        //   <div className={`bg-futuristic`}>
        //     <img src={CardFuturisticSecondary} alt={`img-${variant}`} />
        //     <img src={CardFuturisticSecondary} alt={`img-${variant}`} />
        //   </div>
        // )
        variant === "futuristic-tartiary" ? (
          <div className={`bg-futuristic`}>
            <img src={CardFuturisticTartiary} alt={`img-${variant}`} />
            <img src={CardFuturisticTartiary} alt={`img-${variant}`} />
          </div>
        ) : variant === "futuristic-quadratic" ? (
          <div className={`bg-futuristic`}>
            <img src={CardFuturisticQuadratic} alt={`img-${variant}`} />
            <img src={CardFuturisticQuadratic} alt={`img-${variant}`} />
          </div>
        ) : null}
    </div>
  );
};
