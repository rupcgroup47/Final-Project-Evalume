/* eslint-disable */

/*
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect, useMemo, createContext } from "react";
import { isEqual } from "lodash";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
import routes from "routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav} from "context";
// , setOpenConfigurator
// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import EvalueContextProvider from "context/evalueVariables";
import Alerts from "layouts/profile/components/Alerts/Alerts";
import ApiFetcher from "components/ApiFetcher";
import dayjs from "dayjs";
import Swal from "sweetalert2";

export const MainStateContext = createContext();
export const EndDateContext = createContext();

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    // openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const [mainState, setMainState] = useState(null);
  const [showAlert, setShowAlert] = useState(true);
  const [openProcess, setOpenProcess] = useState(null);
  const [flag, setFlag] = useState(0);
  const [dateProcess, setDateProcess] = useState(null);
  const { pathname } = useLocation();
  const apiGetEndProcessDate = "https://proj.ruppin.ac.il/cgroup47/prod/EvaluFinalDate";  //  server
  const apiUpdateEndDate = "https://proj.ruppin.ac.il/cgroup47/prod/quesLimitDate"; //  server
  const apiFinishProcess = "https://proj.ruppin.ac.il/cgroup47/prod/EndOfEvalu";  //  server

    useEffect(() => {
      // Get user details from Local Storage
      const exisiting = localStorage.getItem("Current User");
      const areObjectsEqual = isEqual(mainState, JSON.parse(exisiting));
      if (!mainState) {
        const Employee = JSON.parse(exisiting);
        if (Employee) {
          setMainState(Employee);
        }
      }
      if (mainState !== null && exisiting !== null && areObjectsEqual === false) {
        localStorage.setItem("Current User", JSON.stringify(mainState)); // Set Current User details in local storage
      }
    }, [mainState]);

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  // const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route === "/authentication/sign-in") {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      if (route.route !== "/authentication/sign-in") {
        return (
          <Route
            exact
            path={route.route}
            element={
              <DashboardLayout>
                <DashboardNavbar />
                {route.component}
              </DashboardLayout>
            }
            key={route.key}
          />
        );
      }

      return null;
    });

  const value = useMemo(
    () => ({
      mainState,
      setMainState,
    }),
    [mainState]
  );

  const valueDate = useMemo(
    () => ({
      openProcess,
      setOpenProcess,
    }),
    [openProcess]
  );

  useEffect(() => {
    let isMounted = true;

    const getEnDate = async () => {
      try {
        const fetchedData = await ApiFetcher(apiGetEndProcessDate, "GET", null);
        if (isMounted) {
          console.log("success", fetchedData);
          console.log("success", dayjs(fetchedData, "YYYY-MM-DD"));

          if (fetchedData === "empty") {
            setOpenProcess(null);
          }
          else
            setOpenProcess(dayjs(fetchedData, "YYYY-MM-DD"));
        }
      }
      catch (error) {
        if (isMounted) {
          console.log(error);
        }
      }
    }
    getEnDate();

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      isMounted = false;
    };
  }, []);

  const handleShowAlert = (show) => {
    setShowAlert(show);
  };

  const handleCloseProcess = (status) => {
    setShowAlert(false);
    if (status) {
      setFlag(2);
    }
  };

  const handeleExtention = (newDate) => {
    setShowAlert(false);
    setDateProcess(newDate);
    setFlag(1);
  };

  useEffect(() => {
    let isMounted = true;

    if (flag === 1) {
      const updateEnDate = async () => {
        try {
          const fetchedData = await ApiFetcher(apiUpdateEndDate, "PUT", JSON.stringify(dayjs(dateProcess, "YYYY-MM-DD")));
          if (isMounted) {
            console.log("success", fetchedData);
            setFlag(0);
            Swal.fire({
              icon: "success",
              title: "תשובתך התקבלה",
              text: `תאריך היעד השתנה והינו ${dayjs(dateProcess).format("DD/MM/YYYY")}`,
            })
            setOpenProcess(dateProcess);
          }
        }
        catch (error) {
          if (isMounted) {
            console.log(error);
            Swal.fire({
              title: "פעולה בוטלה!",
              text: "אנא נסה שנית או פנה לעזרה מגורם מקצוע",
              icon: "error",
              showCloseButton: true,
              cancelButtonText: "סגור"
            });
          }
        }
      }
      updateEnDate();
    }
    else if (flag === 2) {
      const updateEnDate = async () => {
        try {
          const fetchedData = await ApiFetcher(apiFinishProcess, "PUT", null);
          if (isMounted) {
            console.log("success", fetchedData);
            setFlag(0);
            Swal.fire({
              icon: "success",
              title: "בקשתך התקבלה",
              text: "תהליך ההערכה הסתיים בהצלחה, נפגש בשנה הבאה!",
            })
          }
        }
        catch (error) {
          if (isMounted) {
            console.log(error);
            Swal.fire({
              title: "פעולה בוטלה!",
              text: "אנא נסה שנית או פנה לעזרה מגורם מקצוע",
              icon: "error",
              showCloseButton: true,
              cancelButtonText: "סגור"
            });
          }
        }
      }
      updateEnDate();
    }
    return () => {
      isMounted = false;
    }
  }, [flag]);

  if (!mainState && localStorage.getItem("Current User") !== null) {
    return (
      <Box
        sx={{
          display: "block",
          alignSelf: "center",
          alignItems: "center",
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <CircularProgress size={300} sx={{ alignSelf: "center", margin: 50 }} />
      </Box>
    );
  }

  return (
    <MainStateContext.Provider value={value}>
      <EndDateContext.Provider value={valueDate}>
        <EvalueContextProvider>
          {direction === "rtl" ? (
            <CacheProvider value={rtlCache}>
              <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
                <CssBaseline />
                {layout === "dashboard" && (
                  <>
                    <Sidenav
                      color={sidenavColor}
                      brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
                      brandName="פורטל הערכת עובדים"
                      routes={routes}
                      onMouseEnter={handleOnMouseEnter}
                      onMouseLeave={handleOnMouseLeave}
                    />
                    <Configurator />
                    {/* {configsButton} */}
                  </>
                )}
                {layout === "vr" && <Configurator />}
                <Routes>
                  {getRoutes(routes)}
                  {mainState && <Route path="*" element={<Navigate to="/profile" />} />}
                  {/* if main state (user logged in) initialize go to profile */}
                  {!mainState && <Route path="*" element={<Navigate to="/authentication/sign-in" />} />}
                  {/* if  user  not logged in  go to sign in */}

                </Routes>
              </ThemeProvider>
            </CacheProvider>
          ) : (
            <ThemeProvider theme={darkMode ? themeDark : theme}>
              <CssBaseline />
              {layout === "dashboard" && (
                <>
                  <Sidenav
                    color={sidenavColor}
                    brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
                    brandName="פורטל הערכת עובדים"
                    routes={routes}
                    onMouseEnter={handleOnMouseEnter}
                    onMouseLeave={handleOnMouseLeave}
                  />
                  <Configurator />
                  {/* {configsButton} */}
                </>
              )}
              {layout === "vr" && <Configurator />}
              <Routes>
                {getRoutes(routes)}
                {mainState && <Route path="*" element={<Navigate to="/profile" />} />}
                {!mainState && <Route path="*" element={<Navigate to="/authentication/sign-in" />} />}
              </Routes>
            </ThemeProvider>
          )}
          {showAlert && openProcess !== null ? <Alerts mainState={JSON.parse(localStorage.getItem("Current User"))} handleShowAlert={handleShowAlert} openProcess={openProcess} handeleExtention={handeleExtention} handleCloseProcess={handleCloseProcess} /> : null}
        </EvalueContextProvider>
      </EndDateContext.Provider>
    </MainStateContext.Provider>
  );
}
