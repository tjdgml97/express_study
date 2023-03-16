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
  }
};

module.exports = boardDB;