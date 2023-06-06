import { Container, TextField, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { useMaterialUIController, setDirection } from "context";
import { MainStateContext } from "App";
import { EvalueContext } from "context/evalueVariables";
import ApiFetcher from "components/ApiFetcher";
import sendMessageToChatGPT from "./components/sendMessageToChatGPT";
import data from "./Json/data";
import GPTTable from "./components/GPTTable";

function ReportGenerator() {
    const [, dispatch] = useMaterialUIController();
    const { mainState, setMainState } = useContext(MainStateContext);
    const { API } = useContext(EvalueContext);
    const [error, setError] = useState(null);
    const [openAIdetails, setOpenAIdetails] = useState(null);
    const [messages, setMessages] = useState(null);
    const [response, setResponse] = useState("");
    const [showTable, setShowTable] = useState(false);
    const [tableData, setTableData] = useState([]);

    //API calls
    useEffect(() => {
        let isMounted = true;

        // Get importent details and set the main context
        const getOpenAIdetails = async () => {
            try {
                const fetchedData = await ApiFetcher(API.apiOpenAIdetails, "GET", null);
                if (isMounted) {
                    console.log("success");
                    setOpenAIdetails(fetchedData);
                }
            }
            catch (error) {
                if (isMounted) {
                    setError(error);
                    console.log(error);
                }
            }
        }
        getOpenAIdetails();


        return () => {
            isMounted = false;
        }
    }, []);

    // send the query to the server and gets the data for the table
    useEffect(() => {
        if (response !== "") {
            let isMounted = true;

            // Get importent details and set the main context
            const getTabledetails = async () => {
                try {
                    const fetchedData = await ApiFetcher(API.apiGetDataFromGPT, "POST", response);
                    if (isMounted) {
                        console.log("success");
                        setTableData(fetchedData);
                        setShowTable(true);
                    }
                }
                catch (error) {
                    if (isMounted) {
                        if (error.message == "Invalid object name.") {
                            console.log("The query is wrong");
                        }
                        setError(error);
                        console.log(error);
                    }
                }
            }
            getTabledetails();


            return () => {
                isMounted = false;
            }
        }
    }, [response]);

    useEffect(() => {
        if (openAIdetails !== null) {
            let isMounted = true;
            setShowTable(false);
            const sendOpenAIdetails = async () => {
                try {
                    const fetchedData = await sendMessageToChatGPT(openAIdetails.openAI_api_key, openAIdetails.organization_ID, messages);
                    if (isMounted) {
                        console.log("success");
                        setResponse(JSON.stringify(fetchedData));
                    }
                }
                catch (error) {
                    if (isMounted) {
                        setError(error);
                        console.log(error);
                    }
                }
            }
            sendOpenAIdetails();


            return () => {
                isMounted = false;
            }
        }
    }, [messages]);

    const sendQuery = () => {
        var textFieldValue = document.getElementById("query").value;
        console.log(textFieldValue);
        setMessages([
            { role: "system", content: data },
            { role: "user", content: textFieldValue },
        ]
        )
    };

    // Changing the direction to rtl
    useEffect(() => {
        setDirection(dispatch, "rtl");

        return () => setDirection(dispatch, "ltr");
    }, []);

    return (
        <Container maxWidth="xl" sx={{ pt: 5, pb: 5, background: "white", borderRadius: "5px" }}>
            <Stack sx={{ mb: 5 }}>
                <h1
                    style={{ padding: "10px 20px", textAlign: "center", color: "black", fontFamily: "Rubik" }}
                >
                    מחולל דוחות באמצעות ChatGPT
                </h1>
                <Stack>
                    <Typography sx={{ m: 2 }}>מחולל הדוחות נועד לעזור לך לצפות בטבלאות מתוך מאגר הנתונים שלך בצורה דינמית ונוחה באמצעות שילוב של מערכת בינה מלאכותית chatGPT של חברת openAI.</Typography>
                    <Typography sx={{ m: 2 }}>כל שעליך לעשות הוא לרשום בצורה ברורה מה ברצונך לראות בתוך שדה הטקסט החופשי וללחוץ על כפתור שלח</Typography>
                    <Typography sx={{ m: 2 }}>במידה והשדות שהזנת תקינים, כעבור מספר שניות תוצג בפנייך הטבלה שביקשת!</Typography>
                    <Typography sx={{ m: 2 }} style={{ whiteSpace: 'pre-line' }}>{'דוגמאות:\n"הבא לי רשימה של כל העובדים"\n"הצג לי את כל המחלקות"'}</Typography>
                </Stack>
                <Stack
                    key="header"
                    direction="row"
                    spacing={12}
                    justifyContent="flex-start"
                    alignItems="center"
                >
                    <TextField
                        size="small"
                        id="query"
                        label="שאילתא לדוגמה"
                        sx={{ m: 0, width: "100%" }}
                    />
                    <Button type="button" onClick={sendQuery}>שלח</Button>
                </Stack>
            </Stack>
            {showTable ? <GPTTable tableData={tableData} setTableData={setTableData} /> : ""}
        </Container>
    );
}

export default ReportGenerator;