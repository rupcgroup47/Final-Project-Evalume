import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import GoalsData from './GoalsData';
import { useEffect } from "react";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setDirection } from "context";


const _goals = [
  {
    id: 1,
    goalId: "a",
    goalName:"קורס אקסל",
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ]
  },
  {
    id: 2,
    goalId: "b",
    goalName:"קורס פריוריטי",
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ]
  },
  {
    id: 3,
    goalId: "c",
    goalName:"קורס חשבשבת",
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ]
  }
];

export default function GoalsTable() {

  const [, dispatch] = useMaterialUIController();

  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");

    return () => setDirection(dispatch, "ltr");
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>יעדים</TableCell>
            {/* <TableCell>אחוז השלמה</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {_goals.map((row) => (
            <GoalsData key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}