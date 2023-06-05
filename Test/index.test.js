//npm init -y
//npm install jest axios

const axios = require('axios');


//Testando listar tarefas

test('GET -> A API está rodando no servidor local?', async () => {
    
    const response = await axios('http://localhost:8000/');

    expect(response.status).toBe(200);
})

test('GET -> Método "Todas as tarefas" retornou algum conteúdo?', async () => {
    
    const response = await axios('http://localhost:8000/');
    expect(response.data).toBeTruthy();

})

test('GET -> A primeira tarefa retornada possui o título "Correr"?', async () => {
    
    const response = await axios('http://localhost:8000/');
    
    expect(response.data.filmes[0]).toHaveProperty('titulo', "OK");
})