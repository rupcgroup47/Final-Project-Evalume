/* eslint-disable */

import { Container } from "@mui/material";
import { useEffect } from "react";
import { useMaterialUIController, setDirection } from "context";
import GoalsTable from "./GoalsTable";


function Goals() {
  const [, dispatch] = useMaterialUIController();

  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");

    return () => setDirection(dispatch, "ltr");
  }, []);

  return (
    <Container maxWidth="xl" sx={{ pt: 5, pb: 5 }}>
      <GoalsTable />
    </Container>
  );
}

export default Goals;