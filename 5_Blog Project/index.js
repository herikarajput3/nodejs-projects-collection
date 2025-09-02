const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = require('./routers/route')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', router)

app.get('/', (req, res) => res.send('Hello Herika!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))