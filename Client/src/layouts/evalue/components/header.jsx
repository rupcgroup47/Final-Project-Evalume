import React from "react";

// Material Dashboard 2 React examples
import { Container, Typography } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
// Data

// Material Dashboard 2 React contexts
import { useMaterialUIController, setDirection } from "context";

export default function HeaderFrom({ setShowFormComponent, updateObject, isOld }) {
  const [, dispatch] = useMaterialUIController();
  const [allForms, setForms] = useState(["שאלון 1", "שאלון 2"]);
  const [existForm, setExistForm] = useState();
  const [roleTypeArray, setRoleTypeArray] = useState(["עובד", "מנהל"]);
  const [roleGroupTypeArray, setRoleGroupTypeArray] = useState(["כללי", "תפעולי", "משרדי"]);

  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");
    return () => setDirection(dispatch, "ltr");
  }, []);

  const [roleType, setRoleType] = useState("");
  const [roleGroupType, setRoleGroupType] = useState("");

  const handleChangeRole = (event) => {
    setRoleType(event.target.value);
  };
  const handleChangeType = (event) => {
    setRoleGroupType(event.target.value);
  };

  const handleChangeExistForm = (event) => {
    //chosen exist form
    setExistForm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (existForm != undefined) {
      //check if the questions arrive from exist form
      const newForm = {
        groupType: roleGroupType,
        roleType: roleType,
        chosenForm: existForm,
      };
      updateObject(newForm); // send to the parent component the form type
    } else {
      const newForm = {
        //check if the questions arrive all the questions in DB
        groupType: roleGroupType,
        roleType: roleType,
      };
      updateObject(newForm); // send to the parent component the form type
    }
  };

  return (
    <Container maxWidth="xl" sx={{ pt: 5, pb: 5, background: "white", borderRadius: "15px" }}>
      <Typography sx={{ m: 2 }}>אנא בחר את סוג השאלון שברצונך לבנות</Typography>
      <Stack
        key="header"
        direction="row"
        spacing={12}
        justifyContent="flex-start"
        alignItems="center"
      >
        <form onSubmit={handleSubmit} style={{ display: "inherit", verticalAlign: "middle" }}>
          <FormControl sx={{ m: 2, minWidth: 120 }}>
            <InputLabel id="roleGroupType">סוג תפקיד</InputLabel>
            <Select
              labelId="roleGroupType"
              id="roleGroupTypeSelect"
              value={roleGroupType}
              label="סוג תפקיד"
              onChange={handleChangeType}
              required
              style={{ height: "50px", alignContent: "center" }}
            >
              {roleGroupTypeArray.map((roleGroupType, index) => (
                <MenuItem key={index} value={roleGroupType}>
                  {roleGroupType}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 2, minWidth: 120 }}>
            <InputLabel id="roleType">דרג</InputLabel>
            <Select
              labelId="roleType"
              id="roleTypeSelect"
              value={roleType}
              label="דרג"
              onChange={handleChangeRole}
              required
              style={{ height: "50px", alignContent: "center" }}
            >
              {roleTypeArray.map((roleType, index) => (
                <MenuItem key={index} value={roleType}>
                  {roleType}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {isOld && (
            <FormControl sx={{ m: 2, minWidth: 120 }}>
              <InputLabel id="roleType">שאלון קיים</InputLabel>
              <Select
                labelId="existForm"
                id="existFormSelect"
                value={existForm}
                label="שאלון"
                onChange={handleChangeExistForm}
                required
                style={{ height: "50px", alignContent: "center" }}
              >
                {allForms.map((form, index) => (
                  <MenuItem key={index} value={form}>
                    {form}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <Button type="submit">המשך</Button>
        </form>
      </Stack>
    </Container>
  );
}
