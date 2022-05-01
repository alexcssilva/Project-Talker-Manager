// Validação de Email 

function validateEmail(req, res, next) {
  const { email } = req.body;
  const checkEmail = /\S+@\S+.\S+/;

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!checkEmail.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
}

// Validação de Password 

function validatePassword(req, res, next) {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
}

// Validação de Autorização 

function validateToken(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization === undefined) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  
  next();
}

module.exports = {
  validateEmail,
  validatePassword,
  validateToken,
};