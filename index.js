const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const port = process.env.PORT || 4000;

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html");
})

const todoRoute = require("./routes/todoRoute")
app.use("/api/v1",todoRoute);

const dbConnect = require ("./config/dataBase");
dbConnect();

app.listen(port, (err) => { 
  if (err) {
    console.error('Unable to start server:', err);
  } else {
    console.log('Server started on port', port);
  }
});

app.use((req, res) => {
  res.send('Not Found');
});