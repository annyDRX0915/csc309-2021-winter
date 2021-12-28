'use strict';
// DO NOT CHANGE THIS FILE
const mongoose = require('mongoose');

// DO NOT CHANGE THIS FILE
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://anny:mymongo@cluster0.bte6z.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true});

// DO NOT CHANGE THIS FILE
module.exports = { mongoose }