import { Button, Dialog, MenuItem, Select, Typography } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  MenuList,
  Box,
} from "@mui/material";
import { useEffect, useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import he from "date-fns/locale/he";
registerLocale("he", he);
import addNotification from "react-push-notification";
import { Notifications } from "react-push-notification";

export default function CreateYearlyProcessDialog({
  open,
  setOpen,
  rowHeaders,
  columnHeaders,
  cellData,
}) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [openProcess, setOpenProcess] = useState({});
  const [finishDate, setfinishDate] = useState(new Date());
  const [tableData, setTableData] = useState(() => {
    return cellData.map((row) => [...row]);
  });
  const updateCell = (rowIndex, columnIndex, value, ddlKey) => {
    const updatedTableData = [...tableData];
    updatedTableData[rowIndex][columnIndex] = value;
    setTableData(updatedTableData); //shows the chosen value in
    const index = selectedOptions.findIndex((obj) => obj.key === ddlKey);
    if (index !== -1) {
      // If the ddlKey exists, update the value of the corresponding object
      const updatedChoices = [...selectedOptions];
      updatedChoices[index].value = value;
      setSelectedOptions(updatedChoices);
    } else {
      // If the ddlKey doesn't exist, add a new object to the selectedOptions array
      setSelectedOptions([
        ...selectedOptions,
        { roleGroupType: columnHeaders[columnIndex], roleType: rowHeaders[rowIndex], value: value },
      ]);
    }
    console.log(selectedOptions);
    console.log(updatedTableData);
  };

  const handleFinish = () => {
    if (selectedOptions.length != columnHeaders.length * rowHeaders.length) {
      addNotification({
        title: "אזהרה",
        subtitle: "לא בחרת בכל האפשרויות",
        message: "צריך לבחור בכל שאלון מספר שאלון",
        theme: "red",
        closeButton: "X",
      });
    } else {
      setOpenProcess((prevObject) => ({ ...prevObject, selectedOptions, date: finishDate }));
      setOpen(false);
    }
  };
  return (
    <Dialog fullWidth maxWidth="lg" onClose={() => setOpen((e) => !e)} open={open}>
      <Typography sx={{ fontFamily: "Rubik", fontSize: "50px", textAlign: "center" }}>
        פתיחת תהליך הערכה{" "}
      </Typography>
      <Box
        display="inline"
        justifyContent="center"
        alignItems="center"
        marginTop={3}
        marginBottom={10}
        marginLeft="15%"
        textAlign="center"
        width="60%"
      >
        <Typography>בחירת שאלונים</Typography>
        <TableContainer sx={{ backgroundColor: "#e6f2ff" }}>
          <Table>
            <TableHead sx={{ display: "table-header-group" }}>
              <TableRow>
                <TableCell></TableCell>
                {columnHeaders.map((header, columnIndex) => {
                  return (
                    <TableCell
                      key={columnIndex}
                      align={columnIndex.textAlign || ""}
                      padding={columnIndex.disablePadding ? "none" : "normal"}
                      sx={{ fontWeight: 600 }}
                    >
                      {header}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableHead>{rowHeaders[rowIndex]}</TableHead>
                  {row.map((cellValue, columnIndex) => (
                    <TableCell key={columnIndex}>
                      {Array.isArray(cellData[rowIndex][columnIndex]) ? (
                        <Select
                          label="בחירת שאלון"
                          value={cellValue}
                          onChange={(event) =>
                            updateCell(
                              rowIndex,
                              columnIndex,
                              event.target.value,
                              cellData[rowIndex][columnIndex]
                            )
                          }
                        >
                          {cellData[rowIndex][columnIndex].map((optionValue, optionIndex) => (
                            <MenuItem key={optionIndex} value={optionValue}>
                              {optionValue}
                            </MenuItem>
                          ))}
                        </Select>
                      ) : (
                        cellValue
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Notifications />
        </TableContainer>
        <Typography>בחירת תאריך סיום</Typography>

        <DatePicker selected={finishDate} onChange={(date) => setfinishDate(date)} locale="he" />
      </Box>
      <Box textAlign="center" marginBottom={3}>
      <Button variant="contained" color="white" onClick={() => setOpen(false)}>
        יציאה{" "}
      </Button>
        <Button variant="contained" color="white" onClick={handleFinish}>
          סיום הערכה שנתית
        </Button>
      </Box>
    </Dialog>
  );
}
