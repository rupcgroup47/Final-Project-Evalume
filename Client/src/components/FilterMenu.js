/*
This is a React component that implements a filter menu for a table. It imports several components from the Material-UI library, including Badge, ButtonBase, Divider, Fade, FormControl, IconButton, InputLabel, Menu, MenuItem, Select, and Typography.

The FilterMenu component takes several props, including users (an array of user objects), and a series of filters and corresponding setter functions (filterName, setFilterName, filterEmail, setFilterEmail, filterGender, setFilterGender, filterDepartment, setFilterDepartment, filterJob, and setFilterJob).

When the component is rendered, it displays an icon button that, when clicked, opens a filter menu. The menu displays several filter items, each corresponding to a different filter (e.g. name, email, gender, department, and job). Each filter item contains a Select component that allows the user to select a filter value from a list of options. When a user selects a filter value, the corresponding filter setter function is called with that value.

The component also includes a "Reset" button that allows the user to clear all filter values. When the user clicks the "Reset" button, all filter setter functions are called with an empty string.

The number of active filters is displayed on a badge on the filter icon button.
*/
import {
  Badge,
  ButtonBase,
  Divider,
  Fade,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";

export default function FilterMenu({
  users,

  // Filters
  filterName,
  setFilterName,
  filterEmail,
  setFilterEmail,
  filterGender,
  setFilterGender,
  filterDepartment,
  setFilterDepartment,
  filterJob,
  setFilterJob,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleReset = () => {
    setFilterName("");
    setFilterEmail("");
    setFilterGender("");
    setFilterDepartment("");
    setFilterJob("");
  };

  return (
    <div>
      <Tooltip title="סינון">
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          color={
            filterName ||
            filterEmail ||
            filterGender ||
            filterDepartment ||
            filterJob
              ? "primary"
              : "default"
          }
          onClick={handleClick}
        >
          <Badge
            badgeContent={
              [
                filterName,
                filterEmail,
                filterGender,
                filterDepartment,
                filterJob,
              ].filter((filter) => filter.length > 0).length
            }
            color="primary"
          >
            <FilterListIcon />
          </Badge>
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
            maxHeight: 345,
            width: "30ch",
          },
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 8px 8px 16px",
          }}
        >
          <Typography variant="body1" fontWeight={600}>
            סינון
          </Typography>

          <Fade
            in={
              filterName ||
              filterEmail ||
              filterGender ||
              filterDepartment ||
              filterJob
                ? true
                : false
            }
          >
            <ButtonBase onClick={handleReset}>
              <Typography
                variant="caption"
                fontWeight={600}
                color="primary"
                style={{ padding: "4px 8px", borderRadius: 2 }}
              >
                איפוס
              </Typography>
            </ButtonBase>
          </Fade>
        </div>

        <Divider />

        {/* Name */}
        <FilterItem
          label="שם מלא"
          array={users?.map((user) => `${user.userFName} ${user.userLName}`)}
          value={filterName}
          setValue={setFilterName}
        />

        {/* Email */}
        <FilterItem
          label="אימייל"
          array={users?.map((user) => user.userEmail)}
          value={filterEmail}
          setValue={setFilterEmail}
        />

        {/* Gender */}
        <FilterItem
          label="מגדר"
          array={users?.map((user) => user.userGender)}
          value={filterGender}
          setValue={setFilterGender}
        />

        {/* Department */}
        <FilterItem
          label="מחלקה"
          array={users?.map((user) => user.userDepartment)}
          value={filterDepartment}
          setValue={setFilterDepartment}
        />

        {/* Job */}
        <FilterItem
          label="תפקיד"
          array={users?.map((user) => user.userRole)}
          value={filterJob}
          setValue={setFilterJob}
        />
      </Menu>
    </div>
  );
}

const FilterItem = ({ label, array, value, setValue }) => {
  return (
    <FormControl sx={{ m: 1, minWidth: "calc(100% - 15px)" }} size="small">
      <InputLabel id={label}>{label}</InputLabel>
      <Select
        labelId={label}
        id={label}
        label={label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        <MenuItem value="">
          <em>הכל</em>
        </MenuItem>

        {[...new Set(array)]?.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
