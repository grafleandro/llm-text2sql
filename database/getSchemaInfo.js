import connectDatabase from "./connect-mysql.js"


export default async function getSchemaInfo() {
  try {

    const connection = await connectDatabase();
    
        const [Tables] = await connection.execute(
            `SELECT DISTINCT TABLE_NAME 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_SCHEMA = 'northwind' 
            ORDER BY
              TABLE_NAME,
              ORDINAL_POSITION`
          );
      
          let sqlSchemaPrompt;

          for (const TABLE of Tables) {
            console.log(sqlSchemaPrompt);
              const [schemaInfo] = await connection.execute(
                `SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name = ?`, [TABLE.TABLE_NAME]
              );
          
              const createColumns = [];
              const columnNames = [];
          
              // Constrói a lista de colunas e seus tipos
              for (const schemaData of schemaInfo) {
                columnNames.push(`${schemaData['COLUMN_NAME']}`);
                createColumns.push(
                  `${schemaData['COLUMN_NAME']} ${schemaData['COLUMN_TYPE']} ${schemaData['IS_NULLABLE'] === 'NO' ? 'NOT NULL' : ''}`
                );
              }
          
              const sqlCreateTableQuery = `CREATE TABLE ${TABLE.TABLE_NAME} (${createColumns.join(', ')})\n`;
          
              // Compõe o valor final a ser retornado
              sqlSchemaPrompt = `${sqlCreateTableQuery}\n${columnNames.join(' ')}\n}`;

          }

          console.log(`Schemas\n`,sqlSchemaPrompt);

          return sqlSchemaPrompt;

  } catch (err) {
    console.error('Erro ao executar o SQL schema Info:', err.message);
    throw err;
  }
}
