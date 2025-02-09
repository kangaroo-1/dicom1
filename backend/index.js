import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();


const openRouterApiKey = process.env.OPENROUTER_API_KEY

const user_request = 'Find all US images for lucy';
const USER_PROMPT = `dicom is table to store metadata associated with a dicom. dicom has 5 fields: id, patientName, modality, createdTime and Type. Please convert user request into a sql. \n [user request]\n ${user_request}. After converting into sql, convert the sql you get into supabase javascript command. Generate Code only.Knowledge: us is a type of modality`;



const USER_PROMPT2 = '';
async function fetchOpenRouterResponse() {
    try {
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "google/gemini-2.0-flash-thinking-exp:free",  // Choose an available model
                messages: [{ role: "user", content: USER_PROMPT }],
            },
            {
                headers:{
                    "Authorization": `Bearer ${openRouterApiKey}`,
                    "Content-Type": "application/json"
                }
            },

        )
        const message = response.data.choices[0].message.content;
        console.log("AI Response:", message);

    } catch (error) {
        console.error("Error fetching response:", error.response ? error.response.data : error.message);
    }


}

fetchOpenRouterResponse();