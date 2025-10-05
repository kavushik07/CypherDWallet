const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const Transaction = require('./models/Transaction');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Metacypher', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

const USER_ID = 'defaultUser';
app.get('/api/user', async (req, res) => {
  try {
    const user = await User.findOne({ userId: USER_ID });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const transactions = await Transaction.find({ userId: USER_ID })
      .sort({ date: -1 })
      .limit(50);

    res.json({
      balance: user.balance,
      transactions: transactions.map(tx => ({
        id: tx._id,
        hash: tx.hash,
        recipient: tx.recipient,
        amount: tx.amount,
        date: tx.date.toLocaleString(),
      })),
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/transactions', async (req, res) => {
  try {
    const { hash, recipient, amount, date, secretPhrase } = req.body;

    if (!hash || !recipient || !amount || !date || !secretPhrase) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const user = await User.findOne({ userId: USER_ID });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.secretPhrase !== secretPhrase) {
      return res.status(401).json({ message: 'Invalid secret phrase' });
    }
    if (amountNum > user.balance) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      user.balance -= amountNum;
      await user.save({ session });
      const transaction = new Transaction({
        userId: USER_ID,
        hash,
        recipient,
        amount: amountNum,
        date: new Date(date),
      });
      await transaction.save({ session });

      await session.commitTransaction();
      session.endSession();

      res.status(201).json({ 
        id: transaction._id,
        message: 'Transaction created successfully' 
      });
    } catch (txError) {
      await session.abortTransaction();
      session.endSession();
      throw txError;
    }
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/user/setup', async (req, res) => {
  try {
    const { secretPhrase, initialBalance = 100 } = req.body;

    let user = await User.findOne({ userId: USER_ID });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({
      userId: USER_ID,
      balance: initialBalance,
      secretPhrase,
    });
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error setting up user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});