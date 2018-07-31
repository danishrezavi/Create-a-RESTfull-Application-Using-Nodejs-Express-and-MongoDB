var express = require("express");
var app = express();
var port = 3000;

//require in body-parser
var bodyParser = require('body-parser');
//convert the data in the Json format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//require in database
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
//creating database
mongoose.connect("mongodb://localhost:27017/postdb", { useNewUrlParser: true });
 //creting schema for the database
 var postschema = new mongoose.Schema({
 	title: String,
	description: String
});

 var postdata = mongoose.model("postdata", postschema, "postdata");

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/addpost", (req, res) => {
  var myData = new postdata(req.body);
  myData.save()
    .then(item => {
      res.send("Title and Description saved to database’");
    })
    .catch(err => {
      res.status(400).send("saving data failed");
    });
});
 
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
