
// @mui material components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDProgress from "components/MDProgress";
import React, { useState } from 'react';
import {
  Typography,
  Box,
  Progress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

const array =
[
  {
    "depName": "מנכל",
    "depCount": 1,
    "parts": [
      {
        "level": -1,
        "levelCount": 1,
        "employees": [
          {
            "userId": 203668954,
            "userName": "אדם סנדלר"
          }
        ]
      }
    ]
  },
  {
    "depName": "משאבי אנוש וביטחון",
    "depCount": 5,
    "parts": [
      {
        "level": -1,
        "levelCount": 1,
        "employees": [
          {
            "userId": 205994781,
            "userName": "כריסטיאנו רונאלדו"
          }
        ]
      },
      {
        "level": 0,
        "levelCount": 1,
        "employees": [
          {
            "userId": 349581268,
            "userName": "שני שבח מילר"
          }
        ]
      },
      {
        "level": 1,
        "levelCount": 1,
        "employees": [
          {
            "userId": 2031245215,
            "userName": "שיר זיו"
          }
        ]
      },
      {
        "level": 2,
        "levelCount": 2,
        "employees": [
          {
            "userId": 203645215,
            "userName": "יהל שבח"
          },
          {
            "userId": 203845215,
            "userName": "נועה פרקש"
          }
        ]
      }
    ]
  },
  {
    "depName": "שיווק ומכירות",
    "depCount": 4,
    "parts": [
      {
        "level": -1,
        "levelCount": 3,
        "employees": [
          {
            "userId": 205894281,
            "userName": "ליונל מסי"
          },
          {
            "userId": 219654875,
            "userName": "אדם פשוט"
          },
          {
            "userId": 361985459,
            "userName": "מוני מושונוב"
          }
        ]
      },
      {
        "level": 2,
        "levelCount": 1,
        "employees": [
          {
            "userId": 216584795,
            "userName": "דורית שבח"
          }
        ]
      }
    ]
  },
  {
    "depName": "שינוע והובלה",
    "depCount": 2,
    "parts": [
      {
        "level": -1,
        "levelCount": 2,
        "employees": [
          {
            "userId": 205894991,
            "userName": "מייקל גורדן"
          },
          {
            "userId": 207774991,
            "userName": "משה משה"
          }
        ]
      }
    ]
  },
  {
    "depName": "תפעול",
    "depCount": 4,
    "parts": [
      {
        "level": -1,
        "levelCount": 1,
        "employees": [
          {
            "userId": 206932587,
            "userName": "טל עינב"
          }
        ]
      },
      {
        "level": 0,
        "levelCount": 2,
        "employees": [
          {
            "userId": 205894222,
            "userName": "סיגי כהן"
          },
          {
            "userId": 319648526,
            "userName": "לני מילר"
          }
        ]
      },
      {
        "level": 1,
        "levelCount": 1,
        "employees": [
          {
            "userId": 2048596312,
            "userName": "שון מילר"
          }
        ]
      }
    ]
  }
]

export default function data() {
  const [selectedPart, setSelectedPart] = useState(null);

  const handlePartClick = (part) => {
    setSelectedPart(part);
  };

  const handleDialogClose = () => {
    setSelectedPart(null);
  };

    const rows = array.map((item) => ({
      depName: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {item.depName}
        </MDTypography>
      ),
      depCount: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {item.depCount}
        </MDTypography>
      ),
      level: item.parts.reduce((accumulator, part) => {
        if (part.level === -1) {
          return (
            <>
              {accumulator}
              <MDTypography
                variant="caption"
                color="text"
                fontWeight="medium"
                onClick={() => handlePartClick(part)}
                style={{ cursor: 'pointer' }}
              >
                {part.levelCount}
              </MDTypography>
            </>
          );
        }
        return accumulator;
      }, null),
      level0: item.parts.reduce((accumulator, part) => {
        if (part.level === 0) {
          return (
            <>
              {accumulator}
              <MDTypography
                variant="caption"
                color="text"
                fontWeight="medium"
                onClick={() => handlePartClick(part)}
                style={{ cursor: 'pointer' }}
              >
                {part.levelCount}
              </MDTypography>
            </>
          );
        }
        return accumulator;
      }, null),
      level1: item.parts.reduce((accumulator, part) => {
        if (part.level === 1) {
          return (
            <>
              {accumulator}
              <MDTypography
                variant="caption"
                color="text"
                fontWeight="medium"
                onClick={() => handlePartClick(part)}
                style={{ cursor: 'pointer' }}
              >
                {part.levelCount}
              </MDTypography>
            </>
          );
        }
        return accumulator;
      }, null),
      level2: item.parts.reduce((accumulator, part) => {
        if (part.level === 2) {
          return (
            <>
              {accumulator}
              <MDTypography
                variant="caption"
                color="text"
                fontWeight="medium"
                onClick={() => handlePartClick(part)}
                style={{ cursor: 'pointer' }}
              >
                {part.levelCount}
              </MDTypography>
            </>
          );
        }
        return accumulator;
      }, null),
      dialog: (
        <Dialog open={selectedPart === item} onClose={handleDialogClose}>
          <DialogTitle>Employee Data</DialogTitle>
          <DialogContent>
            {selectedPart && (
              <Box>
                <Typography variant="body1">
                  Level: {selectedPart.level}, Level Count: {selectedPart.levelCount}
                </Typography>
                {selectedPart.employees.map((employee) => (
                  <Typography key={employee.userId} variant="body2">
                    UserId: {employee.userId}, UserName: {employee.userName}
                  </Typography>
                ))}
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Close</Button>
          </DialogActions>
        </Dialog>
      ),
    }));

    
  return {
    columns: [
      { Header: "מחלקות", accessor: "depName", align: "left" },
      { Header: "כמות עובדים במחלקה", accessor: "depCount", align: "center" },
      { Header: "טרם נכנס לשאלון", accessor: "level", align: "center" },
      { Header: "הערכה עצמית", accessor: "level0", align: "center" },
      { Header: "הערכת מנהל", accessor: "level1", align: "center" },
      { Header: "הערכה משותפת", accessor: "level2", align: "center" },
      // { Header: " התקדמות", accessor: "completion", align: "center" },
    ],
    rows,
  };
}
