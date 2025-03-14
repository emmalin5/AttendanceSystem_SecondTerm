// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       //useNewUrlParser: true,
//       //useUnifiedTopology: true,
//     });
//     console.log('MongoDB Connected');
//   } catch (err) {
//     console.error(err.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

// In config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  const MONGO_URI = 'mongodb://localhost:27017/attendance'; // Define URI here
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;