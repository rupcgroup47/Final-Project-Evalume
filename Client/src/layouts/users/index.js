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

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import UsersTable from "./UsersTable";
import { Container } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";


// Data

// Material Dashboard 2 React contexts
import { useMaterialUIController, setDirection } from "context";

const _users = [
  {
    id: 1,
    userId: "a",
    firstName: "נועה",
    lastName: "זיו",
    // userAvatar: "https://randomuser.me/api/portraits/men/75.jpg",
    userEmail: "svitovid.ostrozkiy@example.com",
    userGender: "נקבה",
    userDepartment: "כספים",
    userJob: "מנהלת חשבונות",
  },
  {
    id: 2,
    userId: "b",
    firstName: "William",
    lastName: "Ennis",
    // userAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
    userEmail: "william.ennis@example.com",
    userGender: "Female",
    userDepartment: "Logistic",
    userJob: "Software Engineer",
  },
  {
    id: 3,
    userId: "c",
    firstName: "Taara",
    lastName: "Ramesh",
    // userAvatar: "https://randomuser.me/api/portraits/men/12.jpg",
    userEmail: "kenaa3@example.com",
    userGender: "Male",
    userDepartment: "Human Resource",
    userJob: "Software Engineer",
  },
  {
    id: 4,
    userId: "d",
    firstName: "Angelica",
    lastName: "Gautier",
    // userAvatar: "https://randomuser.me/api/portraits/men/64.jpg",
    userEmail: "angelica.gautier@example.com",
    userGender: "Female",
    userDepartment: "Logistic",
    userJob: "Software Engineer",
  },
  {
    id: 5,
    userId: "e",
    firstName: "Isaac",
    lastName: "Wood",
    // userAvatar: "https://randomuser.me/api/portraits/men/41.jpg",
    userEmail: "isaac.wood@example.com",
    userGender: "Male",
    userDepartment: "Finance",
    userJob: "Software Engineer",
  },

  {
    id: 6,
    userId: "F",
    firstName: "Gladko",
    lastName: "Balabuha",
    // userAvatar: "https://randomuser.me/api/portraits/men/61.jpg",
    userEmail: "gladko.balabuha@example.com",
    userGender: "Male",
    userDepartment: "Finance",
    userJob: "Software Engineer",
  },
];
function Users() {
  const [users, setUsers] = useState(_users);
  const [, dispatch] = useMaterialUIController();

  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");
    return () => setDirection(dispatch, "ltr");
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
    <Container maxWidth="xl" sx={{ pt: 5, pb: 5 }}>
    <UsersTable users={users} setUsers={setUsers} />
  </Container>
  </DashboardLayout>

  );
}

export default Users;
