const express = require('express');
const { get } = require('axios');
const User = require('./db');

const PORT = 4321;
const URL = 'https://kodaktor.ru/j/users';
const app = express();
app
  .get('/hello/', r => r.res.end('Hello world!'))
  .get('/aprilusers/', async r => {
    const items = await User.find();
    r.res.render('list', { title: 'Список логинов из БД', items });
  })
  .get('/aprilusers/:login', async r => {
    //const items = await User.find("user", r.params.login);
    const item = await User.findOne({"login": r.params.login});
    //console.log(items);
    //r.res.render('list', { title: 'Логин из БД', items });
    r.res.send('<H1>Login: ' + item.login + '<br>Password: ' + item.password + '</H1>');
  })
  .get('/users/', async r => {
    const { data: { users: items } } = await get(URL);
    r.res.render('list', { title: 'Список логинов из kodaktor.ru/j/user', items });
  })
  .use(r => r.res.status(404).end('Still not here, sorry!'))
  .use((e, r, res, n) => res.status(500).end(`Error: ${e}`))
  .set('view engine', 'pug')
  .listen(process.env.PORT || PORT, () => console.log(process.pid));
