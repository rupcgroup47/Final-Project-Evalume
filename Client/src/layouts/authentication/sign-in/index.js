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

import { useState } from "react";

// react-router-dom components
import { useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { useEffect } from "react";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setDirection } from "context";

const users = [
  {
    email: "admin1",
    password: "12345678",
  },
  {
    email: "admin2",
    password: "012345678",
  },
];

function Basic() {
  const [, dispatch] = useMaterialUIController(); // rtl
  const [validationsMsg, setMsg] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState({// User details temp object
    email: "",
    password: "",
  });


  const changeHandler = (e) => {// Catch the values from input
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const checkUser = () => {// Checking whether the user details exist and are appropriate, if they are appropriate, the user details go to the dashboard via navigate, if not, an error message pops up and the details must be re-entered
    const usercheck = users.find(
      (user) => user.email === data.email && user.password === data.password
    );
    if (usercheck) {
      console.log("Login successful");
      setMsg("");
      navigate("layouts/dashboard");
    } else {
      console.log("Wrong password or email");
      setMsg("פרטים לא נכונים או משתמש לא קיים");
    }
  };

  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");

    return () => setDirection(dispatch, "ltr");
  }, []);

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            התחברות
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="email"
                name="email"
                value={data.email}
                placeholder="אימייל"
                onChange={changeHandler}
                label="אימייל"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                name="password"
                value={data.password}
                placeholder="סיסמה"
                onChange={changeHandler}
                label="סיסמה"
                fullWidth
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" onClick={checkUser} fullWidth>
                התחבר{" "}
              </MDButton>
              <MDTypography variant="h4" color="black" mt={1}>
                {validationsMsg}
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
