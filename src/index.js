
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import serverless from 'serverless-http';
import getSqlResponse from './llm/ollama.js';
import getSchemaInfo from './database/getSchemaInfo.js';
import authenticateApiKey from './middleware/authenticateApiKey.js';
import { config  } from 'dotenv';

const app = express();
config();

app.use(cors());
app.use(authenticateApiKey)
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {

    if (!req.body || !req.body.question) {
      return res.status(400).json({
        error: 'Body is required'
      });
    }

    const UserQuestion = req.body.question;

    console.log('question received from client:', UserQuestion);

    const schemas = await getSchemaInfo();

    const sql = await getSqlResponse(
      UserQuestion,
      schemas
    );

    return res.json({ response: sql });
  } catch (error) {
    res.status(500).json({ error: 'Error communicating with LLM' });
  }
});

export const handler = serverless(app);
