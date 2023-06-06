const axios = require('axios');

//Testando conexão da API
test('GET -> A API está rodando no servidor local?', async () => {
    
    const response = await axios('http://localhost:7000/');

    expect(response.status).toBe(200);
})

//Testando conexão com o banco de dados
test('GET -> A API está retornando algum conteúdo do banco?', async () => {
    
    const response = await axios('http://localhost:7000/');
    expect(response.data).toBeTruthy();

})

//Testando valores retornados
test('GET -> O primeiro colaborador retornado é chamado "Manoel Felipe Costa"?', async () => {
    
    const response = await axios('http://localhost:7000/');

    expect(response.data.colaboradores[0]).toHaveProperty('nome', "Manoel Felipe Costa");
})

test('GET -> No endpoint colaborador/1 o colaborador retornado tem a id 1?', async () => {
    
  const response = await axios('http://localhost:7000/colaborador/1');

  expect(response.data.colaboradores[0]).toHaveProperty('id', 1);
})

//Testando matchers de números
test('GET -> No endpoint numeros/15, o json retornado tem o valor 15?', async () => {
    
  const response = await axios('http://localhost:7000/numeros/15');

  expect(response.data.numero[0].valor).toEqual(15);
})

test('GET -> No endpoint numeros/15, o json retornado tem um valor maior que 10?', async () => {
    
  const response = await axios('http://localhost:7000/numeros/15');

  expect(response.data.numero[0].valor).toBeGreaterThan(10);;
})

//Testando matchers de lista e checando se um valor é falso
test('GET -> No endpoint lista_compras a lista retornada contém o valor "Leite" ?', async () => {
    
  const response = await axios('http://localhost:7000/lista_compras');

  expect(response.data.lista_compras).toContain("Leite");;
})

test('GET -> A lista de compras enviada tem 5 itens, cheque se ela possui 20, deve retornar falso', async () => {
    
  const response = await axios('http://localhost:7000/lista_compras');
  var verdadeiro = false

  if (response.data.lista_compras.length === 20) 
      verdadeiro = true
  

  expect(verdadeiro).toBeFalsy()
})

//Testando ações não esperadas
test('GET -> Enviando um parâmetro não encontrado na DB, o valor retornado é indefinido?', async () => {
  
  const response = await axios('http://localhost:7000/colaborador/1890');

  expect(response.data.colaboradores[0]).toBeUndefined();
})

test('GET -> Caso um endpoint não declarado seja acessado, retorna erro 404?', async () => {
    try {
      const response = await axios.get('http://localhost:7000/batata');
      expect(response.status).toBe(404);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });
