const path = require('path');
const express = require('express')
const cors = require('cors');
const morgan = require('morgan');

const cookieParser = require('cookie-parser');
const { connectDB } = require('./config/db');
const { attachUser } = require('./middleware/auth');
require('dotenv').config();

const app = express()
const port = process.env.PORT || 3000
const router = require('./routers/route')

app.use(cors({ origin: process.env.CLIENT_ORIGIN || true, credentials: true }));
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use('/images', express.static(path.join(__dirname, '../public/images')));

app.use(attachUser);
app.use('/api', router)

app.use((err, req, res, next) => {
  console.error(err);
  if (err.code === 'LIMIT_FILE_SIZE') return res.status(413).json({ error: 'File too large' });
  return res.status(500).json({ error: err.message || 'Server error' });
});

app.get('/', (req, res) => res.send('Hello Herika!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))