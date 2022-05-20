import React from "react";
import { FContainer, FItem } from "ferrum-design-system";
import { Link } from "react-router-dom";
import { PATH_PUBLIC_USER } from "../../routes/paths";
import { cFRM_Trading_Competition_Details } from "../../utils/const.utils";

const page404 = () => {
  return (
    <FContainer type={"fluid"}>
      <FItem align={"center"}>Page Not Found</FItem>
      <FItem align={"center"} className={"f-mt-1 w-100"}>
        Go Back
        <Link className="primary-color text-decoration-none " to={`${PATH_PUBLIC_USER.competition.root}/${cFRM_Trading_Competition_Details.id}`}>
          Home
        </Link>
      </FItem>
    </FContainer>
  );
};

export default page404;
