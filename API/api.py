#IMPORTS
from fastapi import FastAPI
import mysql.connector
import uvicorn

#Cria um instância da classe FastAPI, usada para definir endpoints
# essa variável também é chamada pelo uvicorn para iniciar o servidor
app = FastAPI()

#Conexão com a base de dados utilizando mysqlconnector
database = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="info2k21",
    database="gaff",
)

#Cursor que será utilizado para executar intruções na database
dbcursor = database.cursor()

#Endpoint root, retorna todos os dados da tabela "colaboradores_user"
@app.get('/')
async def root():
    dbcursor.execute("SELECT * FROM colaboradores_user")
    resultado = dbcursor.fetchall()

    # Converte o resultado a uma lista de dicionários
    rows = []
    for row in resultado:
        rows.append({
            'id': row[0],
            'nome': row[3],
            'celular': row[4],
            'email': row[14],
        })

    return {"colaboradores": rows}


#Endpoint com parâmetro, retorna um dado especifico de "colaboradores_user", baseado no parâmetro enviado
@app.get('/colaborador/{id}')
async def colaborador(id : int):
    dbcursor.execute(f"SELECT * FROM colaboradores_user WHERE id = '{id}'")
    resultado = dbcursor.fetchall()

    # Converte o resultado a uma lista de dicionários
    rows = []
    for row in resultado:
        rows.append({
            'id': row[0],
            'nome': row[3],
            'celular': row[4],
            'email': row[14],
        })

    return {"colaboradores": rows}

#Endpoint que recebe um numero como parâmetro e retorna um json com o valor, para testar matchers de números
@app.get('/numeros/{num}')
async def colaborador(num : int):

    return {"numero":
            [{"valor": num}]
            }

#Endpoint que retorna uma lista de compras, para testar matchers de array e falso
@app.get("/lista_compras")
def lista():

    lista_compras = [
    "Maçãs",
    "Batatas",
    "Pão",
    "Leite",
    "Salsicha",
]
    return {"lista_compras": lista_compras}


#Quando executar o script diretamente, crie um servidor local para a API no localhost com o port 7000
if __name__ == "__main__":
    uvicorn.run("api:app", host="127.0.0.1", port=7000)