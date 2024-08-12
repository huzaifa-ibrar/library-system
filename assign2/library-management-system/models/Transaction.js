import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  bookID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  borrowDate: {
    type: Date,
    default: Date.now,
  },
  returnDate: {
    type: Date,
  },
});

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema, 'transactions');
