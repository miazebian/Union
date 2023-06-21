const express = require('express');
const router = express.Router();

const Search = require('../Services/Search');

router.get('/SearchForPayment/:First/:Last/:Accountype/:Country', Search.SearchForPayment);
router.get('/SearchBar/:keyword', Search.SearchBar);

module.exports = router;