import connectDB from '../../../lib/mongodb';
import Transaction from '../../../models/Transaction';

export default async function handler(req, res) {
  await connectDB();
  const { method } = req;

  if (method === 'GET') {
    try {
      const transactions = await Transaction.find({});
      res.status(200).json(transactions);
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else {
    res.status(400).json({ success: false });
  }
}
