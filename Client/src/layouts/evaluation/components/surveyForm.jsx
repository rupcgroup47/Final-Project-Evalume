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
import { useForm } from "react-hook-form";
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';

import Paper from '@mui/material/Paper';




// const questionsResp = [{
//     id: '1',
//     title: 'שירותיות',
//     questions: [{
//         id: '1',
//         label: '',
//     }],
// }];

const questionsResp = [...Array(6).keys()].map(idx => ({
    id: `id-${idx}`,
    title: `title - ${idx}`,
    questions: [...Array(4).keys()].map(index => ({
        id: `index-${index}`,
        label: `שאלה מאוד מאוד מאוד אבל מאוד מעניינת - ${index}`,
    }))
}));

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
    const [expanded, setExpanded] = React.useState(questionsResp[0].id);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const { handleSubmit } = useForm();
    const onSubmit = (data, e) => {
        event.preventDefault()
        console.log(data, e)
    };
    const onError = (errors, e) => {
        event.preventDefault()
        console.log(errors, e)
    };

    console.log(questionsResp);
    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            {questionsResp.map(({ id, title, questions }) => (
                <Accordion key={'q' + id} expanded={expanded === id} onChange={handleChange(id)} TransitionProps={{ unmountOnExit: true }}>
                    <AccordionSummary id={`${id}-header`}>
                        <Typography>{title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {questions.map(({ id: questionId, label }) => (
                            <Stack key={'q-' + id + '-' + questionId} direction="row" spacing={3} justifyContent="space-evenly" alignItems="baseline">
                                <Typography >{label}</Typography>
                                <RadioButtons required/>
                                <TextField id="outlined-multiline-flexible" label="הוסף הערה" multiline maxRows={3} required />
                            </Stack>
                        ))}
                    </AccordionDetails>
                </Accordion>
            ))} 
            <Stack direction="row" spacing={8} alignItems="baseline" justifyContent="space-evenly" marginTop={'20px'}>
                <button type={'button'} label='שמור'>שמור</button>
                <input type={'submit'} label='סיים' />
            </Stack>
        </form>
    );
}