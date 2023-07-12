import { useState, useEffect } from "react";
import ApiFetcher from "components/ApiFetcher";
import dayjs from 'dayjs';
import Swal from 'sweetalert2'

export default function Alerts({ mainState, handleShowAlert, openProcess, handeleOpenProcess }) {

    const [flag, setFlag] = useState(0);
    const [dateProcess, setDateProcess] = useState(openProcess);
    // const [showAlert, setShowAlert] = useState(true);
    const today = dayjs();
    console.log('hereeeee noooo?????')
    console.log(openProcess);

    useEffect(() => {
        let isMounted = true;

        if (flag == 1) {
            console.log(dateProcess);
            const updateEnDate = async () => {
                try {
                    const fetchedData = await ApiFetcher("https://localhost:7079/quesLimitDate", "PUT", JSON.stringify(dateProcess));
                    if (isMounted) {
                        console.log("success", fetchedData);
                        setFlag(0);
                        Swal.fire({
                            icon: 'success',
                            title: 'תשובתך התקבלה',
                            text: `תאריך היעד השתנה והינו ${dateProcess}`,
                        })
                        handeleOpenProcess(dateProcess);
                    }
                }
                catch (error) {
                    if (isMounted) {
                        console.log(error);
                        Swal.fire({
                            title: "פעולה בוטלה!",
                            text: "אנא נסה שנית או פנה לעזרה מגורם מקצוע",
                            icon: "error",
                            showCloseButton: true,
                            cancelButtonText: "סגור"
                        });
                    }
                }
            }
            updateEnDate();
        }
        else if (flag == 2) {
            console.log(dateProcess);
            const updateEnDate = async () => {
                try {
                    const fetchedData = await ApiFetcher("https://localhost:7079/EndOfEvalu", "PUT", null);
                    if (isMounted) {
                        console.log("success", fetchedData);
                        setFlag(0);
                        Swal.fire({
                            icon: 'success',
                            title: 'בקשתך התקבלה',
                            text: `תהליך ההערכה הסתיים בהצלחה, נפגש בשנה הבאה!`,
                        })
                        handeleOpenProcess(dateProcess);
                    }
                }
                catch (error) {
                    if (isMounted) {
                        console.log(error);
                        Swal.fire({
                            title: "פעולה בוטלה!",
                            text: "אנא נסה שנית או פנה לעזרה מגורם מקצוע",
                            icon: "error",
                            showCloseButton: true,
                            cancelButtonText: "סגור"
                        });
                    }
                }
            }
            updateEnDate();
        }
        return () => {
            isMounted = false;
        }
    }, [flag, dateProcess, handeleOpenProcess]);

    useEffect(() => {
        if (dateProcess !== null) {
            console.log(mainState);
            if (mainState.is_Admin) {
                const diffInDays = dateProcess.diff(today, 'day');
                console.log(diffInDays);
                if (diffInDays < 3 && diffInDays >= 1) {
                    Swal.fire({
                        title: 'האם תרצה להעריך את מועד סיום תהליך ההערכה?',
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'כן, אשמח להאריך',
                        cancelButtonText: 'איני מעוניין להאריך'
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            const { value: days } = await Swal.fire({
                                title: 'בכמה ימים תרצה להאריך?',
                                icon: 'question',
                                input: 'range',
                                inputLabel: 'מספר ימים',
                                inputAttributes: {
                                    min: 0,
                                    max: 30,
                                    step: 1
                                },
                                inputValue: 2
                            })
                            if (days) {
                                setFlag(1);
                                setDateProcess(dateProcess.add(days, 'day'));
                            }
                        }
                        else if (result.isDismissed) {
                            Swal.fire({
                                icon: 'success',
                                title: 'תשובתך התקבלה',
                                text: `תאריך היעד איננו השתנה והינו ${dateProcess}`,
                            })
                            handleShowAlert(false);
                        }
                    })
                }
                else if (diffInDays == 0 || dateProcess.isSame(today)) {
                    Swal.fire({
                        title: 'האם תרצה לסיים את תהליך ההערכה?',
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'כן',
                        cancelButtonText: 'לא, ברצוני להאריך'
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            setFlag(2);
                            Swal.fire({
                                icon: 'info',
                                title: 'תשובתך התקבלה',
                                text: `תהליך ההערכה מתבצע`,
                            })
                        }
                        else if (result.isDismissed) {
                            const { value: days } = await Swal.fire({
                                title: 'בכמה ימים תרצה להאריך?',
                                icon: 'question',
                                input: 'range',
                                inputLabel: 'מספר ימים',
                                inputAttributes: {
                                    min: 0,
                                    max: 30,
                                    step: 1
                                },
                                inputValue: 2
                            })
                            if (days) {
                                setFlag(1);
                                setDateProcess(dateProcess.add(days, 'day'));
                            }
                        }
                    })
                }
            }
            if (mainState.self_Evalu == 1) {
                handleShowAlert(false);
                Swal.fire({
                    icon: 'info',
                    title: 'תהליך הערכה פתוח',
                    text: `נדמה כי עדיין לא סיימת למלא את שלב השאלון העצמי, אל תשכח לעשות זאת!`,
                })
            }
            if (mainState.self_Evalu == 0) handleShowAlert(false);
        }
    }, [mainState, handleShowAlert, dateProcess, today]);


    return (null);
}