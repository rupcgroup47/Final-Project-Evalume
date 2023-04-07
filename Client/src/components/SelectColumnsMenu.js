/*
This is a React component that creates a dropdown menu to select which columns to display in a table.

The component takes two props:

  * tableHead: an array of objects, where each object represents a column in the table. Each object has an id and a label property, as well as a show property that determines whether the column is currently visible in the table or not.
  * setTableHead: a function that is used to update the tableHead state.
The component uses the useState hook to keep track of the menu's anchor element (the element that the menu should be anchored to) and whether the menu is currently open or not. It then renders an icon button that, when clicked, opens the menu.

The menu itself contains a list of checkboxes, one for each column in the tableHead array. Each checkbox is associated with a column and displays its label. When a checkbox is checked or unchecked, the setTableHead function is called to update the tableHead state, toggling the show property of the associated column object.

Overall, this component allows the user to customize the columns displayed in a table by selecting which ones to show or hide.
*/

import { useState } from "react";
import ViewColumnRoundedIcon from "@mui/icons-material/ViewColumnRounded";
import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  Menu,
  Tooltip,
  Typography,
} from "@mui/material";

export default function SelectColumnsMenu({ tableHead, setTableHead }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Tooltip title="הצגת עמודות">
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          color={tableHead.some((item) => !item.show) ? "primary" : "default"}
          onClick={handleClick}
        >
          <ViewColumnRoundedIcon />
        </IconButton>
      </Tooltip>

      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 275,
            width: "25ch",
          },
        }}
      >
        <Typography
          variant="body1"
          fontWeight={600}
          sx={{ pl: 2, pt: 1 }}
        >
          הצג עמודות
        </Typography>
        <Divider />

        <FormControl component="fieldset">
          <FormGroup aria-label="position" row sx={{ pl: 1 }}>
            {tableHead?.map((item, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={item.show}
                    onChange={(e) => {
                      setTableHead((prevHead) =>
                        prevHead.map((obj) => {
                          if (obj.id === item.id) {
                            return { ...obj, show: e.target.checked };
                          }
                          return obj;
                        })
                      );
                    }}
                  />
                }
                label={item?.label}
                labelPlacement="end"
              />
            ))}
          </FormGroup>
        </FormControl>
      </Menu>
    </div>
  );
}
