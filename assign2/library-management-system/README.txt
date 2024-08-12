Assignment 2 WEB422
Huzaifa Ibrar


Library Management System - README

Project Overview
----------------
This Library Management System is built with Next.js, MongoDB and bootstrap. This system allows users to manage books, by adding, editing, and deleting books as well as viewing them. Users can also borrow and return books, with restrictions in case the book is already borrowed.

Key Features:
- Add new books to library.
- Edit book details.
- Delete books from library.
- Borrow and return books.
- Prevents a book from being borrowed if it's already checked out.

Directory Structure

/library-management-system
├── /lib
│   └── mongodb.js         
├── /models
│   ├── Book.js            
│   └── Transaction.js     
├── /pages
│   ├── /api
│   │   ├── /books
│   │   │   ├── index.js   
│   │   │   └── [id].js    
│   │   ├── /transactions
│   │   │   ├── index.js   
│   │   │   ├── borrow.js  
│   │   │   └── return.js  
│   ├── index.js           
│   └── borrow-return.js   
├── /public
│   └── ...               
├── /styles
│   └── globals.css        
├── .env.local             
├── package.json           
└── README.txt            

NOTE: There are some other extra files in the zip that were installed when i installed next.js at the start automatically.

Here is the Setup Instructions

1. Install Node.js:
   - Make sure Node.js is installed.
2. Install Dependencies:
   - Navigate to the project directory in your terminal:
     ```bash
     cd path-to-unzipped-project (In my case i did "cd library-management-system")
     ```
   - Install the required dependencies using the following command:
     ```bash
     npm install
     ```

4. Environment Configuration:
   - The project includes a `.env.local` file configured to connect to a local MongoDB instance at `mongodb://localhost:27017/library`.
   - If your MongoDB setup is different, update the `.env.local` file with your connection string.
   NOTE: THE MongoDB database is called library and the collections should be called books and transactions

5. Run the Project:
     ```bash
     npm run dev
     ```
   - The project will be accessible at `http://localhost:3000` in your web browser.

Functionality
-------------
  - The main page lets you add new books, edit existing ones, or delete them from the library collection.

  - The Borrow/Return page borrows or returns books. The user will enter their User ID and select a book to borrow or return. The system ensures that a book cannot be borrowed if it's already checked out and will give messages in each case.

Dependencies
------------
The following dependencies and packages are required and will install when you run `npm install`(make sure its in the projects
root directory as mentioned earlier):
- `next`
- `react`
- `react-dom`
- `mongoose`
- `axios`
- `bootstrap`


