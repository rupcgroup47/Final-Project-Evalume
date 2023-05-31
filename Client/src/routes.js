/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Users from "layouts/users";
import RTL from "layouts/rtl";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import Goals from "layouts/goals/Goals";
import Evaluations from "layouts/evaluation";
import EvalueForm from "layouts/evalue";
import { Outlet } from "react-router-dom";
import MyEvalues from "layouts/profile/components/MyEvalues";
import ReportGenerator from "layouts/OpenAI-ReportGenerator";
// @mui icons
import Icon from "@mui/material/Icon";
import ManagerEvalues from "layouts/evaluation/components/Evaluation-Steps/ManagerEvalues";
import MeetingCalendar from "layouts/meetings/Calendar";
import Feedback from "layouts/evaluation/components/feedback";
import BuildEvaluation from "layouts/evalue/buildEvaluation";
import GoalsInfoTable from "layouts/goals/GoalsInfoTable";
import UserInfo from "layouts/userInfo/userInfo";
const routes = [
  {
    type: "collapse",
    name: "מסך הבית",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "מידע למשתמש",
    key: "infp",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/userInfo",
    component: <UserInfo />,
    isHiddenFromSideNav: true

  },
  {
    type: "collapse",
    name: "כל היעדים",
    key: "allGoals",
    route: "/check",
    icon: <Icon fontSize="small">explore</Icon>,
    component: <GoalsInfoTable />,
    forAdmin: true,
    // isHiddenFromSideNav: true

  },
  {
    type: "collapse",
    name: "משתמשים",
    key: "users",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/users",
    component: <Users />,
    forAdmin: true,
  },
  {
    type: "collapse",
    name: "הקמת טופס הערכה",
    key: "evalueFormMain",
    icon: <Icon fontSize="small">feed</Icon>,
    route: "/evalueMain",
    component: <BuildEvaluation />,
    forAdmin: true,
  },
  ,
  {
    type: "collapse",
    name: "הקמת טופס הערכה",
    key: "evalueForm",
    icon: <Icon fontSize="small">feed</Icon>,
    route: "/evalue",
    component: <EvalueForm />,
    forAdmin: true,
    isHiddenFromSideNav: true

  },
  {
    type: "collapse",
    name: "פידבק",
    key: "feedback",
    icon: <Icon fontSize="small">feed</Icon>,
    route: "/feedback",
    component: <Feedback />,
    isHiddenFromSideNav: true
  },
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  {
    type: "collapse",
    name: "טופס הערכה שנתית",
    key: "evaluation",
    icon: <Icon fontSize="small">poll</Icon>,
    route: "/evaluation",
    component: <Evaluations />,
  },
  {
    type: "collapse",
    name: "יעדים",
    key: "goals",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/goals",
    component: <Goals />,
    forManager: true,
  },
  {
    type: "collapse",
    name: "דוחות וסטטיסטיקות",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
    forManager: true,
    // isHiddenFromSideNav: true,
  },
  {
    type: "collapse",
    name: "מחולל דוחות",
    key: "ReportGenerator",
    icon: <Icon fontSize="small">table_chart</Icon>,
    route: "/ReportGenerator",
    component: <ReportGenerator />,
    forManager: true,
    // isHiddenFromSideNav: true,
  },
  {
    type: "collapse",
    name: "התחברות",
    key: "sign-in",
    icon: <Icon fontSize="small">InsertDriveFile</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
    isHiddenFromSideNav: true,
  },
  {
    type: "collapse",
    name: "הערכות שלי",
    key: "my-evalues",
    icon: <Icon fontSize="small">InsertDriveFile</Icon>,
    route: "/myEvalues",
    component: <MyEvalues />,
    isHiddenFromSideNav: true,
  },
  {
    type: "collapse",
    name: "הערכות מנהל",
    key: "manager-evalues",
    icon: <Icon fontSize="small">InsertDriveFile</Icon>,
    route: "/managerEvalues",
    component: <ManagerEvalues />,
    isHiddenFromSideNav: true,
  },
  {
    type: "collapse",
    name: "יומן",
    key: "calendar",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/calendar",
    component: <MeetingCalendar />,
    isHiddenFromSideNav: true,
  },
];

export default routes;
