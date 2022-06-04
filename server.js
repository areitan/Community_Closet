const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});

//setting up S3
// var express = require("express"),
var aws = require("aws-sdk"),
  bodyParser = require("body-parser"),
  multer = require("multer"),
  multerS3 = require("multer-s3");

aws.config.update({
  secretAccessKey: process.env.AWS_ACCESS_KEY_ID,
  accessKeyId: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-west-2",
  signatureVersion: "v4",
});

s3 = new aws.S3();

app.use(bodyParser.json());

var upload = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: "community-closet-s3-bucket",
    key: function (req, file, cb) {
      console.log(file);
      cb(null, file.originalname); //use Date.now() for unique file keys
    },
  }),
});

//open in browser to see upload form
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html"); //index.html is inside node-cheat
});

//use by upload form
app.post("/upload", upload.array("upl", 25), function (req, res, next) {
  res.send({
    message: "Uploaded!",
    urls: req.files.map(function (file) {
      return {
        url: file.location,
        name: file.key,
        type: file.mimetype,
        size: file.size,
      };
    }),
  });
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
