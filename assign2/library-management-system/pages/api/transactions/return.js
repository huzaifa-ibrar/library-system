import connectDB from '../../../lib/mongodb';
import Transaction from '../../../models/Transaction';

export default async function handler(req, res) {
  await connectDB();
  const { method } = req;

  if (method === 'POST') {
    try {
      const { bookID, userID } = req.body;
      const transaction = await Transaction.findOne({ bookID, userID, returnDate: null });
      if (!transaction) {
        return res.status(404).json({ success: false, message: 'Transaction not found' });
      }

      transaction.returnDate = new Date();
      await transaction.save();
      res.status(200).json(transaction);
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else {
    res.status(400).json({ success: false });
  }
}
