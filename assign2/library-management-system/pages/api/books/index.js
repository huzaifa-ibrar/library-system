import connectDB from '../../../lib/mongodb';
import Book from '../../../models/Book';

export default async function handler(req, res) {
  await connectDB();
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const books = await Book.find({});
        res.status(200).json(books);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
