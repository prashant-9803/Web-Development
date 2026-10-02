const express = require("express");
const path = require("path");
const app = express();

let totalRequests = 0;

// Logging Middleware
let middleware = (req, res, next) => {
  console.log(req.method, "---", req.path);
  next();
};

// Request Counter Middleware (Ignores favicon requests)
app.use(function (req, res, next) {
  if (req.url !== "/favicon.ico") {
    totalRequests = totalRequests + 1;
  }
  next();
});

app.use(middleware);

// Body Parser Middleware
app.use(express.json());

// Serve Frontend
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// POST Handlers
app.post("/add", function (req, res) {
  let a = parseFloat(req.body.a);
  let b = parseFloat(req.body.b);
  res.json({ ans: a + b });
});

app.post("/sub", function (req, res) {
  let a = parseFloat(req.body.a);
  let b = parseFloat(req.body.b);
  res.json({ ans: a - b });
});

app.post("/mult", function (req, res) {
  let a = parseFloat(req.body.a);
  let b = parseFloat(req.body.b);
  res.json({ ans: a * b });
});

app.post("/div", function (req, res) {
  let a = parseFloat(req.body.a);
  let b = parseFloat(req.body.b);

  if (b === 0) {
    return res.status(400).json({ error: "Division by zero is not allowed" });
  }

  res.json({ ans: a / b });
});

// Request Count Endpoint
app.get("/total-req", function (req, res) {
  res.json({ totalRequests });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
