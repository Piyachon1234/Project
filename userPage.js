const express = require('express');
const app = express();

const mongoose = require('mongoose');
//const{ User, Prediction} = require{'./database.js'};


mongoose.connect('mongodb://mongo:27017/Final-project', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.get('/user/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findOne({ UserID: userId });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.render('user-profile', { user });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
app.get('/user/:id/predictions', async (req, res) => {
  try {
    const userId = req.params.id;
    const predictions = await Prediction.find({ UserID: userId });

    if (predictions.length === 0) {
      return res.status(404).json({ error: 'No predictions found for this user' });
    }

    res.render('user-predictions', { predictions });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});  