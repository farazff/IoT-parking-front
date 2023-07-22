import { getApiKey, getNumber } from "../../utils/LocalStorage";
import "./style.scss";

function UserBar() {
  const apiKey = getApiKey();
  const number = getNumber();

  return (
    <div className="userBar">
      <p>منو</p>
      <p>
        نوع کاربر :
        {apiKey === "system"
          ? "سیستم ادمین"
          : apiKey === "parking"
          ? "پارکینگ ادمین"
          : "کاربر معمولی"}
      </p>
      <p>شماره کاربر: {number}</p>
    </div>
  );
}

export default UserBar;
