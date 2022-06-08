console.log('If you want to be a bender, you have to let go of fear')
const express = require('express')// for whatever we do in this file just shows we'll be using express
const bodyParser = require('body-parser')
const app = express()//shortening for where we want to call express later and we can just say app
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://CRUDAPP:ZsMX3QoVfuv5x1X7@cluster0.5bkjs.mongodb.net/?retryWrites=true&w=majority'

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('ATLA-quotes')
    const quotesCollection = db.collection('quotes')//quotes being placed into a box in the database
    app.set('view engine','ejs')//rendering HTML, this generaes HTML that contains the quotes
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(express.static('public'))
    app.use(bodyParser.json())



    app.get('/', (req, res) => {
        quotesCollection.find().toArray() //retreiving an array of all the quotes we have input thus far
        .then(results => {
            console.log(results)
            res.render('index.ejs', { quotes: results })//render inside of promise
        })
        .catch(error => console.error(error))
    })
    app.post('/quotes',(req,res) =>{
        quotesCollection.insertOne(req.body)
        .then(result => {
            console.log(result)
            res.redirect('/')
        })
        .catch(error => console.error(error))
    })
    app.put('/quotes', (req,res) => {
        quotesCollection.findOneAndUpdate(
        {name: 'Ozai'},
        {
            $set: {
                name: req.body.name,
                quote: req.body.quote
            }
        },
        {
            upsert: true
        }
    )
        .then(result => {
            console.log(result)
            res.json('Success')
        })
        .catch(error => console.error(error))
    })
    app.delete('/quotes', (req,res) => {
        quotesCollection.deleteOne(
        {name: req.body.name}
        )
        .then(result => {
            if (result.deletedCount === 0) {
            return res.json('No quote to delete')
            }
            res.json(`Deleted Ozai quote`)
        })
        .catch(error => console.error(error))
    })
    app.listen(3000,function (){
        console.log('listening on 3000')
    })
  })
  .catch(error => console.error(error))

