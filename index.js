
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import serverless from 'serverless-http';
import getSqlResponse from './llm/ollama.js';
import getSchemaInfo from './database/getSchemaInfo.js';
// import ConnectDB from './database/connect-mongoose.js';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
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
