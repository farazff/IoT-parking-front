import React from "react";
import IconLogo from "../../assets/icons/Parking.svg";

function home() {
  return (
    <div className="w-100 h-100 d-flex align-items-center justify-content-center">
      <img src={IconLogo} alt="logo" width={500} className="mb-4" />
    </div>
  );
}

export default home;
