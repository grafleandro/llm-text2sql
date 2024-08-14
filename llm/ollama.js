import { Ollama } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";


export default async function getSqlResponse(input, schemas) {
  try {
    console.log("Aguardando o LLM...");
    const llm = new Ollama({
      model: "mistral-nemo", 
      // model: "llama3.1", 
      temperature: 0,
      maxRetries: 2,
    });
    
    
    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `You are a {dialect} expert.

Please help to generate a {dialect} query to answer the question. Your response should ONLY be based on the given context and follow the response guidelines and format instructions.

===Tables
{schema}


===Response Guidelines
1. Translate the question into English and then formulate your answer.
2. Don't add filter conditions that aren't clear in the question.
3. If the provided context is sufficient, please generate a valid query without any explanations for the question.
4. If the provided context is insufficient, please explain why it can't be generated
5. Please use the most relevant table(s).


===Question
{input}

`,
      ],
      ["human", "{input}"],
    ]);
    
    const chain = prompt.pipe(llm);
    const response = await chain.invoke({
      input: input,
      schema: schemas,
      dialect: "SQL"
    });

    return response
  } catch (err) {
    res.status(500).json({ error: 'Error connecting to LLM' });
  }
};