import connectDB from '../../../lib/mongodb';
import Transaction from '../../../models/Transaction';
import Book from '../../../models/Book';

export default async function handler(req, res) {
  await connectDB();
  const { method } = req;

  if (method === 'POST') {
    try {
      const { bookID, userID } = req.body;
      const book = await Book.findById(bookID);
      if (!book) {
        return res.status(404).json({ success: false, message: 'Book not found' });
      }

      
      const existingTransaction = await Transaction.findOne({ bookID, returnDate: null });
      if (existingTransaction) {
        return res.status(400).json({ success: false, message: 'Book is already borrowed' });
      }

      const transaction = await Transaction.create({ bookID, userID, borrowDate: new Date() });
      res.status(201).json(transaction);
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else {
    res.status(400).json({ success: false });
  }
}
