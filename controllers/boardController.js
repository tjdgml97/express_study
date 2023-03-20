const { connect } = require('./dbConnect');
const connection = require('./dbConnect');

const boardDB = {
  // 모든 게시글 가져오기
  getAllArticles: (cb) => {
    connection.query('SELECT * from mydb1.board' , (err,data) => {
      if(err) throw err;
      // console.log(data);
      cb(data);
    })
  },
  // 글쓰기
  writeArticle: (newArticle,cb) => {
    connection.query(
      `insert into mydb1.board (USERID, TITLE, CONTENT) values ('${newArticle.userId}','${newArticle.title}','${newArticle.content}');`,
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
  },
  modifyArticle: (id, modifyArticle, cb) => {
    connection.query(
      `UPDATE mydb1.board SET TITLE = '${modifyArticle.title}', CONTENT='${modifyArticle.content}' WHERE ID_PK = ${id};`,
    (err,data) =>{
      if(err)throw err;
      cb(data);
    },
    );
},

// 특정 Id 를 가지는 게시글 삭제하기 
deleteArticle : (id, cb) => {
  connection.query(
    `DELETE from mydb1.board where ID_PK='${id}'`,
    (err,data) => {
      if(err)throw err;
      cb(data);
    },
  );
}
}; 

module.exports = boardDB;