const db = require("../models");
const config = require("config");
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY || config.get("secretKey");
