const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const app = express();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({storage});

mongoose
  .connect('mongodb+srv://okdkithmini:okdkithmini@cluster0.m609url.mongodb.net/')
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch(err => {
    console.log('Error connecting to mongodb', err);
  });

app.listen(3000, () => console.log('Server running on port 3000'));