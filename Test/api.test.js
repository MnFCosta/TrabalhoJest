//npm init -y
//npm install jest axios

const axios = require('axios');


//Testando listar tarefas

test('GET -> A API está rodando no servidor local?', async () => {
    
    const response = await axios('http://localhost:7000/');

    expect(response.status).toBe(200);
})

test('GET -> A API está retornando algum conteúdo do banco?', async () => {
    
    const response = await axios('http://localhost:7000/');
    expect(response.data).toBeTruthy();

})

test('GET -> O primeiro colaborador retornado é chamado "Manoel Felipe Costa"?', async () => {
    
    const response = await axios('http://localhost:7000/');

    expect(response.data.colaboradores[0]).toHaveProperty('nome', "Manoel Felipe Costa");
})
