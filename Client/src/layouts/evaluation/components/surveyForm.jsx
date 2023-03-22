import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import RadioButtons from "./survey-component/RadioButtons";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { FormControl } from "@mui/material";

const Qustions = [
    {
        QuestionNum: 1,
        QuesContent: "מעניק שירות אדיב מנומס וסבלני",
        QuesPack: "שירותיות"
    },
    {
        QuestionNum: 2,
        QuesContent: "פועל למילוי צרכי הלקוח ושביעות רצונו",
        QuesPack: "שירותיות"
    },
    {
        QuestionNum: 3,
        QuesContent: "מגיב במהירותהנדרשת לצרכי הלקוחות",
        QuesPack: "שירותיות"
    },
    {
        QuestionNum: 4,
        QuesContent: "מגלה גמישות ונכונות לשינוי",
        QuesPack: "שירותיות"
    },
    {
        QuestionNum: 5,
        QuesContent: "מגלה שליטה מקצועית ומיומנות בתחום עיסוקי",
        QuesPack: "מקצועיות ואיכות בעבודה"
    },
    {
        QuestionNum: 9,
        QuesContent: "מגלה יכולת עבודה עצמאית",
        QuesPack: "מקצועיות ואיכות בעבודה"
    },
    {
        QuestionNum: 7,
        QuesContent: "מקפיד לעמוד בלוחות הזמנים",
        QuesPack: "מקצועיות ואיכות בעבודה"
    },
    {
        QuestionNum: 8,
        QuesContent: "מנצל ביעילות את הזמן ביחס למשימות המוטלות",
        QuesPack: "מקצועיות ואיכות בעבודה"
    },
    {
        QuestionNum: 9,
        QuesContent: "פועלת כמיטב היכולת לשם עמידה במשימות ויעדים שהוצבו",
        QuesPack: "מקצועיות ואיכות בעבודה"
    },
    {
        QuestionNum: 10,
        QuesContent: "מקפיד על ביצוע איכותי של העבודה",
        QuesPack: "מקצועיות ואיכות בעבודה"
    }
];

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
        borderBottom: 0,
    },
    "&:before": {
        display: "none",
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, .05)"
            : "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function surveyForm() {
    const [expanded, setExpanded] = React.useState("panel1");

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    // useEffect(() => {
    //     Qustions.map((question)=>{
            
    //     })
    // }, []);

    return (
        <form>
            <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")} TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>שירותיות</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack direction="row" spacing={3} justifyContent="space-evenly" alignItems="baseline">
                        <Typography >שאלה מהדאטה</Typography>
                        <RadioButtons required />
                        <TextField id="outlined-multiline-flexible" label="הוסף הערה" multiline maxRows={3} required />
                    </Stack>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")} TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography>מקצועיות ואיכות בעבודה</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack direction="row" spacing={3} justifyContent="space-evenly" alignItems="baseline">
                        <Typography >שאלה מהדאטה</Typography>
                        <RadioButtons required />
                        <TextField id="outlined-multiline-flexible" label="הוסף הערה" multiline maxRows={3} required />
                    </Stack>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === "panel3"} onChange={handleChange("panel3")} TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Typography>יחסי עבודה , תקשורת ועבודת צוות</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack direction="row" spacing={3} justifyContent="space-evenly" alignItems="baseline">
                        <Typography >שאלה מהדאטה</Typography>
                        <RadioButtons required />
                        <TextField id="outlined-multiline-flexible" label="הוסף הערה" multiline maxRows={3} required />
                    </Stack>
                </AccordionDetails>
            </Accordion>
            <button>סיים</button>
            <button>שמור</button>
        </form>
    );
}