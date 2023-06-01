
[
  {
    "depNum": 1,
    "depName": "משאבי אנוש וביטחון",
    "parts": [
      {
        "quesGroup": 1,
        "quesGroup_Desc": "שירותיות",
        "avg_Answers": 5
      },
      {
        "quesGroup": 2,
        "quesGroup_Desc": "מקצועיות ואיכות בעבודה",
        "avg_Answers": 5
      },
      {
        "quesGroup": 3,
        "quesGroup_Desc": "יחסי עבודה , תקשורת ועבודת צוות",
        "avg_Answers": 5
      },
      {
        "quesGroup": 4,
        "quesGroup_Desc": "יוזמה ואחריות",
        "avg_Answers": 4
      },
      {
        "quesGroup": 5,
        "quesGroup_Desc": "משמעת",
        "avg_Answers": 5
      },
      {
        "quesGroup": 6,
        "quesGroup_Desc": "מיומנויות ניהול",
        "avg_Answers": 5
      }
    ]
  },
  {
    "depNum": 2,
    "depName": "שיווק ומכירות",
    "parts": [
      {
        "quesGroup": 1,
        "quesGroup_Desc": "שירותיות",
        "avg_Answers": 4
      },
      {
        "quesGroup": 2,
        "quesGroup_Desc": "מקצועיות ואיכות בעבודה",
        "avg_Answers": 4
      },
      {
        "quesGroup": 3,
        "quesGroup_Desc": "יחסי עבודה , תקשורת ועבודת צוות",
        "avg_Answers": 4
      },
      {
        "quesGroup": 4,
        "quesGroup_Desc": "יוזמה ואחריות",
        "avg_Answers": 4
      },
      {
        "quesGroup": 5,
        "quesGroup_Desc": "משמעת",
        "avg_Answers": 4
      },
      {
        "quesGroup": 6,
        "quesGroup_Desc": "מיומנויות ניהול",
        "avg_Answers": 4
      }
    ]
  }
]





import React, { useState, useEffect } from 'react';

function barChartData() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Assuming you have the JSON array as a string
    const jsonArray = `{
      "depNum": 1,
      "depName": "משאבי אנוש וביטחון",
      "parts": [
        {
          "quesGroup": 1,
          "quesGroup_Desc": "שירותיות",
          "avg_Answers": 5
        },
        // Rest of the array elements
      ]
    }`;

    // Parse the JSON string into a JavaScript object
    const data = JSON.parse(jsonArray);

    // Extract the required values and create the new format
    const label = data.parts.map(part => part.quesGroup_Desc);
    const dataValues = data.parts.map(part => part.avg_Answers);

    const chartData = {
      labels: [data.depName],
      datasets: [
        {
          label: label,
          data: dataValues
        }
      ]
    };

    setChartData(chartData);
  }, []);

}

export default barChartData;