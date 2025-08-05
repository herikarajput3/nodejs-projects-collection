const express = require('express')
const app = express()
const port = 3000
const router = require('./Routes/router')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', router)


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))