const Ollama = require("@langchain/ollama");
const ChatPromptTemplate =  require("@langchain/core/prompts");

module.exports = getSqlResponse = async (input, schema) => {
    try {
      console.log("aqui");
      const llm = new Ollama({
        model: "llama3.1", 
        temperature: 0,
        maxRetries: 2,
      });
      
      
      const prompt = ChatPromptTemplate.fromMessages([
        [
          "system",
          `Com base no esquema de tabela SQL fornecido, devolva uma consulta SQL SELECT ALL que responda à pergunta do utilizador.
        ------------
        SCHEMA: 
        {schema}
        `,
        ],
        ["human", "{input}"],
      ]);
      
      const chain = prompt.pipe(llm);
      const response = await chain.invoke({
        input: input,
        schema: schemas
      });
  
      return response
    } catch (err) {
      console.error('Erro ao conectar no LLM:', err.message);
    }
  };


