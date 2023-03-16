const express = require('express');
// router 에 controller 불러옴 
const boardDB = require('../controllers/boardController');

const router = express.Router();

// 게시판 페이지 호출
router.get('/', (req,res) => {
  boardDB.getAllArticles((data)=>{
    console.log(data);
    const ARTICLE = data;
    const articleCounts = ARTICLE.length;
    res.render('db_board',{ARTICLE, articleCounts});
  })
})

router.get('/write',(req,res)=>{
  res.render('db_board_writer');
});

// db 글쓰기 
router.post('/write',(req,res)=> {
  if(req.body.title && req.body.content) {
    boardDB.writeArticle(req.body, (data) => {
      console.log(data);
      if(data.affectedRows >= 1){
        // row 가 1 이상 
        res.redirect('/dbBoard');
      } else {
        const err = new Error('글쓰기 실패');
        err.statusCode = 500; 
        throw err;
      }
    });
  } else {
    const err = new Error('글 제목 또는 내용이 없습니다.');
    err.statusCode = 400;
    throw err;
  }
  console.log(req.body);
});

router.get('/getAll',(req,res) => {
  // controller 사용해야함
  boardDB.getAllArticles((data)=>{
    res.send(data);
  });
})

module.exports  = router;
