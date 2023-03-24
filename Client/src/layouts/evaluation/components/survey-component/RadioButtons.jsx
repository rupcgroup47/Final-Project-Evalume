import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function RadioButtons() {
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div style={{ display:"contents", fontSize: 28 }} >
      <Radio
        checked={selectedValue === '0'}
        onChange={handleChange}
        value="0"
        name="radio-buttons"
        inputProps={{ 'aria-label': '0' }}
      />
      <Radio
        checked={selectedValue === '1'}
        onChange={handleChange}
        value="1"
        name="radio-buttons"
        inputProps={{ 'aria-label': '1' }}
      />
      <Radio
        checked={selectedValue === '2'}
        onChange={handleChange}
        value="2"
        name="radio-buttons"
        inputProps={{ 'aria-label': '2' }}
      />
      <Radio
        checked={selectedValue === '3'}
        onChange={handleChange}
        value="3"
        name="radio-buttons"
        inputProps={{ 'aria-label': '3' }}
      />
      <Radio
        checked={selectedValue === '4'}
        onChange={handleChange}
        value="4"
        name="radio-buttons"
        inputProps={{ 'aria-label': '4' }}
      />
      <Radio
        checked={selectedValue === '5'}
        onChange={handleChange}
        value="5"
        name="radio-buttons"
        inputProps={{ 'aria-label': '5' }}
      />
    </div>
  );
}