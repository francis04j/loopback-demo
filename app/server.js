let express = require('express');
let path = require('path');
let fs = require('fs');
let MongoClient = require('mongodb').MongoClient;
let bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });

app.get('/profile-picture', function (req, res) {
  let img = fs.readFileSync(path.join(__dirname, "images/profile-1.jpg"));
  res.writeHead(200, {'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});

// use when starting application locally
let mongoUrlLocal = "mongodb://admin:password@localhost:27017";

// use when starting application as docker container
let mongoUrlDocker = "mongodb://admin:password@mongodb";

app.post('/update-profile', function (req, res) {
  let userObj = req.body;

  let success = false;
  var mongoClientCallback = function (err, client) {
    if (err) throw err;
    
    let db = client.db('user-account');
    userObj['userid'] = 1;
    console.log('Succesfully connected to user account db')
    let myquery = { userid: 1 };
    let newvalues = { $set: userObj };
    let updateSucess = false;
    
    var callbackFn = function(err, res) {
      if (err){ 
        throw err;
      }else{
        updateSucess = true;
      }
      console.log('Succesfully updated or inserted')
      // client.close();
    }
    db.collection("users").updateOne(myquery, newvalues, {upsert: true}, callbackFn(err, res));   
    success = updateSucess; 
  }; 
  MongoClient.connect(mongoUrlLocal, function (err, client) {
    if (err) throw err;
    
    let db = client.db('user-account');
    userObj['userid'] = 1;
    console.log('Succesfully connected to user account db')
    let myquery = { userid: 1 };
    let newvalues = { $set: userObj };
    let updateSucess = false;
    
    var callbackFn = function(err, res) {
      if (err){ 
        throw err;
      }else{
        updateSucess = true;
      }
      console.log('Succesfully updated or inserted')
      // client.close();
    }
    db.collection("users").updateOne(myquery, newvalues, {upsert: true}, callbackFn(err, res));   
    success = updateSucess; 
    client.close();
  });
  console.log('SUCESSS', success)
  // Send response
  res.send(userObj);
});

app.get('/get-profile', function (req, res) {
  let response = {};
  // Connect to the db
  MongoClient.connect(mongoUrlLocal, function (err, client) {
    if (err) throw err;

    let db = client.db('user-account');

    let myquery = { userid: 1 };

    db.collection("users").findOne(myquery, function (err, result) {
      if (err) throw err;
      response = result;
      client.close();

      // Send response
      res.send(response ? response : {});
    });
  });
});

app.listen(3000, function () {
  console.log("app listening on port 3000!");
});
