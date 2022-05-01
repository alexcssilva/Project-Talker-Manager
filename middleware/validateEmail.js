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

module.exports = validateEmail;