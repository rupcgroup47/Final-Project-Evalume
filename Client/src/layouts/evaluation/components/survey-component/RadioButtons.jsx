import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function RadioButtons({ itemId, selectedValue, onselectedValueChange }) {

  const handleChange = (event) => {
    onselectedValueChange(itemId, event.target.value) // Get question row and the selected value
  };

  return (
    <div style={{ display: "contents", fontSize: 28 }} >
      <Radio
        checked={selectedValue === '0'}
        onChange={handleChange}
        value="0"
        name="radio-buttons"
        inputProps={{ 'aria-labelledby': 'לא רלוונטי לתפקיד' }}
      />
      <Radio
        checked={selectedValue === '1'}
        onChange={handleChange}
        value="1"
        name="radio-buttons"
        inputProps={{ 'aria-labelledby': 'לא עומד בציפיות' }}
      />
      <Radio
        checked={selectedValue === '2'}
        onChange={handleChange}
        value="2"
        name="radio-buttons"
        inputProps={{ 'aria-labelledby': 'עומד בחלק מהציפיות' }}
      />
      <Radio
        checked={selectedValue === '3'}
        onChange={handleChange}
        value="3"
        name="radio-buttons"
        inputProps={{ 'aria-labelledby': 'עומד כמעט בכל הציפיות' }}
      />
      <Radio
        checked={selectedValue === '4'}
        onChange={handleChange}
        value="4"
        name="radio-buttons"
        inputProps={{ 'aria-labelledby': 'עומד בציפיות' }}
      />
      <Radio
        checked={selectedValue === '5'}
        onChange={handleChange}
        value="5"
        name="radio-buttons"
        inputProps={{ 'aria-labelledby': 'עומד בציפיות בצורה טובה מאוד' }}
      />
    </div>
    // <FormControl>
    //   <RadioGroup
    //     row
    //     aria-labelledby="demo-row-radio-buttons-group-label"
    //     name="row-radio-buttons-group"
    //   >
    //     <FormControlLabel value="0" control={<Radio />} label="לא רלוונטי" labelPlacement="top"/>
    //     <FormControlLabel value="1" control={<Radio />} label="לא עומד בציפיות" labelPlacement="top"/>
    //     <FormControlLabel value="2" control={<Radio />} label="עומד בחלק מהציפיות" labelPlacement="top"/>
    //     <FormControlLabel value="3" control={<Radio />} label="עומד כמעט בכל הציפיות" labelPlacement="top"/>
    //     <FormControlLabel value="4" control={<Radio />} label="עומד בציפיות" labelPlacement="top"/>
    //     <FormControlLabel value="5" control={<Radio />} label="עומד בציפיות בצורה טובה מאוד" labelPlacement="top"/>
    //   </RadioGroup>
    // </FormControl>
  );
}