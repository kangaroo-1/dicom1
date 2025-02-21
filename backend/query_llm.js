import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const openRouterApiKey = process.env.OPENROUTER_API_KEY

const user_request = 'Find all US images for lucy';
const USER_PROMPT = `dicom is table to store metadata associated with a dicom. dicom has 5 fields: id, patientName, modality, createdTime and Type. Please convert user request into a sql. \n [user request]\n ${user_request}. After converting into sql, convert the sql you get into supabase javascript command. Generate Code only.Knowledge: us is a type of modality`;



const USER_PROMPT2 = '';
export default async function fetchOpenRouterResponse(context, userMessage) {
    try {
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "google/gemini-2.0-flash-thinking-exp:free",  
                messages: 
                        [
                            {
                                role: "system",
                                content: "You are an assistant that converts user requests into Supabase fetch commands. You have the following table and column information:"
                            },
                            {
                                role: "system",
                                content: "Table: dicom, Columns: id, name, studyInstanceUid, seriesInstanceUid, patientName, modality, dicom_url"
                            },
                            {   role: "user", 
                                content: `context:${context} user request: ${userMessage}` 
                            }
                        ],
            },
            {
                headers:{
                    "Authorization": `Bearer ${openRouterApiKey}`,
                    "Content-Type": "application/json"
                }
            },

        )
        const message = response.data.choices[0].message.content;
        return message;

    } catch (error) {
        console.error("Error fetching response:", error.response ? error.response.data : error.message);
    }

}