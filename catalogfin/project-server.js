const mysql = require("mysql");
const express = require("express");
const session = require("express-session");
const path = require("path");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "pbl",
});

const app = express();

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/assets", express.static("assets"));

app.get("/", function (request, response) {
  // Render login template
  response.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/login", function (request, response) {
  response.sendFile(path.join(__dirname + "/login.html"));
});

app.get("/register", function (request, response) {
  response.sendFile(path.join(__dirname + "/register.html"));
});

app.get("/advancedsearch", function (request, response) {
  response.sendFile(path.join(__dirname + "/advancedsearch.html"));
});

app.post("/login", function (request, response) {
  // Capture the input fields
  let email = request.body.email;
  let password = request.body.password;
  // Ensure the input fields exists and are not empty
  if (email && password) {
    // Execute SQL query that'll select the account from the database based on the specified email and password
    connection.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password],
      function (error, results, fields) {
        // If there is an issue with the query, output the error
        if (error) throw error;
        // If the account exists
        if (results.length > 0) {
          // Authenticate the user
          request.session.loggedin = true;
          request.session.email = email;
          // Redirect to home page
          response.redirect("/");
        } else {
          response.send(
            '<script>alert("Incorrect"); window.location.href = "/login";</script>'
          );
        }
        response.end();
      }
    );
  } else {
    response.send('<script>alert("Please enter email and Password!")</script>');
    response.end();
  }
});

app.post("/register", function (request, response) {
  let firstname = request.body.firstname;
  let lastname = request.body.lastname;
  let email = request.body.email;
  let password = request.body.password;
  let confirm_password = request.body.confirm_password;

  if (firstname && lastname && email && password && confirm_password) {
    connection.query(
      "SELECT * FROM users WHERE email =?",
      [email],
      function (error, results, fields) {
        if (error) {
          throw error;
          return;
        }

        if (results.length > 1) {
          response.send(
            '<script>alert("Email already exists"); window.location.href = "/register";</script>'
          );
        } else if (confirm_password != password) {
          response.send(
            '<script>alert("Password & Confirm Password do not match"); window.location.href = "/register";</script>'
          );
          return;
        } else {
          connection.query(
            "INSERT into users values(?, ?, ?, ?)",
            [firstname, lastname, email, password],
            function (error, results, fields) {
              if (error) {
                throw error;
                return;
              } else {
                response.send(
                  '<script>alert("You are successfully registered"); window.location.href = "/";</script>'
                );
                return;
              }
            }
          );
        }
      }
    );
  }
});

app.listen(3000);
