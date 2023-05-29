const mongoose = require('mongoose');

const connectionDB = async () => {
  const { CONNECT_DB } = process.env || 'mongodb://127.0.0.1:27017/bitfilmsdb';
  try {
    return await mongoose.connect(CONNECT_DB);
  } catch (error) {
    return console.error(error);
  }
};

module.exports = connectionDB;
