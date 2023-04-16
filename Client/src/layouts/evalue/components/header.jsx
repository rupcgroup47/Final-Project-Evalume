import React from "react";
import { Container, Typography } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useMaterialUIController, setDirection } from "context";

export default function HeaderFrom(props) {
  const [, dispatch] = useMaterialUIController();
  const [allExistForms, setAllExistForms] = useState([]);//Display of all existing questionnaires as strings
  const [chosenExistForm, setChosenExistForm] = useState("");//The questionnaire selected in DDL
  const [roleTypeArray, setRoleTypeArray] = useState([{roleDesc :"עובד",value:0},{roleDesc :"מנהל",value:1}]);
  const [roleGroupTypeArray, setRoleGroupTypeArray] = useState([{roleDesc :"כללי",value:1},{roleDesc : "תפעולי",value:2},{roleDesc :"משרדי",value:3}]);
  const [showSelect, setShowSelect] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [roleType, setRoleType] = useState("");
  const [roleGroupType, setRoleGroupType] = useState("");
  const { isOld, setMyObject, setShowAddQuestion, existForms, setSendExistForms, setChosenParameters } = props;
  const [showFormSelect,setShowFormSelect] = useState(false);
  const [chosenTypes, setChosenTypes] = useState();

  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");
    return () => setDirection(dispatch, "ltr");
  }, []);

  useEffect(() => {
    const newData = existForms.map((item) => ({
      id: item.id,
      string: `שאלון ${item.id}-${item.year}`,
    }));
    setAllExistForms(newData);
  }, [existForms]);

  const handleChangeRole = (event) => {
    setRoleType(event.target.value);
  };
  const handleChangeType = (event) => {
    setRoleGroupType(event.target.value);
  };

  const handleChangeExistForm = (event) => {
    //chosen exist form
    setChosenExistForm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (chosenExistForm != undefined) {
      //check if the questions arrive from exist form
      const newForm = {
        groupType: roleGroupType,
        roleType: roleType,
        chosenForm: chosenExistForm,
      };
      setMyObject(newForm); // send to the parent component the form type
    } else {
      const newForm = {
        //check if the questions arrive all the questions in DB
        groupType: roleGroupType,
        roleType: roleType,
      };
      setMyObject(newForm); // send to the parent component the form type
    }
  };

  const handleButtonClick = () => {
    if (roleGroupType !== undefined && roleType !== undefined) {
      const selectedTypes = {
        groupType: roleGroupType,
        roleType: roleType,
      };
      setChosenParameters(selectedTypes);//pass data to index 
      setChosenTypes(selectedTypes);
      setShowSelect(true);
      setShowButton(true);
      setSendExistForms(true);
    } else {
      console.log("Error");
    }
  };

  const handleClick = () => {
    setShowAddQuestion(true);
    setShowFormSelect(true);
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
              disabled={showSelect}
              style={{ height: "50px", alignContent: "center" }}
            >
              {roleGroupTypeArray.map((roleGroupType, index) => (
                <MenuItem key={index} value={roleGroupType.value}>
                  {roleGroupType.roleDesc}
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
              disabled={showSelect}
              style={{ height: "50px", alignContent: "center" }}
            >
              {roleTypeArray.map((roleType, index) => (
                <MenuItem key={index} value={roleType.value}>
                  {roleType.roleDesc}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {isOld && (
            <Button disabled={showSelect} onClick={handleButtonClick}>
              המשך לבחירת שאלון קיים
            </Button>
          )}

          {isOld && showSelect && (
            <FormControl sx={{ m: 2, minWidth: 120 }}>
              <InputLabel id="roleType">שאלון קיים</InputLabel>
              <Select
                labelId="existForm"
                id="existFormSelect"
                value={chosenExistForm}
                label="שאלון"
                onChange={handleChangeExistForm}
                required
                disabled={showFormSelect}
                style={{ height: "50px", alignContent: "center" }}
              >
                {allExistForms.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.string}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {isOld && showButton && (
            <Button onClick={handleClick} type="submit">
              המשך
            </Button>
          )}
          {!isOld && <Button type="submit">המשך</Button>}
        </form>
      </Stack>
    </Container>
  );
}
