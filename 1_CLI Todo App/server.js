const express = require('express')
const app = express()
const port = 3000
const router = require('./Router/Route');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.get('/', (req, res) => res.send('Hello Herika!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))