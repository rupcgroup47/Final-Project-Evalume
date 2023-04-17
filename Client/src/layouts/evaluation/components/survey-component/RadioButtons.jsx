import * as React from "react";
import Radio from "@mui/material/Radio";

export default function RadioButtons({ itemId, questionId, numericAnswer, onselectedValueChange }) {
  const handleChange = (event) => {
    onselectedValueChange(itemId, questionId, event.target.value); // Get question row and the selected value
  };

  return (
    <div style={{ display: "contents", fontSize: 28 }}>
      <Radio
        checked={numericAnswer === "0"}
        onChange={handleChange}
        value="0"
        name="radio-buttons"
        inputProps={{ "aria-labelledby": "לא רלוונטי לתפקיד" }}
      />
      <Radio
        checked={numericAnswer === "1"}
        onChange={handleChange}
        value="1"
        name="radio-buttons"
        inputProps={{ "aria-labelledby": "לא עומד בציפיות" }}
      />
      <Radio
        checked={numericAnswer === "2"}
        onChange={handleChange}
        value="2"
        name="radio-buttons"
        inputProps={{ "aria-labelledby": "עומד בחלק מהציפיות" }}
      />
      <Radio
        checked={numericAnswer === "3"}
        onChange={handleChange}
        value="3"
        name="radio-buttons"
        inputProps={{ "aria-labelledby": "עומד כמעט בכל הציפיות" }}
      />
      <Radio
        checked={numericAnswer === "4"}
        onChange={handleChange}
        value="4"
        name="radio-buttons"
        inputProps={{ "aria-labelledby": "עומד בציפיות" }}
      />
      <Radio
        checked={numericAnswer === "5"}
        onChange={handleChange}
        value="5"
        name="radio-buttons"
        inputProps={{ "aria-labelledby": "עומד בציפיות בצורה טובה מאוד" }}
      />
    </div>
  );
}
