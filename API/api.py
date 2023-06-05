from fastapi import FastAPI
import mysql.connector
import uvicorn

app = FastAPI()

database = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="info2k21",
    database="gaff",
)

@app.get('/')
async def root():
    dbcursor = database.cursor()
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

if __name__ == "__main__":
    uvicorn.run("api:app", host="127.0.0.1", port=7000)