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
  // 이미 오류 안나도록 처리함 
  // if(Object.keys(req.body).length >= 1 )
  // if(req.body) {
    if(req.body.title && req.body.content) {
      const newPost = {
        title : req.body.title,
        content : req.body.content,
      };
      ARTICLE.push(newPost);
      res.redirect('/board')
    // } else {
    //   const err = new Error('폼 태그 입력');
    //   err.status = 404;
    //   throw err;
    // }
  } else {
    const err = new Error('데이터가 들어오지 않았음');
    err.statusCode= 400;
    throw err;
  }
});

// 글 수정 - 파라미터로 기존 내용 받음 
router.get('/modify/:title', (req,res) => {
  const arrIndex = ARTICLE.findIndex((article)=>{
    return req.params.title === article.title
  });
  const selectedArticle = ARTICLE[arrIndex];
  res.render('board_modify',{selectedArticle});
});


router.post('/modify/:title',(req,res) => {
  if(req.body.title && req.body.content) {
    const arrIndex = ARTICLE.findIndex(
      (article) => article.title === req.params.title 
    );
    ARTICLE[arrIndex].title = req.body.title;
    ARTICLE[arrIndex].content = req.body.content;
    res.redirect('/board');
  } else {
    const err = new Error('폼 입력 확인');
    err.statusCode = 404;
    throw err;
  }
});

//  글 삭제 
router.delete('/delete:title',(req,res)=>{
  const arrIndex = ARTICLE.findIndex( (article)=>article.title === req.params.title );
  ARTICLE.splice(arrIndex,1); //해당 인덱스만 삭제 
  res.send('삭제 완료!');
});


module.exports = router;
