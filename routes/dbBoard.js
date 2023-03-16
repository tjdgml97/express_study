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

router.get('/getAll',(req,res) => {
  // controller 사용해야함
  boardDB.getAllArticles((data)=>{
    res.send(data);
  });
})

module.exports  = router;
