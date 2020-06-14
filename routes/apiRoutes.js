var db = require("../models");
var axios = require("axios");
var api_key = process.env.API_KEY;
var movie = "";

module.exports = function (app) {
  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.Streamline.findAll({}).then(function (dbStreamline) {
      res.json(dbStreamline);
    });
  });

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Streamline.create(req.body).then(function (dbStreamline) {
      res.json(dbStreamline);
    });
  });

  app.get("/api/users", function(req, res) {
    db.users.findAll({}).then(function(dbStreamline) {
      res.json(dbStreamline);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Streamline.destroy({ where: { id: req.params.id } }).then(function (dbStreamline) {
      res.json(dbStreamline);
    });
  });

  //post for new user
  app.post("/api/newuser", function(req, res) {
    db.users.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }).then(function(data){
    res.redirect('/')
  });
  });

  //post for login
  app.post("/api/login", function(req, res) {
    db.User.findOne({ where: 
      {
        username: req.body.username.trim(),
        password: req.body.password.trim()
      }
    }).then(function(data) {
      console.log(data);
      res.redirect('/' + data.id);
  });
  });

  // post to save search data
 app.post("/api/search", function (req, res) {
    movie = req.body.search;
    db.Search.create(req.body).then(function (dbStreamline) {
      res.json(dbStreamline);
    });
  });

  // UTelly config (needs to be inside another app.get with route of api/utelly)

  app.get("/api/utelly", function (req, res) {

//   var movie = 
    axios({
      method: "get",
      url: "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + movie + "&country=us",
      headers: {
        "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
        "x-rapidapi-key": api_key
      },
      async: true,
      crossDomain: true,
    }).then(function(response){
      console.log(response.data);
      res.json(response.data)
    });
  });
  }

