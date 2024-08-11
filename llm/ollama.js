import { Ollama } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";

export default async function getSqlResponse(input, schemas) {
  try {
    console.log("aqui");
    const llm = new Ollama({
      model: "duckdb-nsql", 
      temperature: 0,
      maxRetries: 2,
    });
    
    
    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `Converta a seguinte solicitação em uma consulta SQL, utilizando o esquema de banco de dados fornecido entre as tags <contexto></contexto>. Se a solicitação envolver mais de uma tabela e houver uma relação entre elas, realize uma junção de tabelas. Use as informações dentro de <contexto></contexto> para identificar as tabelas, suas colunas e as relações entre elas. As tabelas disponíveis no banco de dados são:

- customers
- employee_privileges
- employees
- inventory_transaction_types
- inventory_transactions
- invoices
- order_details
- order_details_status
- orders
- orders_status
- orders_tax_status
- privileges
- products
- purchase_order_details
- purchase_order_status
- purchase_orders
- sales_reports
- shippers
- strings
- suppliers

<contexto>
Schemas:
      {schema}
Relacionamto:
        fk_orders_customers,customer_id,customers,id
        fk_orders_employees1,employee_id,employees,id
        fk_orders_orders_status1,status_id,orders_status,id
        fk_orders_orders_tax_status1,tax_status_id,orders_tax_status,id
        fk_orders_shippers1,shipper_id,shippers,id
        fk_invoices_orders1,order_id,orders,id
        fk_order_details_orders1,order_id,orders,id
        fk_order_details_order_details_status1,status_id,order_details_status,id
        fk_order_details_products1,product_id,products,id
        fk_purchase_order_details_inventory_transactions1,inventory_id,inventory_transactions,id
        fk_purchase_order_details_products1,product_id,products,id
        fk_purchase_order_details_purchase_orders1,purchase_order_id,purchase_orders,id
        fk_purchase_orders_employees1,created_by,employees,id
        fk_purchase_orders_purchase_order_status1,status_id,purchase_order_status,id
        fk_purchase_orders_suppliers1,supplier_id,suppliers,id
</contexto>
**Regras:**
Só realize relação entre tabelas quando necessario.
Crie SQL que responda a pergunta de forma direta, não invente possiveis casos na resposta do SQL.

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