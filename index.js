const express = require("express");
const cors = require("cors");
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const port = process.env.PORT || 5000;


app.get('/', (req, res) => {
  res.send('Welcome to this site')
})
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bfpqs.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  // user collection
  const userCollection = client
    .db(`${process.env.DB_NAME}`)
    .collection("users");

    app.post("/addUser", (req, res) => {
        const userInfo = req.body;
        console.log(userInfo);
        userCollection.insertOne(userInfo).then((result) => {
          res.send(result.insertedCount > 0);
        });
      });

 //load all user
  app.get("/allUser", (req, res) => {
    userCollection.find({}).toArray((err, user) => {
      res.send(user);
    });
  });
    
  });

app.listen(port)



