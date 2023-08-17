const express = require('express');
require('dotenv').config()
const {questionRouter, postQuestionsRoute} = require('./questionRoutes.js')
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const basePath = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe';
const reviewsRouter = require('./reviewsRoutes.js');


const app = express();
let params = {
  headers: {Authorization: process.env.TOKEN}
}

// make sure before deployment we create an .env file and make this process.env.PORT;
const port = 3000;
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, ".." ,"/client/dist")));
app.use(bodyParser.json());
app.use((req,res,next) => {
  if (!req.headers.authorization) {
    req.headers.authorization = process.env.TOKEN;
  }
  next();
})

app.use(express.json());
app.use('/reviews', reviewsRouter);


// here is the api link if we need it


// this is Victors section
app.post("/questions/:question_id" , (req, res) => {
  postQuestionsRoute(req).then((result) => {
    res.end();
  })
})

app.get("/questions/:product_id", (req,res) => {
  questionRouter(req).then((result) => {
    res.send(result)
  })
})


// this is Ratings & Reviews section
app.use('/reviews', reviewsRouter);

// this is  Heith section


// app.get('/', (req,res) => {
//   console.log('HERE')
//   res.send('test')
// })

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})