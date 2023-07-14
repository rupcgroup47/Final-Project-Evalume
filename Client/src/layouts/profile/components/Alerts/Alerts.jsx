import { useState, useEffect } from "react";
import ApiFetcher from "components/ApiFetcher";
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

export default function Alerts({ mainState, handleShowAlert, openProcess, handeleExtention, handleCloseProcess }) {
    // const [showAlert, setShowAlert] = useState(true);
    const today = dayjs();

    useEffect(() => {
        if (openProcess !== null) {
            if (mainState?.is_Admin) {
                const diffInDays = openProcess.diff(today, 'day');
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
                                handeleExtention(openProcess.add(days, 'day'));
                            }
                        }
                        else if (result.isDismissed) {
                            Swal.fire({
                                icon: 'success',
                                title: 'תשובתך התקבלה',
                                text: `תאריך היעד איננו השתנה והינו ${dayjs(openProcess).format('DD/MM/YYYY')}`,
                            })
                            handleShowAlert(false);
                        }
                    })
                }
                else if (diffInDays == 0 || openProcess.isSame(today)) {
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
                            Swal.fire({
                                icon: 'info',
                                title: 'תשובתך התקבלה',
                                text: `סגירת תהליך ההערכה מתבצע`,
                            })
                            handleCloseProcess(true);
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
                                handeleExtention(openProcess.add(days, 'day'));
                            }
                        }
                    })
                }
            }
            if (mainState?.self_Evalu == 1) {
                Swal.fire({
                    icon: 'info',
                    title: 'תהליך הערכה פתוח',
                    text: `נדמה כי עדיין לא סיימת למלא את שלב השאלון העצמי, אל תשכח לעשות זאת!`,
                })
                handleShowAlert(false);
            }
        }
    }, [mainState, handleShowAlert, openProcess, today]);

    return (null);
}