import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const openAiApiKey = process.env.OPENAI_API_KEY;
console.log(openAiApiKey)

async function getOpenAiResponse(prompt) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',  // ✅ Ensure this is correct
      {
        model: 'gpt-3.5-turbo',  // ✅ Use a valid model like 'gpt-4' or 'gpt-3.5-turbo'
        messages: [{ role: 'user', content: prompt }],  // ✅ Use messages instead of prompt
        max_tokens: 100,
      },
      {
        headers: {
          'Authorization': `Bearer ${openAiApiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API request failed:', error.response?.data || error.message);
  }
}


const openRouterApiKey = process.env.OPENROUTER_API_KEY

// fetch("https://openrouter.ai/api/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       "Authorization": `Bearer ${openRouterApiKey}`,
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       "model": "google/gemini-2.0-flash-thinking-exp:free",
//       "messages": [
//         {
//           "role": "user",
//           "content": [
//             {
//               "type": "text",
//               "text": "i have a graphql table called 'shoes' can you convert \"help me find all the female showsin the databse\" into graph ql command?"
//             },
//           ]
//         }
//       ]
//     })
//   })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then(data => {
//     //   console.log("AI Response:", JSON.stringify(data, null, 2));
//       const response_data = JSON.stringify(data, null, 2);
//     //   console.log(response_data.choices)

//     })
//     .catch(error => {
//       console.error("Error:", error);
//     });


const user_request = 'Find all MRI images for lucy';
const USER_PROMPT = `dicom is table to store metadata associated with a dicom. dicom has 5 fields: id, patientName, modality, createdTime and Type. Please convert user request into a sql. \n [user request]\n ${user_request}`;


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