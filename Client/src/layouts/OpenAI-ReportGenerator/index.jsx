import { Container } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { useMaterialUIController, setDirection } from "context";
import { MainStateContext } from "App";
import { EvalueContext } from "context/evalueVariables";
import ApiFetcher from "components/ApiFetcher";
import sendMessageToChatGPT from "../OpenAI-ReportGenerator/sendMessageToChatGPT";

function ReportGenerator() {
    const [, dispatch] = useMaterialUIController();
    const { mainState, setMainState } = useContext(MainStateContext);
    const { API } = useContext(EvalueContext);
    const [error, setError] = useState(null);
    const [openAIdetails, setOpenAIdetails] = useState(null);

    //all API calls
    useEffect(() => {
        let isMounted = true;

        // Get importent details and set the main context
        const getOpenAIdetails = async () => {
            try {
                const fetchedData = await ApiFetcher(API.apiOpenAIdetails, "GET", null);
                if (isMounted) {
                    console.log("success");
                    console.log(fetchedData);
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

    useEffect(() => {
        if (openAIdetails !== null) {
            let isMounted = true;
            // Example usage:
            const messages = [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: "What's the weather like today?" },
            ];

            console.log(openAIdetails.openAI_api_key);
            console.log(openAIdetails.organization_ID);

            // const sendOpenAIdetails = async () => {
            //     try {
            //         const fetchedData = await sendMessageToChatGPT(openAIdetails.openAI_api_key, openAIdetails.organization_ID, messages);
            //         if (isMounted) {
            //             console.log("success");
            //             console.log(fetchedData);
            //         }
            //     }
            //     catch (error) {
            //         if (isMounted) {
            //             setError(error);
            //             console.log(error);
            //         }
            //     }
            // }
            // sendOpenAIdetails();


            return () => {
                isMounted = false;
            }
        }
    }, [openAIdetails]);


    // Changing the direction to rtl
    useEffect(() => {
        setDirection(dispatch, "rtl");

        return () => setDirection(dispatch, "ltr");
    }, []);

    return (
        <Container maxWidth="xl" sx={{ pt: 5, pb: 5 }}>
            <h1
                style={{ padding: "10px 20px", textAlign: "center", color: "black", fontFamily: "Rubik" }}
            >
                מחולל דוחות באמצעות ChatGPT
            </h1>
        </Container>
    );
}

export default ReportGenerator;