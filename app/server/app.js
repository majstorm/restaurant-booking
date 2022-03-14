require('dotenv').config();
const Koa = require('koa');
const Mongoose = require('mongoose')
const router = require('./routes/routes')
const app = new Koa();

const mongoURI = process.env.MONGO_URI;


// MongoDb connection
Mongoose
  .connect(
    'mongodb://mongodb:27017',
    { useNewUrlParser: true, user: process.env.MONGO_USER, pass: process.env.MONGO_PASSWORD }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Associate router from routes/
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(7500);