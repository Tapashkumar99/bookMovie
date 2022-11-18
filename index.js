const express = require("express");                // importing express for creating server
const app = express();                             // Defining App Component to use express
const bodyParser = require("body-parser");
const port = 8080;                                  // Defining port to run server
const path = require('path')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const { connection } = require("./connector");      // importing connector.js to make DB connection
const cors = require('cors')                        // Importing cors
app.use(cors())                                     // Using cors for cross origin resource sharing here frontend and backend

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// POST API which insert booking data to dataBase
app.post("/api/booking", async (req, res) => {
  let data = new connection(req.body);
  let result = await data.save();
  res.status(200).send(result);
});

// GET API for returning last booking details from dataBase
app.get("/api/booking", async (req, res) => {
  let data = await connection.find();
  if (data.length == 0) {
    res.send([]);
  } else {
    res.send([data[data.length - 1]]);
  }
});

if(process.env.NODE_ENV == 'production'){
  app.get('/',(req,res) => {
    app.use(express.static(path.resolve(__dirname,'client','build')))
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}

// Start Server
app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;   