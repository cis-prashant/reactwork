const express = require('express');
const app = express();
const port = 3000;
const router = express.Router();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

var routes = require('./routes/index.js');
app.use('/api/v1', routes(router));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})