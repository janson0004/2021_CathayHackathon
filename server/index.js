const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const { spawn } = require("child_process");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(cors({ credentials: true, origin: process.env.ORIGIN }));
app.use(cookieParser());

app.get("/restaurant", (req, res) => {
  let dataset = [];
  const python = spawn("python3", ["populartimes_api.py"]);

  python.stdout.on("data", (data) => {
    dataset.push(data);
  });

  python.on("close", (code) => {
    console.log(dataset.join(""));
    res.json(JSON.parse(dataset.join("")));
  });
});

app.get("/", (req, res) => {
  res.send("Server is running!!");
});

const server = app.listen(3001);
