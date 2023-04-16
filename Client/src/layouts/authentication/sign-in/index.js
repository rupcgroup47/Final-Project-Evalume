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
import bgImage from "assets/images/warehouse.jpg";
import { useEffect, useContext, useState } from "react";
// import { Notifications } from 'react-push-notification';
// import addNotification from 'react-push-notification';
  
// Material Dashboard 2 React contexts
import { useMaterialUIController, setDirection } from "context";
import { MainStateContext } from "App";
import { EvalueContext } from "context/evalueVariables";

function Basic() {
  const [, dispatch] = useMaterialUIController(); // rtl
  const [validationsMsg, setMsg] = useState("");
  const navigate = useNavigate();
  const { API } = useContext(EvalueContext);
  const [userData, setUserData] = useState({
    // User details temp object
    email: "",
    password: "",
  });
  const [userDetailsValidation, setUserDetailsValidation] = useState(false);
  const {mainState,setMainState} = useContext(MainStateContext);

  useEffect(() => {
    if (userDetailsValidation){
      fetch(API.apiUserUrllogin + "userEmail=" + userData.email + "&userpassword=" + userData.password, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json; charset=UTF-8",
        }),
      })
        .then(async response => {
          const data = await response.json();

          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
        })
        .then(
          (result) => {
            console.log(result);
            localStorage.setItem("Current User", JSON.stringify(result)); // Set user details in local storage
            console.log("Login successful");
            setMainState(result);
            setMsg("");
            navigate("layouts/profile");
          },
          (error) => {
            console.log("err get=", error);
            console.log("Wrong password or email");
            setMsg("פרטים לא נכונים או משתמש לא קיים");
            setUserDetailsValidation(false);
          }
        );
    }
   
  }, [userDetailsValidation]);

  const changeHandler = (e) => {
    // Catch the values from input
    setUserData({ ...userData, [e.target.name]: e.target.value });
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
                value={userData.email}
                placeholder="אימייל"
                onChange={changeHandler}
                label="אימייל"
                fullWidth
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                name="password"
                value={userData.password}
                placeholder="סיסמה"
                onChange={changeHandler}
                label="סיסמה"
                fullWidth
                required
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                onClick={() => setUserDetailsValidation(true)}
                fullWidth
              >
                התחבר{" "}
              </MDButton>
              <MDTypography variant="h4"  mt={1}>
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

  // const checkUser = () => {// Checking whether the user details exist and are appropriate, if they are appropriate, the user details go to the dashboard via navigate, if not, an error message pops up and the details must be re-entered
  //   // const usercheck = users.find(
  //   //   (user) => user.email === userData.email && user.password === userData.password
  //   // );
  //   if (usercheck) {
  //     localStorage.setItem('Current User', JSON.stringify(userData)); // Set user details in local storage
  //     console.log("Login successful");
  //     setMsg("");
  //     navigate("layouts/profile");
  //   } else {
  //     console.log("Wrong password or email");
  //     setMsg("פרטים לא נכונים או משתמש לא קיים");
  //   }
  // };