const mongoose = require('mongoose');
const crypto = require('crypto');
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

userSchema.pre('save', function(next){
  try{
    const salt = crypto.randomBytes(16).toString('hex');
    const hashPassword = crypto.createHash('sha256').update(this.Password + salt).digest('hex');
    this.password = hashPassword;
    this.salt = salt;
    next();
  }catch(error){
    next(error);
  }
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

const riskManagementQuestion = new Schema({

});

const User = mongoose.model('User', userSchema);
const Prediction = mongoose.model('Prediction', predictionSchema);
const APIKey = mongoose.model('APIKey', apiKeySchema);
const TradeHistory = mongoose.model('TradeHistory', tradeHistorySchema);
const RiskManagement = mongoose.model('RiskManagement', riskManagementQuestion);

module.exports = {
  User,
  Prediction,
  APIKey,
  TradeHistory,
};