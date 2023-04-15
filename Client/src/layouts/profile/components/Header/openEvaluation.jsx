import { React, useState, useEffect } from "react";
import CreateYearlyProcessDialog from "dialog/CreateYearlyProcessDialog";
import { Button } from "@mui/material";
export default function OpenEvaluation() {
  const [showCreateOpenEvalueDialog, setShowCreateOpenEvalueDialog] = useState(false);
  const [columns,setRoleGroupTypes] = useState([]);
  const [rows, setRoleTypes] =useState([])

  const test = [
    {
      roleGrouptype: "משרדי",
      roletype: "מנהל",
      forms: [
        {
          id: 1,
          year: 2023,
        },
        {
          id: 2,
          year: 2022,
        },
      ],
    },
    {
      roleGrouptype: "משרדי",
      roletype: "עובד",
      forms: [
        {
          id: 4,
          year: 20233,
        },
        {
          id: 3,
          year: 20422,
        },
      ],
    },
    {
      roleGrouptype: "תפעולי",
      roletype: "מנהל",
      forms: [
        {
          id: 5,
          year: 1990,
        },
        {
          id: 6,
          year: 2009,
        },
      ],
    },
    {
      roleGrouptype: "תפעולי",
      roletype: "עובד",
      forms: [
        {
          id: 7,
          year: 1777,
        },
        {
          id: 31,
          year: 4572,
        },
      ],
    },
  ];


  useEffect(() => {//group by the role type and group type and send them as an array to the dialog
    // Use arrays to keep track of unique roletypes and grouptypes
    const roletypesArray = [];
    const groupTypesArray = [];

    test.forEach((item) => {
      if (!roletypesArray.includes(item.roletype)) {
        roletypesArray.push(item.roletype);
      }
      if (!groupTypesArray.includes(item.roleGrouptype)) {
        groupTypesArray.push(item.roleGrouptype);
      }
    });

    // Set state with unique values
    setRoleTypes(roletypesArray);
    setRoleGroupTypes(groupTypesArray);

    console.log(roletypesArray)
    console.log(groupTypesArray)
  }, []);

  return (
    <>
      <Button
        variant="contained"
        color="white"
        size="large"
        sx={{
          borderRadius: 50,
          height: "100px",
          width: "300px",
        }}
        onClick={() => setShowCreateOpenEvalueDialog((e) => !e)}
      >
        פתיחת תהליך הערכה
      </Button>
      <CreateYearlyProcessDialog
        open={showCreateOpenEvalueDialog}
        setOpen={setShowCreateOpenEvalueDialog}
        columnHeaders={columns} //roleType
        rowHeaders={rows} //roleGroupType
        cellData={[
          [
            ["שאלון 1", "שאלון 2"],
            ["שאלון 12", "שאלון 3"],
          ],
          [
            ["שאלון 21", "שאלון 77"],
            ["שאלון 18", "שאלון 66"],
          ],
        ]} // all the matching forms according the matrix
      />
    </>
  );
}
