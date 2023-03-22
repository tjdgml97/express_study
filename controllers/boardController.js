const {ObjectId} = require('mongodb');
const mongoClient = require('./mongoConnect');

const UNEXPECTED_MSG = '<br><a href="/">메인 페이지로 이동</a>';

const getAllArticles = async(req, res ) => {
  try { 
    const client = await mongoClient.connect();
    const board = client.db('kdt5').collection('board');

    const allArticleCursor = board.find({});
    const ARTICLE = await allArticleCursor.toArray();

  //게시글 수  , id( 폼으로 입력 x )
    res.render('db_board', {
      ARTICLE,
      articleCounts : ARTICLE.length,
      userId: req.session.userId,
    });

  } catch(err) {
    console.error(err);
    res.status(500).send(err.message + UNEXPECTED_MSG);
  }
}

const writeArticle = async(req,res)=>{
  try{
    const client = await mongoClient.connect();
    const board = client.db('kdt5').collection('board');

    const newArticle = {
      USERID : req.session.userId,
      TITLE : req.body.title,
      CONTENT : req.body.content,
    };
    await board.insertOne(newArticle) ;
    res.redirect('/dbBoard');
  } catch(err) {
    console.error(err);
    res.status(500).send(err.message + UNEXPECTED_MSG);
  }
}

const getArticle = async (req,res) => {
  try{
    const client = await mongoClient.connect();
    const board = client.db('kdt5').collection('board');

    const selectedArticle = await board.findOne({
      _id: ObjectId(req.params.id),

    });
    res.render('db_board_modify', {selectedArticle});
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message + UNEXPECTED_MSG);
  }
}

const modifyArticle  = async (req,res) => {
  try{
    const client = await mongoClient.connect();
    const board = client.db('kdt5').collection('board');

    // const updateArticle = {
    //   USERID : req.session.userId,
    //   TITLE : req.body.title,
    //   CONTENT : req.body.content,
    // }
    
    board.updateOne(
      {_id : req.session.userId},
      {$set: {
        TITLE : req.body.title,
        CONTENT : req.body.content
      }}
    );
    res.redirect('/dbBoard');
  }catch (err) {
    console.error(err);
    res.status(500).send(err.message + UNEXPECTED_MSG);
  }
}
module.exports = {
  getAllArticles,
  writeArticle,
  getArticle,
  modifyArticle
}

// const { connect } = require('./dbConnect');
// const connection = require('./dbConnect');


// const boardDB = {
//   // 모든 게시글 가져오기
//   getAllArticles: (cb) => {
//     connection.query('SELECT * from mydb1.board' , (err,data) => {
//       if(err) throw err;
//       // console.log(data);
//       cb(data);
//     })
//   },
//   // 글쓰기
//   writeArticle: (newArticle,cb) => {
//     connection.query(
//       `insert into mydb1.board (USERID, TITLE, CONTENT) values ('${newArticle.userId}','${newArticle.title}','${newArticle.content}');`,
//     (err,data) => {
//       if(err)throw err;
//       cb(data);

//     },
//     );
//   },
//   // 특정 Id 값을 가지는 게시글 찾기 
//   getArticle : (id, cb) => {
//     connection.query(`SELECT * FROM mydb1.board WHERE ID_PK = ${id};`, (err,data) => {      
//       if(err) throw err;      
//       cb(data);
//     },
//     );
  
//     // 숫자에는 '' 없어도 가능 
  // },
//   modifyArticle: (id, modifyArticle, cb) => {
//     connection.query(
//       `UPDATE mydb1.board SET TITLE = '${modifyArticle.title}', CONTENT='${modifyArticle.content}' WHERE ID_PK = ${id};`,
//     (err,data) =>{
//       if(err)throw err;
//       cb(data);
//     },
//     );
// },

// // 특정 Id 를 가지는 게시글 삭제하기 
// deleteArticle : (id, cb) => {
//   connection.query(
//     `DELETE from mydb1.board where ID_PK='${id}'`,
//     (err,data) => {
//       if(err)throw err;
//       cb(data);
//     },
//   );
// }
// }; 

// module.exports = boardDB;