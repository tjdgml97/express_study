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
router.get('/write',(req,res) => {
  res.render('board_writer');
});

// 글 추가 
router.post('/write',(req,res)=>{
  // if(Object.keys(req.body).length >= 1 )
  if(req.body) {
    if(req.body.title && req.body.content) {
      const newPost = {
        title : req.body.title,
        content : req.body.content,
      };
      ARTICLE.push(newPost);
      res.redirect('/board')
    } else {
      const err = new Error('폼 태그 입력');
      err.status = 404;
      throw err;
    }
  } else {
    const err = new Error('데이터가 들어오지 않았음');
    err.statusCode= 400;
    throw err;
  }
});

// 글 수정 - 파라미터로 기존 내용 받음 
router.get('/modify/:title', (req,res) => {
  const arrIndex = ARTICLE.findIndex((article)=>{
    req.params.title === article.title
  })
});
router.post('/modify/:title',(req,res) => {});

//  글 삭제 
router.delete('/delete:title',(req,res)=>{});


module.exports = router;
