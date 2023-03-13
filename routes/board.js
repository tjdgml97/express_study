const express = require('express');

const router = express.Router();

const ARTICLE = [
  {
    title: 'title1',
    content: 'hello'
  },
  {
    title: 'title2',
    content: 'hello2'
  },
];

// localhost:4000/board/
router.get('/',(req,res)=> {
  res.render('board',{ARTICLE , articleCounts: ARTICLE.length})
  // ARTICLE : ARTICLE ( 키에 배열을 담는것 )
})
module.exports = router;
