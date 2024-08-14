import mysql from 'mysql2/promise';


export default async function connectDatabase() {
  try {

    const connection = await mysql.createConnection({
      host: 'database-1.c04ivxysluch.us-east-1.rds.amazonaws.com', 
      user: 'user_read_only',      
      password: 'laborit_teste_2789',
      database: 'northwind' 
    });

    console.log('Conectado ao banco de dados MySQL com sucesso!');
    
    return connection;
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados MySQL:', err.message);
    throw err;
  }
}
