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

import UsersTable from "./UsersTable";
import { Container } from "@mui/material";
import { useState, useContext, useEffect, createContext, useMemo } from "react";
import { MainStateContext } from "App";
import { DepartmentStateContext } from "context/globalVariables";
// import ApiFetcher from "components/ApiFetcher";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setDirection } from "context";

function Users() {
  const [users, setUsers] = useState([]);
  const [, dispatch] = useMaterialUIController();
  // const [validationsMsg, setMsg] = useState("");
  const { mainState, setMainState } = useContext(MainStateContext);
  const [depState, setDepState] = useState([]);
  const apiUserUrl = "https://localhost:7079/api/Employee";
  const apiDeprUrl = "https://localhost:7079/api/Department";

  // bring all the users using GET api
  useEffect(() => {
    // const abortController = new AbortController();
    // const signal = abortController.signal;

    // ApiFetcher({
    //   api: "https://localhost:7079/api/Employee",
    //   method: "GET",
    //   body: null,
    //   signal: signal,
    //   onFetchComplete: setUsers,
    //   onFetchError: (error)=>console.log("err get=", error),
    // });

    // return () => {
    //   abortController.abort();
    //   // stop the query by aborting on the AbortController on unmount
    // };
    const abortController = new AbortController()
    if (mainState.is_Admin) {
      fetch(
        apiUserUrl,
        {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json; charset=UTF-8",
            Accept: "application/json; charset=UTF-8",
          }),
          body: undefined,
          signal: abortController.signal
        })
        .then(async response => {
          const data = await response.json();
          console.log(response);

          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }

          return data;
        })
        .then(
          (result) => {
            console.log("success");
            setUsers(result);
          },
          (error) => {
            if (error.name === 'AbortError') return
            console.log("err get=", error);
            throw error
          }
        );
      return () => {
        abortController.abort()
        // stop the query by aborting on the AbortController on unmount
      }
    }
  }, []);

  useEffect(() => {
    // Get importent details and set the main context
    const abortController = new AbortController();
    fetch(apiDeprUrl, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
      signal: abortController.signal,
    })
      .then(async (response) => {
        const data = await response.json();
        console.log(response);

        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }

        return data;
      })
      .then(
        (result) => {
          console.log("success");
          if (!localStorage.getItem("Department list")) {
            localStorage.setItem("Department list", JSON.stringify(result));
          }
          setDepState(result.map((index) => (index.depName)));
        },
        (error) => {
          if (error.name === "AbortError") return;
          console.log("err get=", error);
          throw error;
        }
      );
    return () => {
      abortController.abort();
      // stop the query by aborting on the AbortController on unmount
    };
  }, []);

  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");
    return () => setDirection(dispatch, "ltr");
  }, []);

  const value = useMemo(
    () => ({
      depState,
      setDepState,
    }),
    [depState]
  );

  return (
    <DepartmentStateContext.Provider value={value}>
      <Container maxWidth="xl" sx={{ pt: 5, pb: 5 }}>
        <UsersTable users={users} setUsers={setUsers} />
      </Container>
    </DepartmentStateContext.Provider>
  );
}

export default Users;
