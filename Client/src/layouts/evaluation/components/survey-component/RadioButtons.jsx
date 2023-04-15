import * as React from "react";
import Radio from "@mui/material/Radio";

export default function RadioButtons({ itemId,groupId,questionId, selectedValue, onselectedValueChange }) {
  const handleChange = (event) => {
    onselectedValueChange(itemId,groupId,questionId, event.target.value); // Get question row and the selected value
  };

  return (
    <div style={{ display: "contents", fontSize: 28 }}>
      <Radio
        checked={selectedValue === "0"}
        onChange={handleChange}
        value="0"
        name="radio-buttons"
        inputProps={{ "aria-labelledby": "לא רלוונטי לתפקיד" }}
      />
      <Radio
        checked={selectedValue === "1"}
        onChange={handleChange}
        value="1"
        name="radio-buttons"
        inputProps={{ "aria-labelledby": "לא עומד בציפיות" }}
      />
      <Radio
        checked={selectedValue === "2"}
        onChange={handleChange}
        value="2"
        name="radio-buttons"
        inputProps={{ "aria-labelledby": "עומד בחלק מהציפיות" }}
      />
      <Radio
        checked={selectedValue === "3"}
        onChange={handleChange}
        value="3"
        name="radio-buttons"
        inputProps={{ "aria-labelledby": "עומד כמעט בכל הציפיות" }}
      />
      <Radio
        checked={selectedValue === "4"}
        onChange={handleChange}
        value="4"
        name="radio-buttons"
        inputProps={{ "aria-labelledby": "עומד בציפיות" }}
      />
      <Radio
        checked={selectedValue === "5"}
        onChange={handleChange}
        value="5"
        name="radio-buttons"
        inputProps={{ "aria-labelledby": "עומד בציפיות בצורה טובה מאוד" }}
      />
    </div>
  );
}
