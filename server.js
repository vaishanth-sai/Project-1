const express = require('express');
const path = require('path');
const app = express();
app.use(express.json({limit:'20kb'}));
app.use(express.static(path.join(__dirname, 'public')));
app.post('/api/contact', (req,res) => {
  const {name,email,message} = req.body || {};
  if (![name,email,message].every(v => typeof v === 'string' && v.trim()))
    return res.status(400).json({error:'Name, email, and message are required.'});
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    return res.status(400).json({error:'Enter a valid email address.'});
  // Demo endpoint: connect a database/email service to persist or deliver messages.
  console.log(`Contact form received from ${name.trim()} <${email.trim()}>`);
  res.json({message:'Thanks! Your message passed validation. (Demo mode: not emailed or saved.)'});
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Portfolio running at http://localhost:${port}`));
