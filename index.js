const fileTalker = './talker.json';
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// 1 - Crie o endpoint GET /talker
// Os seguintes pontos serão avaliados:
// O endpoint deve retornar um array com todas as pessoas palestrantes cadastradas. Devendo retornar o status 200, com o seguinte corpo:

app.get('/talker', (req, res) => {
  const data = fs.readFileSync(fileTalker, 'utf8');

    res.status(HTTP_OK_STATUS).json(JSON.parse(data));
    console.log(data);
});

// 2 - Crie o endpoint GET /talker/:id
// O endpoint deve retornar uma pessoa palestrante com base no id da rota. Devendo retornar o status 200 ao fazer uma requisição /talker/1, com o seguinte corpo:

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync(fileTalker, 'utf8');

  const fileContent = JSON.parse(data);

  const chosenId = fileContent.find((params) => params.id === parseInt(id, 0));

  if (chosenId === undefined) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
    return res.status(HTTP_OK_STATUS).json(chosenId);
});

// 3 - Crie o endpoint POST /login
// O endpoint deverá receber no corpo da requisição os campos email e password e retornar um token aleatório de 16 caracteres. Este token será utilizado pelas requisições dos próximos requisitos do projeto.

app.post('/login', (req, res) => {
  const data = fs.readFileSync(fileTalker, 'utf8');
  const token = crypto.randomBytes(8).toString('hex');
  
    res.status(HTTP_OK_STATUS).json({ token: token});
    console.log(data);
});
