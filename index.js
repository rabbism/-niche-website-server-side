const express = require('express')
const app = express()
const port =process.env.PORT || 5000
var cors = require('cors')
require('dotenv').config()
const { MongoClient } = require('mongodb');

app.use(cors())
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.elm9b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// SunglassService
// B73XFjAN1CW5rMvI
async function run() {
    try {
      await client.connect();
         const database = client.db('chasmish');
        const productCollection = database.collection('sunglass');
        const explorCollection = database.collection('explor');
        const reviewCollection = database.collection('review');
        const orderCollection =database.collection('order');
     
      // query for movies that have a runtime less than 15 minutes
      app.get('/products', async (req,res) =>{
        const cursor =productCollection.find({});
        const products =await cursor.toArray()
        res.send(products)
      })
      // order 

      app.post('/order', async (req, res) => {
        const order = req.body;
        const result = await orderCollection.insertOne(order);
        res.json(result);
    })
    app.get('/order', async (req,res) =>{
      const cursor =orderCollection.find({});
      const products =await cursor.toArray()
      res.send(products)
    })

          app.get('/explor', async (req,res) =>{
        const cursor =explorCollection.find({});
        const products =await cursor.toArray()
        res.send(products)
      })
      app.get('/review', async (req,res) =>{
        const cursor =reviewCollection.find({});
        const review =await cursor.toArray()
        res.send(review)
      })
      // post review 
      app.post('/review',async(req,res) =>{
        const newReview =req.body
        const result=await reviewCollection.insertOne(newReview)
        res.json(result)
      })
      
    } 
 
    
    finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})