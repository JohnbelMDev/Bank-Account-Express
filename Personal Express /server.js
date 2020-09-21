const express = require('express');
// app is an object creating by calling the top level express
const app = express();
// that's a nodejs path module
// provide the ability to work with directories and file paths
const path = require('path')
// need to require mongodb to access data
const MongoClient = require('mongodb').MongoClient

// require('dotenv').config() //configure the .env file
const DATABASE_URI = 'mongodb+srv://Johnbel458:CPTAJLWIEEltRGus@cluster0.lbzzt.mongodb.net/dbacount?retryWrites=true&w=majority';
// setting the port number
const PORT = 3000;

//middleware for handling post requests
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

//set the static files
// that's a built in middleware function in Express.
// it serves static file
app.use(express.static('publicStatic'))

//set path to the views folder
// path.join two or more parts of a path
app.set('views', path.join(__dirname, 'views'))

//set template engine before anything else
app.set('view engine', 'ejs');

// connecting mongo db
MongoClient.connect(DATABASE_URI, {
    useUnifiedTopology: true
  })
  .then(client => { //SUCCESSFULLY CONNECTED TO DATABASE
    const db = client.db('bankaccount');
    const postCollection = db.collection('user');

    // RENDER THE MAIN PAGE
    app.get('/', (req, res) => {
      //to render the ejs file
			// the app. get the path and then response to render
      res.render(path.join(__dirname, 'views', 'index'), {
        'title': 'main',
        // 'thelist': list
      });
    })

    app.post('/create', (req, res) => {
      // req body allows us to see the body and display that as an object
      postCollection.insertOne(req.body)
        .then(results => {
          console.log(results);
          // redirecting back to route
          res.redirect('/')
        })
        .catch(error => console.log(error))
    })




    // app.delete('/deleteAction', (req, res) => {
    //     // defining name
    //     db.collection('user').remove({
    //       _id: new mongoose.mongo.ObjectID(req.body.id),
    //       }, (err, result) => {
    //       if (err) return console.log(err)
    //       console.log('saved to database')
    //       res.send('deleted')
    //     })
    //   })
    //SET ROUTES FOR API -- //getData , withdrawl, deposit
    app.get('/getData', (req, res) => {
      // conver the data into an array
      postCollection.find().toArray()
        .then(results => {
          console.log(results)
          res.status(200).json(results);
        })
        .catch(error => console.error(error))
    })

    app.post('/deposit', (req, res) => {
      console.log(parseInt(req.query.amount));
      postCollection.findOneAndUpdate({
          name: 'Johnbel'
        }, {
          // The set operator is there for the update operators
          $set: {
            name: req.query.name,
            balance: parseInt(req.query.amount)
          }
        }, {
          // upset means insert a document if no documents can be updated
          upsert: true
        })
        .then(result => {

        })
        .catch(error => console.error(error))
      res.redirect('/')
    })
// removing element in the collection
    app.delete('/delete', (req, res) => {
      postCollection.deleteOne({
          name: 'Johnbel'
        })
        .then(result => {
          res.json(`Deleted`)
        })
        .catch(error => console.error(error))
    })



  })
  .catch(error => console.log(error)) //ERROR


app.listen(PORT);
