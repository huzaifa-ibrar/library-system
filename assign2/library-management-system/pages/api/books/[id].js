import connectDB from '../../../lib/mongodb';
import Book from '../../../models/Book';

export default async function handler(req, res) {
  await connectDB();
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      try {
        const book = await Book.findById(id);
        if (!book) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json(book);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const book = await Book.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!book) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json(book);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedBook = await Book.deleteOne({ _id: id });
        if (!deletedBook) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
