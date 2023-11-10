const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017/Final-project', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;

const userSchema = new Schema({ 
  UserID: { type: Number, required: true, unique: true },
  Username: {type: String, required: true, unique: true},
  Email: {type: String, required: true, unique: true},
  Password: {type: String, required: true, unique: true},
  RegistrationDate: Date,
});

const predictionSchema = new Schema({ 
  //collect coin name
  PredictionID: { type: Number, required: true, unique: true },
  UserID: { type: Number, ref: 'User' },
  CoinName: String,
  DateOfPrediction: Date,
  PredictedPrice: Number,
  ActualPrice: Number,
  TradeSignal: String,
  RSISignal: String,
});

const apiKeySchema = new Schema({
  KeyID: { type: Number, required: true, unique: true },
  UserID: { type: Number, ref: 'User' },
  AccessKey: String,
  SecretKey: String,
  Passphrase: String,
});

const tradeHistorySchema = new Schema({
  TradeID: { type: Number, required: true, unique: true },
  UserID: { type: Number, ref: 'User' }, 
  DateTimeOfTrade: Date,
  TradeType: String, // 'Buy' or 'Sell'
  Amount: Number,
  PriceAtTrade: Number,
});

const User = mongoose.model('User', userSchema);
const Prediction = mongoose.model('Prediction', predictionSchema);
const APIKey = mongoose.model('APIKey', apiKeySchema);
const TradeHistory = mongoose.model('TradeHistory', tradeHistorySchema);

module.exports = {
  User,
  Prediction,
  APIKey,
  TradeHistory,
};