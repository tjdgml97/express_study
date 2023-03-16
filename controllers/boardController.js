const { connect } = require('./dbConnect');
const connection = require('./dbConnect');

const boardDB = {
  // 모든 게시글 가져오기
  getAllArticles: (cb) => {
    connection.query('SELECT * from mydb1.board' , (err,data) => {
      if(err) throw err;
      console.log(data);
      cb(data);
    })
  },
  writeArticle: (newArticle,cb) => {
    connection.query(
      `insert into mydb1.board (TITLE, CONTENT) values ('${newArticle.title}','${newArticle.content}');`,
    (err,data) => {
      if(err)throw err;
      cb(data);

    },
    );
  },
  // 특정 Id 값을 가지는 게시글 찾기 
  getArticle : (id, cb) => {
    connection.query(`SELECT * FROM mydb1.board WHERE ID_PK = ${id};`, (err,data) => {
      if(err) throw err;
      cb(data);
    },
    );
  
    // 숫자에는 '' 없어도 가능 
  }
};

module.exports = boardDB;