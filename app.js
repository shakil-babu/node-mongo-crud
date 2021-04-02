/*
dbUser : bookUser
dbPassword: UH3C0cHSYC11LO6r
dbName: bookstoreDB
dbCollection: bookStoreCollection
*/
// import express
const path = require('path');
const express = require('express');
const app = express();
// for body parser
app.use(express.urlencoded({extended:false}))
app.use(express.json())

// static path
const staticPath = path.join(__dirname, "./assets")
app.use(express.static(staticPath))


// driver code
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://bookUser:UH3C0cHSYC11LO6r@cluster0.z6gxy.mongodb.net/bookstoreDB?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// mongoObjectId
const ObjectId = require('mongodb').ObjectId;


// mongo client code
client.connect(err => {
  const bookCollection = client.db("bookstoreDB").collection("bookStoreCollection");

// insert data
app.post('/addbook', (req, res) => {
    const newBook = req.body ;
    bookCollection.insertOne(newBook)
    .then(result => {
        console.log('data added succesfully');
        res.redirect('/');
    })
})

// read data
app.get('/books', (req, res) => {
    bookCollection.find({})
    .toArray((error, documents) => {
        res.send(documents)
    })
})

// delete data
app.delete('/delete/:id', (req, res) => {
    bookCollection.deleteOne({_id:ObjectId(req.params.id)})
    .then(result => {
        res.send(result.deletedCount > 0)
    })
})

// load data
app.get('/books/:id', (req,res) => {
    const id = req.params.id;
    bookCollection.find({_id:ObjectId(id)})
    .toArray((error, documents) => {
      res.send(documents[0]);
    })
  })

  // update data
app.patch('/update/:id' , (req, res) => {
    console.log(req.body)
    bookCollection.updateOne({_id:ObjectId(req.params.id)},{
      $set: {name:req.body.name, price:req.body.price, author:req.body.author}
    })
    .then((result) => {
        console.log(result)
    })

})

});






// port listen
app.listen(4000, () => console.log("4000 is opening...."));