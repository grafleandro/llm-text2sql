import { Ollama } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";


export default async function getSqlResponse(input, schemas) {
  try {
    console.log("Aguardando o LLM...");
    const llm = new Ollama({
      model: "codellama:13b", 
      // model: "codegemma", 
      // model: "mistral-nemo", 
      // model: "llama3.1", 
      temperature: 0,
      maxRetries: 2,
    });
   
    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `Você é um especialista em transformar texto em linguagem natural para {dialect}. Quando fornecer uma consulta em linguagem natural, sua tarefa será gerar a query em  {dialect} correspondente.
        #Regras
        1. Não incluir blocos de código, o tipo de linguagem, ou quebras de linha. 
        2. A resposta deve ter apenas a query SQL. Será executada diretamente no mysql. 
        3. Retorne a query de forma simples, apenas com o SQL puro. Certifique-se de que não haja os símbolos \` ou a palavra 'sql', e que a query seja uma única linha de texto, sem '\n'.
        4. O banco de dados está com dados escritos em inglês. adicione um OR nas query tratando o dado no idioma fornecido e a outra em sua versão em inglês. Exemplo: select [preencher de acordo com os campos exigidos na pergunta] from products where name like "livro" or name like "ebook".
        5. Não exponha a chave primaria das tabelas.
        6. Não adicione condições de filtragem que não estejam claras na pergunta.
        7. Se o contexto fornecido for suficiente, gere uma consulta válida sem quaisquer explicações para a pergunta.
        8. Se o contexto fornecido for insuficiente, não explique por que não pode ser gerado.
        9. Utilize a(s) tabela(s) mais relevante(s).
        10.  Ao buscar por nome, descrição inclua o %[termo procurado]%, para garantir maior acetividade.
        11. Quando realizar consultas em colunas que trate de nome, descrição sempre utilize a função LOWER() tanto no nome da coluna quanto no valor de busca para garantir que a consulta seja insensível a maiúsculas e minúsculas. Exemplo: LOWER(nome_coluna) = LOWER('valor_procurado').

      Gere uma consulta {dialect} para responder à pergunta informada, respeitando as regras acima. 
      A sua resposta deve basear-se APENAS no que estiver entre a tag de <context>.
      <context>
      {schema}
      </context>
      `
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