const fileTalker = './talker.json';
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');
const { 
  validatePassword, 
  validateEmail, 
  validateAuthorization,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateWatcheAt,
  } = require('./middleware/validateToken');

const data = fs.readFileSync(fileTalker, 'utf8');
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
    res.status(HTTP_OK_STATUS).json(JSON.parse(data));
    console.log(data);
});

// 2 - Crie o endpoint GET /talker/:id
// O endpoint deve retornar uma pessoa palestrante com base no id da rota. Devendo retornar o status 200 ao fazer uma requisição /talker/1, com o seguinte corpo:

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;

  const fileContent = JSON.parse(data);

  const chosenId = fileContent.find((params) => params.id === parseInt(id, 0));

  if (chosenId === undefined) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
    return res.status(HTTP_OK_STATUS).json(chosenId);
});

// 3 - Crie o endpoint POST /login
// O endpoint deverá receber no corpo da requisição os campos email e password e retornar um token aleatório de 16 caracteres. Este token será utilizado pelas requisições dos próximos requisitos do projeto.

// 4 - Adicione as validações para o endpoint /login
// Os campos recebidos pela requisição devem ser validados e, caso os valores sejam inválidos, o endpoint deve retornar o código de status 400 com a respectiva mensagem de erro ao invés do token.

app.post('/login',
  validateEmail,
  validatePassword,
  (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  
   return res.status(HTTP_OK_STATUS).json({ token });
});

// 5 - Crie o endpoint POST /talker

app.post('/talker',
  validateAuthorization,
  validateName,
  validateAge,
  validateTalk,
  validateWatcheAt,
  validateRate,
  (req, res) => {
  const { name, age, talk } = req.body;
  const file = JSON.parse(data);
  
  const objUser = {
    name,
    age,
    id: file.length + 1,
    talk,
  };

  const arrayTalker = [...file, objUser];
  
  fs.writeFileSync(fileTalker, JSON.stringify(arrayTalker));

    return res.status(201).json(objUser);
  });