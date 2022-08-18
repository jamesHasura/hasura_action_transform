const express = require('express');
const bodyParser = require('body-parser');
const {getRandomDate, getRandomBool} = require('./utils/generate-random');
const app = express();
const port = 3005;
const hostname = 'localhost';

app.use(bodyParser.json());

app.post('/request-example-one', (req, res) => {
  console.log('Here is the transformed request body', req.body);
  res.json({
    accessToken: 'mockToken',
  });
});

app.post('/request-example-two', (req, res) => {
  console.log('Here is the transformed request body', req.body);
  const {username, profile_metadata} = req.body;
  res.json({
    username,
    profile_metadata,
  });
});

app.get('/response-example-one', (req, res) => {
  res.json({
    first_name: 'Melvin',
    last_name: 'Shanahan',
  });
});

app.get('/response-example-two', (req, res) => {
  res.json({
    name: 'Freddie Jones',
    age: 27,
    author: {
      articles: [
        {id: 0, title: 'The Elements', length: 150, published: true},
        {id: 1, title: 'ARRL Handbook', length: 1000, published: true},
        {id: 2, title: 'The Mars Trilogy', length: 500, published: false},
      ],
    },
  });
});

app.get('/response-example-three', (req, res) => {
  res.json([
    {[getRandomDate()]: getRandomBool()},
    {[getRandomDate()]: getRandomBool()},
  ]);
});

app.listen(port, hostname, () => {
  console.log(`Example app running at http://${hostname}:${port}/`);
});
