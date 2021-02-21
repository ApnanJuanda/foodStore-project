import * as React from "react";
import StoreLogo from "../StoreLogo/index";
import { useSelector } from "react-redux";
import { Responsive, ButtonCircle } from "upkit";
import { Link } from "react-router-dom";
import FaUser from '@meronex/icons/fa/FaUser';

const TopBar = () => {
  //dapatkan state auth
  let auth = useSelector((state) => state.auth);

  return (
    <Responsive desktop={2} justify="between" items="center">
      {/* Sisi kiri */}
      <div>
        <StoreLogo />
      </div>

      {/* Sisi kanan */}
      <div className="mr-5 text-right">
        <Link to={auth?.user ? "/account" : "/login"}>
          <div clasName="mr-2 inline-block text-red-600 font-bold">
            {auth?.user?.full_name}
          </div>

          <ButtonCircle icon={<FaUser />} />
        </Link>
      </div>
    </Responsive>
  );
};

export default TopBar;
