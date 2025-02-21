import express from 'express';
import cors from 'cors';
import {fetchOpenRouterResponse} from './query_llm.js'

const app = express();
app.use(express.json());
app.use(cors()); 

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    console.log("backend: message: ", message);
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        // Replace this with your LLM interaction logic

        const llmResponse = `Your message is:  ${message}`;

        // Return the response to the frontend
        res.status(200).json({ message: llmResponse });

    } catch (error) {
        console.error('LLM API error:', error);
        res.status(500).json({ error: 'Failed to interact with LLM' });
    }
});


app.listen(3001, () => {
    console.log("Server running on port 3001");
});