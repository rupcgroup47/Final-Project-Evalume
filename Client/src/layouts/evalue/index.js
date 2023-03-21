import React from "react";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Container } from "@mui/material";
import { useEffect } from "react";

// Data

// Material Dashboard 2 React contexts
import { useMaterialUIController, setDirection } from "context";
export default function Evalues() {
  const [, dispatch] = useMaterialUIController();

  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");
    return () => setDirection(dispatch, "ltr");
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container maxWidth="xl" sx={{ pt: 5, pb: 5 }}>
        כאן תהיה הערכת עובדים{" "}
      </Container>
    </DashboardLayout>
  );
}
