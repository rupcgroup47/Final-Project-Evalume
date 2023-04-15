import { Container } from "@mui/material";
import { useEffect } from "react";
import GoalsTable from "./GoalsTable";
import { useMaterialUIController, setDirection } from "context";


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