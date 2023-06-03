const mongoose = require('mongoose');

const connectionDB = async () => {
  const { NODE_ENV, CONNECT_DB } = process.env;
  try {
    return await mongoose.connect(NODE_ENV === 'production' ? CONNECT_DB : 'mongodb://127.0.0.1:27017/bitfilmsdb');
  } catch (error) {
    return console.error(error);
  }
};

module.exports = connectionDB;
