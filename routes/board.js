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
// 글 전체 목록 보여주기 
router.get('/',(req,res)=> {
  res.render('board',{ARTICLE , articleCounts: ARTICLE.length})
  // ARTICLE : ARTICLE ( 키에 배열을 담는것 )
})

// 글 쓰기 모드로 이동
router.get('/write',(req,res) => {});

// 글 추가 
router.post('/wirte',(req,res)=>{});

module.exports = router;
