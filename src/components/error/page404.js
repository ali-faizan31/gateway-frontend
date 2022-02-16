import React from "react";
import { FContainer, FGrid, FGridItem, FItem } from "ferrum-design-system";
import { Link } from "react-router-dom";
import { PATH_DASHBOARD } from "../../routes/paths";

const page404 = () => {
  return (
    <FContainer type={"fluid"}>
      <FItem align={"center"}>Page Not Found</FItem> 
      <FItem align={"center"} className={"f-mt-1 w-100"}>
        Go Back
        <Link
          className="primary-color text-decoration-none "
          to={PATH_DASHBOARD.home}
        >
          Home
        </Link>
      </FItem>
    </FContainer>
  );
};

export default page404;
