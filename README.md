# Projeto de API de Text2SQL

    Este projeto consiste em uma API que permite aos usuários enviar uma pergunta e obter uma consulta SQL gerada pelo modelo LLM mistral-nemo. O projeto utiliza Express para o servidor da aplicação rodando em um serverless. MySQL para o banco de dados. Docker para a contêinerização do LLM.

## ⚠️ Avisos Importantes: 

> 
> **Contexto**: A aplicaçao foi desenvolvida utilizando LLM opensource que requer o download dentro do docker, sendo necessario executar os comando do [Executando o LLM com Docker](#passos-para-rodar-localmente). O processo de download do modelo vai demora de acordo com a velocidade de sua internet, o tamanho do arquivo é de 7 GB.


> **Lentidão na resposta da API**:A aplicação pode demorar a responder devido a configuração da máquina,nos testes realizados não passou de 2 minutos. Considere enviar a pergunta e ir buscar o café.

> <strong>Qualquer dúvida estou a disposição.</strong>

## Tecnologias Utilizadas

- **Express**: Framework para criação de APIs em Node.js.
- **MySQL**: Banco de dados relacional.
- **Ollama**: 
    Ollama é uma plataforma de código aberto que visa simplificar a criação e o gerenciamento de modelos de linguagem de aprendizado de máquina, proporcionando uma maneira eficiente para que desenvolvedores e pesquisadores possam trabalhar com esses modelos.
- **LLM mistral-nemo**: 
    Mistral NeMo é um modelo 12B construído em colaboração com a NVIDIA. Mistral NeMo oferece uma grande janela de contexto de até 128k tokens. Seu raciocínio, conhecimento de mundo e precisão de codificação são de última geração em sua categoria de tamanho.
- **Serverless**: Ferramenta para criar e implantar funções serverless.
- **Docker**: Contêinerização do ambiente de desenvolvimento e execução.

## Estrutura do Projeto



- **`docker-compose.yml`**: Arquivo para configurar e iniciar contêiner Docker.
- **`src/index.js`**: Código principal do servidor Express.
- **`src/llm/llama.js`**: Implementação para interação com o LLM .
- **`ollama`**: Pasta criada pelo ollama para salvar arquivos do LLM.
- **`tests`**: Testes automatizados da aplicação.
- **`src/database/connect-mysql.js`**: Código para conexão com o banco de dados MySQL.
- **`yamls`**: Pasta com arquivos para configuração das variáveis de ambiente do serverless.
- **`package.json`**: Gerenciador de dependências e scripts do Node.js.
- **`serverless.yaml`**: Configuração do serverless.

## Configuração do Ambiente Local

### Requisitos
- Node.js
- Docker
- MySQL
- Docker Compose 
- 8 GB de memória RAM
- 25 GB de HD livre

### Passos para Rodar Localmente

1. **Clone o Repositório**

   ```bash
   git clone https://github.com/usuario/nome-do-repositorio.git
   cd nome-do-repositorio

2. **Instale as Dependências**
    ```bash
    npm install
    ````

3. **Executando o LLM com Docker**

      1 - Inicia o container.
      
      2 - Realiza o pull do modelo e o starta, deixando uma mensagem pedindo um input no terminal do container.
    ```bash
    docker-compose up -d
    docker exec -it ollama ollama run mistral-nemo
    ```

4. **Executando o Serverless com a aplicação**
    ```bash
    npm run dev
    ```

4. **Testar a API**
Após iniciar o servidor, você pode testar a API enviando uma solicitação POST para http://localhost:3000/dev/api/chat com um corpo JSON contendo a pergunta. Por exemplo:
{
  "question": "Como eu seleciono todos os clientes com email?"
}
    ```bash
      curl --location 'localhost:3000/dev/api/chat' \
      --header 'x-api-key: ovc06FJnpP8GwtbFQoyxD259ZwG5l2uu5vOWuhNW' \
      --header 'Content-Type: application/json' \
      --data '{
          "question":"Qual a cidade do cliente Jonh?"
      }'
    ```