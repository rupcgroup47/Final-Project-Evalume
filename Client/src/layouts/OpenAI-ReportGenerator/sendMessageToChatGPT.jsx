const apiUrl = "https://api.openai.com/v1/chat/completions";
const model = "gpt-3.5-turbo";

const sendMessageToChatGPT = async (apiKey, orgID, messages) => {
    console.log("shshshs");
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
                "OpenAI-Organization": orgID,
            },
            body: JSON.stringify({ model, messages }),
        });

        if (!response.ok) {
            console.error("Error:", response.json());
            throw new Error("Something went wrong");
        }

        const data = await response.json();
        console.log("Reply:", data);

        const assistantReply = data.choices[0].message.content;

        // Handle the assistant reply as needed (e.g., update UI state)
        console.log("Assistant Reply:", assistantReply);
        return assistantReply;

    } catch (error) {
        // Handle any errors that occurred during the API request
        console.error("Error:", error);
        const errorResponse = await error.response.json();
        console.log("Error Response:", errorResponse);
    }
};

export default sendMessageToChatGPT;