// /**
// =========================================================
// * Material Dashboard 2 React - v2.1.0
// =========================================================

// * Product Page: https://www.creative-tim.com/product/material-dashboard-react
// * Copyright 2022 Creative Tim (https://www.creative-tim.com)

// Coded by www.creative-tim.com

//  =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// */

// // @mui material components
// import Grid from "@mui/material/Grid";

// // Material Dashboard 2 React components
// import MDBox from "components/MDBox";

// // Material Dashboard 2 React examples
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import { Container } from "@mui/material";


// // Data

// // Material Dashboard 2 React contexts
// import { useMaterialUIController, setDirection } from "context";

// import React, { useState, useEffect, useContext } from 'react';
// import 'survey-core/defaultV2.min.css';
// import { Model } from 'survey-core';
// import { Survey } from 'survey-react-ui';
// import { useCallback } from 'react';
// import { json } from './json'
// import { MainStateContext } from "App";

// function QuestionnaireForm() {
//     const survey = new Model(json);
//     const [, dispatch] = useMaterialUIController();
//     const mainState = useContext(MainStateContext)
//     const [count, setCount] = useState(0);

//     // Changing the direction to rtl
//     useEffect(() => {
//         setDirection(dispatch, "rtl");

//         return () => setDirection(dispatch, "ltr");
//     }, []);

//     // const panels = survey.getAllPanels();
//     // if (panels) {
//     //     // Collapse the panels
//     //     panels.map((panel) => {
//     //         panel.state = 'collapsed';
//     //     });

//     //     // const telegram = panel.addNewQuestion('text', 'Telegram');
//     //     // telegram.title = 'Telegram:';
//     // }
//     survey.onComplete.add((sender, options) => {
//         console.log(JSON.stringify(sender.data, null, 3));
//     });

//     return (
//         <DashboardLayout>
//             <DashboardNavbar />
//             <Container maxWidth="xl" sx={{ pt: 5, pb: 5 }}>
//                 {mainState.state.user.name}
//                 <button onClick={() => setCount(count + 1)}>clicked {count} times</button>
//                 <Survey
//                     model={survey}
//                     align="right"
//                     style={{
//                         direction: 'rtl'
//                     }}
//                 />
//             </Container>
//         </DashboardLayout>

//     );
// }

// export default QuestionnaireForm;

//             {/* <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")} TransitionProps={{ unmountOnExit: true }}>
//                 <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
//                     <Typography>שירותיות</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                     <Stack direction="row" spacing={3} justifyContent="space-evenly" alignItems="baseline">
//                         <Typography >שאלה מהדאטה</Typography>
//                         <RadioButtons required />
//                         <TextField id="outlined-multiline-flexible" label="הוסף הערה" multiline maxRows={3} required />
//                     </Stack>
//                 </AccordionDetails>
//             </Accordion>
//             <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")} TransitionProps={{ unmountOnExit: true }}>
//                 <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
//                     <Typography>מקצועיות ואיכות בעבודה</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                     <Stack direction="row" spacing={3} justifyContent="space-evenly" alignItems="baseline">
//                         <Typography >שאלה מהדאטה</Typography>
//                         <RadioButtons required />
//                         <TextField id="outlined-multiline-flexible" label="הוסף הערה" multiline maxRows={3} required />
//                     </Stack>
//                 </AccordionDetails>
//             </Accordion>
//             <Accordion expanded={expanded === "panel3"} onChange={handleChange("panel3")} TransitionProps={{ unmountOnExit: true }}>
//                 <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
//                     <Typography>יחסי עבודה , תקשורת ועבודת צוות</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                     <Stack direction="row" spacing={3} justifyContent="space-evenly" alignItems="baseline">
//                         <Typography >שאלה מהדאטה</Typography>
//                         <RadioButtons required />
//                         <TextField id="outlined-multiline-flexible" label="הוסף הערה" multiline maxRows={3} required />
//                     </Stack>
//                 </AccordionDetails>
//             </Accordion> */}