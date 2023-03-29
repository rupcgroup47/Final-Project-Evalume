import React from "react";

// Material Dashboard 2 React examples
import { Container, Typography } from "@mui/material";
import { useEffect } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";


// Data

// Material Dashboard 2 React contexts
import { useMaterialUIController, setDirection } from "context";

export default function HeaderFrom() {
  const [, dispatch] = useMaterialUIController();

  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");
    return () => setDirection(dispatch, "ltr");
  }, []);

  const [roleType, setRoleType] = React.useState('');
  const [roleGroupType, setRoleGroupType] = React.useState('');

  const handleChangeRole = (event) => {
    setRoleType(event.target.value);
  };
  const handleChangeType = (event) => {
    setRoleGroupType(event.target.value);
  };

  return (
    <Container maxWidth="xl" sx={{ pt: 5, pb: 5 , background: "white", borderRadius: "15px"}}>
      <Typography sx={{m:2}}>אנא בחר את סוג השאלון שברצונך לבנות</Typography>
      <Stack
        key="header"
        direction="row"
        spacing={12}
        justifyContent="flex-start"
        alignItems="center"
      >
        <FormControl required sx={{ m: 2, minWidth: 120 }}>
          <InputLabel id="roleGroupType">סוג תפקיד</InputLabel>
          <Select
            labelId="roleGroupType"
            id="roleGroupTypeSelect"
            value={roleGroupType}
            label="סוג תפקיד"
            onChange={handleChangeType}
            style={{ height: "50px" , alignContent: "center"}}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>כללי</MenuItem>
            <MenuItem value={2}>תפעולי</MenuItem>
            <MenuItem value={3}>משרדי</MenuItem>
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl>
        <FormControl required sx={{ m: 2, minWidth: 120 }}>
          <InputLabel id="roleType">דרג</InputLabel>
          <Select
            labelId="roleType"
            id="roleTypeSelect"
            value={roleType}
            label="דרג"
            onChange={handleChangeRole}
            style={{ height: "50px" , alignContent: "center"}}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={0}>עובד</MenuItem>
            <MenuItem value={1}>מנהל</MenuItem>
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl>
        <Button>המשך</Button>
      </Stack>
    </Container>
  );
}