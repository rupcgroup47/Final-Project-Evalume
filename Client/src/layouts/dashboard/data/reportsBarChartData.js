// const jsonArray = [
//   {
// "quesGroup": 1,
//     "quesGroup_Desc": "שירותיות",
//     "parts": [
//       {
//     "depNum": 1,
//     "depName": "משאבי אנוש וביטחון",
//         "avg_Answers": 5
//       },
//       {
//     "depNum": 2,
//     "depName": "שיווק ומכירות",
//         "avg_Answers": 4
//       },
//       {
//     "depNum": 102,
//     "depName": "תפעול",
//         "avg_Answers": 5
//      }
//     ]
//  },
//   {
//  "quesGroup": 2,
//   "quesGroup_Desc": "מקצועיות ואיכות בעבודה",
//     "parts": [
//       {
//     "depNum": 1,
//     "depName": "משאבי אנוש וביטחון",
//         "avg_Answers": 5
//       },
//       {
//     "depNum": 2,
//     "depName": "שיווק ומכירות",
//         "avg_Answers": 4
//       },
//       {
//     "depNum": 102,
//     "depName": "תפעול",
//         "avg_Answers": 5
//      }
//     ]
//  },{
 
//  "quesGroup": 3,
//   "quesGroup_Desc": "יחסי עבודה , תקשורת ועבודת צוות",
//     "parts": [
//       {
//     "depNum": 1,
//     "depName": "משאבי אנוש וביטחון",
//         "avg_Answers": 5
//       },
//       {
//     "depNum": 2,
//     "depName": "שיווק ומכירות",
//         "avg_Answers": 4
//       },
//       {
//     "depNum": 102,
//     "depName": "תפעול",
//         "avg_Answers": 5
//      }
//     ]
//  },{

//  "quesGroup": 4,
//   "quesGroup_Desc": "יוזמה ואחריות",
//     "parts": [
//       {
//     "depNum": 1,
//     "depName": "משאבי אנוש וביטחון",
//         "avg_Answers": 5
//       },
//       {
//     "depNum": 2,
//     "depName": "שיווק ומכירות",
//         "avg_Answers": 4
//       },
//       {
//     "depNum": 102,
//     "depName": "תפעול",
//         "avg_Answers": 5
//      }
//     ]
//  },{

//  "quesGroup": 5,
//   "quesGroup_Desc": "משמעת",
//     "parts": [
//       {
//     "depNum": 1,
//     "depName": "משאבי אנוש וביטחון",
//         "avg_Answers": 5
//       },
//       {
//     "depNum": 2,
//     "depName": "שיווק ומכירות",
//         "avg_Answers": 4
//       },
//       {
//     "depNum": 102,
//     "depName": "תפעול",
//         "avg_Answers": 5
//      }
//     ]
//  },{

//  "quesGroup": 6,
//   "quesGroup_Desc": "מיומנויות ניהול",
//     "parts": [
//       {
//     "depNum": 1,
//     "depName": "משאבי אנוש וביטחון",
//         "avg_Answers": 5
//       },
//       {
//     "depNum": 2,
//     "depName": "שיווק ומכירות",
//         "avg_Answers": 4
//       },
//       {
//     "depNum": 102,
//     "depName": "תפעול",
//         "avg_Answers": 5
//            }
//     ]
//   }
// ]




// import React, { useState, useEffect } from 'react';
// import Dashboard from '..';

// function BarChartData({ selectedValueGraph1 }) {
//   const [chartData, setChartData] = useState(null);


//   useEffect(() => {
//     const convertToChartData = () => {
//       const convertedData = {
//         labels: [],
//         datasets: []
//       };

//       for (const item of jsonArray) {
//         const { quesGroup_Desc, parts } = item;

//         convertedData.labels.push(quesGroup_Desc);

//         const dataset = {
//           label: [],
//           data: []
//         };

//         for (const part of parts) {
//           const { depName, avg_Answers } = part;

//           dataset.label.push(depName);
//           dataset.data.push(avg_Answers);
//         }

//         convertedData.datasets.push(dataset);
//       }
//       const filteredChartData = convertedData.datasets.filter(dataset =>
//         dataset.label.includes(selectedValueGraph1)
//       );

//       setChartData(convertedData);
//     };

//     convertToChartData();
//   }, [selectedValueGraph1]);

//   return <Dashboard chartData={chartData} />
// }

// export default BarChartData;