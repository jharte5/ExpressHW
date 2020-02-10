const express = require('express');
const scratch = express();
const uuid = require('uuid/v4')
const port = process.env.PORT || '3000';

const userRoutes = require('./routes/userRoutes')
scratch.use(express.json());
scratch.use(express.urlencoded({ extended: true}));
scratch.use('/api/users');

scratch.get('/api/users', useController.getAllUsers);