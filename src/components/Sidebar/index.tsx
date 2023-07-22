import React, { useRef, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMutation } from "react-query";
import { SignOut } from "../../api/SignIn";
import { GeneralDataContext } from "../../store/GeneralContext";
import { SidebarProps } from "./Sidebar.props";
import IconLogo from "../../assets/icons/Parking.svg";
import { getApiKey } from "../../utils/LocalStorage";
import "./style.scss";

const Sidebar = React.memo<SidebarProps>(({ routes }) => {
  const path = useLocation().pathname;
  const user = getApiKey();
  const ref = useRef<any>(null);
  const [, setState] = useContext(GeneralDataContext);

  const { mutate } = useMutation(SignOut, {
    onSuccess: (res) => {
      if (res.status === 200) {
        setState(false);
        localStorage.clear();
        window.location.href = "/sign-in";
      }
    },
  });

  return (
    <nav className={`sidebar`} ref={ref}>
      <div className="mt-3">
        <div className="w-100 d-flex align-items-center justify-content-center">
          <img src={IconLogo} alt="logo" width={60} className="mb-4" />
        </div>
        {routes?.map((route) => {
          if (route.exact) {
            return (
              <div className="routes-container" key={route.key}>
                <Link
                  className={`nav-title ${
                    path.includes(route.path) ? "active" : ""
                  }`}
                  to={route.path}
                >
                  {route.name}
                </Link>
              </div>
            );
          }
        })}
        <div className="routes-container">
          <p className="nav-title" onClick={() => mutate(user)}>
            خروج از حساب
          </p>
        </div>
      </div>
    </nav>
  );
});

export default Sidebar;
