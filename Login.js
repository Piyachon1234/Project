const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const uri = 'mongodb/mongodb-community-server:7.0.0-ubi8';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//const apiUrl = '';
let apiKey;
let apiSecret;

const timestamp = Date.now();
const endpoint = 'เดี๋ยวแปะลิ้งค์http';
const signature = crypto
  .createHmac('sha256', apiSecret)
  .update(timestamp + endpoint + JSON.stringify(requestData))
  .digest('hex');

const headers = {
  'KC-API-KEY': apiKey,
  'KC-API-SIGNATURE': signature,
  'KC-API-TIMESTAMP': timestamp,
};

axios
  .post(apiUrl + endpoint, requestData, { headers })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
  });

app.post('/login', async (req, res) => {
  apiKey = req.body.apiKey;
  apiSecret = req.body.apiSecret;
    const username = req.body.username;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const usersCollection = client.db('Project').collection('usersConnect');
      await usersCollection.insertOne({
        username,
        password: hashedPassword,
        apiKey,
        apiSecret,
      });
      res.redirect('/success');
    } catch (error) {
      res.redirect('/login?error=authentication_failed');
    }
  });
  
  app.get('/success', (req, res) => {
    res.send('Login successful!');
  });
  
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:3000`);
  });

  const { MongoClient } = require('mongodb');

  // Replace the connection URL with your MongoDB URL

  
  async function connectToDatabase() {
    try {
      await client.connect();
      console.log('Connected to the database');
    } catch (err) {
      console.error('Error connecting to the database', err);
    }
  }
  
  connectToDatabase();

  app.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    // Hash the user's password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      // Store the username and hashed password in the database
      const usersCollection = client.db('your-database-name').collection('users');
      await usersCollection.insertOne({ username, password: hashedPassword });
  
      // Redirect to a success page or perform authentication with KUcoin
      res.redirect('/success');
    } catch (error) {
      // Handle errors, e.g., duplicate username
      console.error('Error storing user data', error);
      res.redirect('/login?error=registration_failed');
    }
  });