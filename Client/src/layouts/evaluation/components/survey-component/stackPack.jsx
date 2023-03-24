import React, { useState } from "react";

function QuestionnaireForm() {
    const [responses, setResponses] = useState([
        {
            question: "How would you rate your experience?",
            numericResponse: 1,
            freeResponse: "",
        },
        {
            question: "What did you like or dislike about your experience?",
            numericResponse: 1,
            freeResponse: "",
        },
        {
            question: "Any additional comments or feedback?",
            numericResponse: 1,
            freeResponse: "",
        },
    ]);

    const handleNumericResponseChange = (index, value) => {
        setResponses((prevState) => {
            const newState = [...prevState];
            newState[index].numericResponse = parseInt(value);
            return newState;
        });
    };

    const handleFreeResponseChange = (index, value) => {
        setResponses((prevState) => {
            const newState = [...prevState];
            newState[index].freeResponse = value;
            return newState;
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // handle form submission
    };

    return (
        <form onSubmit={handleSubmit}>
            {responses.map((response, index) => (
                <div key={index} className="question">
                    <label>{response.question}</label>
                    <div className="answer">
                        {[0, 1, 2, 3, 4, 5].map((value) => (
                            <label key={value}>
                                <input
                                    type="radio"
                                    name={`numeric-response-${index}`}
                                    value={value}
                                    checked={response.numericResponse === value}
                                    onChange={(event) =>
                                        handleNumericResponseChange(index, event.target.value)
                                    }
                                />
                                {value}
                            </label>
                        ))}
                        <textarea
                            value={response.freeResponse}
                            onChange={(event) =>
                                handleFreeResponseChange(index, event.target.value)
                            }
                        />
                    </div>
                </div>
            ))}
            <button type="submit">Submit</button>
        </form>
    );
}

export default QuestionnaireForm;