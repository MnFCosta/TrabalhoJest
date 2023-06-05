const axios = require('axios');

let task = {
    title:"",
    description: "Teste de tarefa sem título"
}

const response = axios.post('http://localhost:8000/', task).catch(function (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  });