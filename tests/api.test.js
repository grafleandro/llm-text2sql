
const request = require('supertest');


const host = "localhost:3000/dev/api/chat";
const apiKey = "ovc06FJnpP8GwtbFQoyxD259ZwG5l2uu5vOWuhNW";

describe('API /dev/chat', () => {
  // Cenário 1: Body enviado corretamente
  it('should send the correct body', async () => {
    const body = {
      question: "Qual a cidade do cliente Jonh?"
    };
    

    const response = await request(host)
      .post('/')
      .send(body) 
      .set('Content-Type', 'application/json')
      .set('x-api-key', apiKey);

    expect(response.status).toBe(200);

    
  }, 480000);

  // // Cenário 2: Body não enviado (ou vazio)
  it('should return an error if body is not sent', async () => {
        

      const response = await request(host)
      .post('/')
      .send() 
      .set('Content-Type', 'application/json')
      .set('x-api-key', apiKey);
      
      expect(response.status).toBe(400);
        
        
      expect(response.body.error).toBe("Body is required");
    
  },480000);

  // Cenário 3: x-api-key não enviada
  it('should return an error if x-api-key is not sent', async () => {
    const body = {
      question: "Como descobrir a cidade de Jonh?"
    };

      const response = await request(host)
      .post('/')
      .send(body) 
      .set('Content-Type', 'application/json')

      console.log(response)

      expect(response.status).toBe(401);

      expect(response.body.error).toBe("API key is required");

  },480000);

  it('should return an error if the provided x-api-key is incorrect', async () => {
    const body = {
      question: "Como descobrir a cidade de Jonh?"
    };

      const response = await request(host)
      .post('/')
      .send(body) 
      .set('Content-Type', 'application/json')
      .set('x-api-key', "ovc06FJnpP8GwtbFQoyxD259ZwG5l2uu5vOWuh");

      console.log(response)

      expect(response.status).toBe(403);

      expect(response.body.error).toBe("Invalid API key");

  },480000);

  // Cenário 4: Validação do formato da resposta da API
  it('should return a response in the correct JSON format with a string field "response"', async () => {
    const body = {
      question: "Como descobrir a cidade de Jonh?"
    };
  
    const response = await request(host)
      .post('/')
      .send(body) 
      .set('Content-Type', 'application/json')
      .set('x-api-key', apiKey);

    
    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('response');

  },480000);
});
