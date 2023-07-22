import { getApiKey } from "../LocalStorage";
import Parkings from "../../pages/parkings/List";
import ParkingForm from "../../pages/parkings/Form";
import ParkingsAdmins from "../../pages/parkingAdmins/List";
import ParkingAdminForms from "../../pages/parkingAdmins/Form";
import ZoneList from "../../pages/zones/List";
import ZoneForm from "../../pages/zones/Form";
import ListToApprove from "../../pages/whiteLists/ListToApprove";
import ApprovedList from "../../pages/whiteLists/ApprovedList";
import UserParkings from "../../pages/userParkings/List";
import RequestedList from "../../pages/userParkings/requested";
import Home from "../../pages/home";
import Logs from "../../pages/parkingAdminLogs";
import UserLogs from "../../pages/userLogs";
import Profile from "../../pages/profile";

const systemAdmin = [
  {
    path: "/",
    name: "خانه",
    key: "home",
    component: Home,
  },
  {
    path: "/parkings",
    name: "پارکینگ ها",
    key: "parking-list",
    component: Parkings,
    exact: true,
  },
  {
    path: "/parking/new",
    name: "Parking",
    key: "parking-detail",
    component: ParkingForm,
  },
  {
    path: "/parking/:id",
    name: "Parking",
    key: "parking-detail",
    component: ParkingForm,
  },
  {
    path: "/parking-admins",
    name: "پارکینگ ادمین ها",
    key: "parking-admins-list",
    component: ParkingsAdmins,
    exact: true,
  },
  {
    path: "/parking-admin/new",
    name: "ParkingAdmins",
    key: "parking-admins-detail",
    component: ParkingAdminForms,
  },
  {
    path: "/parking-admin/:id",
    name: "ParkingAdmins",
    key: "parking-admins-detail",
    component: ParkingAdminForms,
  },
];

const parkingAdmin = [
  {
    path: "/",
    name: "خانه",
    key: "home",
    component: Home,
  },
  {
    path: "/zones",
    name: "زون ها",
    key: "zones-list",
    component: ZoneList,
    exact: true,
  },
  {
    path: "/zone/new",
    name: "zone",
    key: "zone-detail",
    component: ZoneForm,
  },
  {
    path: "/zone/:id",
    name: "zone",
    key: "zone-detail",
    component: ZoneForm,
  },
  {
    path: "/white-lists-to-approve",
    name: "عملیات لیست سفید",
    key: "white-lists-to-approve",
    component: ListToApprove,
    exact: true,
  },
  {
    path: "/white-lists-approved",
    name: "لیست سفید تایید شده",
    key: "white-lists-approved",
    component: ApprovedList,
    exact: true,
  },
  {
    path: "/logs",
    name: "لاگ ها",
    key: "logs",
    component: Logs,
    exact: true,
  },
];

const user = [
  {
    path: "/",
    name: "خانه",
    key: "home",
    component: Home,
  },
  {
    path: "/profile",
    name: "پروفایل",
    key: "profile",
    component: Profile,
    exact: true,
  },
  {
    path: "/parkings",
    name: "پارکینگ ها",
    key: "parkings-list",
    component: UserParkings,
    exact: true,
  },
  {
    path: "/requested-list",
    name: "درخواست ها",
    key: "parkings-requested-list",
    component: RequestedList,
    exact: true,
  },
  {
    path: "/logs",
    name: "لاگ ها",
    key: "logs",
    component: UserLogs,
    exact: true,
  },
];

export const GenerateRoutes = () => {
  let routes: {
    path: string;
    name: string;
    component: React.FC<unknown>;
    exact?: boolean;
  }[] = [];
  const key = getApiKey();
  switch (key) {
    case "system":
      routes = systemAdmin;
      break;
    case "parking":
      routes = parkingAdmin;
      break;
    case "user":
      routes = user;
      break;
    default:
      routes = [];
      break;
  }
  return routes;
};
