const express = require('express');
const {getRandomDate, getRandomBool} = require('./utils/generate-random');
const app = express();
const port = 3005;
const hostname = 'localhost';

app.get('/', (req, res) => {
  res.json('Hello World!');
});

app.get('/calendar-example', (req, res) => {
  // Mock Request
  let data = [];
  for (let i of Array(5).keys()) {
    data.push({
      [getRandomDate()]: {
        onSale: getRandomBool(),
        soldOut: getRandomBool(),
        closed: getRandomBool(),
      },
    });
  }
  res.json(data);
});

// Example which shows how Hasura can transform dictionary values
// Handler returns -> {"date": "1/12/23"}
// Hasura transforms response to -> {"date": ["1/12/23"]}
// Kriti template utilized -> "{\"date\": [\"{{$body.date}}\"]}"
app.get('/example-one', (req, res) => {
  // Mock Request
  res.json({date: getRandomDate()});
});

app.get('/example-two', (req, res) => {
  res.json([
    {[getRandomDate()]: getRandomBool()},
    {[getRandomDate()]: getRandomBool()},
  ]);
});

app.listen(port, hostname, () => {
  console.log(`Example app running at http://${hostname}:${port}/`);
});
