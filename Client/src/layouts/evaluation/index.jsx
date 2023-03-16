/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Container } from "@mui/material";


// Data

// Material Dashboard 2 React contexts
import { useMaterialUIController, setDirection } from "context";

import React, { useState,useEffect } from 'react';
import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { useCallback } from 'react';
import { json } from './json'

function QuestionnaireForm() {
    const survey = new Model(json);
    const [, dispatch] = useMaterialUIController();

    // Changing the direction to rtl
    useEffect(() => {
        setDirection(dispatch, "rtl");

        return () => setDirection(dispatch, "ltr");
    }, []);

    // const panels = survey.getAllPanels();
    // if (panels) {
    //     // Collapse the panels
    //     panels.map((panel) => {
    //         panel.state = 'collapsed';
    //     });

    //     // const telegram = panel.addNewQuestion('text', 'Telegram');
    //     // telegram.title = 'Telegram:';
    // }
    survey.onComplete.add((sender, options) => {
        console.log(JSON.stringify(sender.data, null, 3));
    });

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Container maxWidth="xl" sx={{ pt: 5, pb: 5 }}>
                <Survey
                    model={survey}
                    align="right"
                    style={{
                        direction: 'rtl'
                    }}
                />
            </Container>
        </DashboardLayout>

    );
}

export default QuestionnaireForm;
