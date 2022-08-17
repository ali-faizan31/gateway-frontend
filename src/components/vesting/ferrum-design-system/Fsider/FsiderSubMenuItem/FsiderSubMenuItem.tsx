import React from "react";
import "../../assets/_Fsider-styles.scss";

interface FSiderSubMenuItemProps {
  children?: any;
}
export const FSiderSubMenuItem = ({
  children = undefined,
}: FSiderSubMenuItemProps) => {
  return (
    <>
      <div className={`f-sider-submenu-item`}>{children}</div>
    </>
  );
};
